import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayloadClient } from '@/lib/payload/client'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { items, customerEmail, customerName, shippingAddress } = body

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
        }

        const payload = await getPayloadClient()

        // Securely fetch each product to calculate prices server-side
        const lineItemsDetails: Array<{
            product: string
            title: string
            quantity: number
            unitPrice: number
            totalPrice: number
            image?: string
        }> = []

        let subtotal = 0

        for (const item of items) {
            const productDoc = await payload.findByID({
                collection: 'products',
                id: item.productId,
                depth: 1,
            })

            if (!productDoc) {
                return NextResponse.json(
                    { error: `Product not found: ${item.productId}` },
                    { status: 404 }
                )
            }

            const unitPrice = Number(productDoc.price) || 0
            const quantity = Math.max(1, parseInt(item.quantity, 10) || 1)
            const totalPrice = unitPrice * quantity
            subtotal += totalPrice

            const featuredMedia = typeof productDoc.featuredImage === 'object' ? productDoc.featuredImage : null

            lineItemsDetails.push({
                product: productDoc.id,
                title: productDoc.title,
                quantity,
                unitPrice,
                totalPrice,
                image: (featuredMedia as any)?.url || undefined,
            })
        }

        const shipping = subtotal > 150 ? 0 : 15 // Free shipping over $150
        const total = subtotal + shipping
        const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`

        // Create Order in Payload
        const order = await payload.create({
            collection: 'orders',
            data: {
                orderNumber,
                customerEmail: customerEmail || 'guest@example.com',
                customerName: customerName || 'Guest Customer',
                shippingAddress: shippingAddress || {
                    line1: '123 Atelier Street',
                    city: 'New York',
                    state: 'NY',
                    postalCode: '10001',
                    country: 'United States',
                },
                items: lineItemsDetails,
                subtotal,
                shipping,
                tax: 0,
                total,
                paymentStatus: 'pending',
                fulfillmentStatus: 'unfulfilled',
            },
        })

        const stripeKey = process.env.STRIPE_SECRET_KEY

        if (stripeKey) {
            const stripe = new Stripe(stripeKey)
            const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

            const stripeLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = lineItemsDetails.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.title,
                        images: item.image ? [`${origin}${item.image}`] : [],
                    },
                    unit_amount: Math.round(item.unitPrice * 100),
                },
                quantity: item.quantity,
            }))

            if (shipping > 0) {
                stripeLineItems.push({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Standard Shipping',
                        },
                        unit_amount: Math.round(shipping * 100),
                    },
                    quantity: 1,
                })
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: stripeLineItems,
                mode: 'payment',
                customer_email: customerEmail || undefined,
                success_url: `${origin}/shop/order-confirmation?orderNumber=${orderNumber}&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${origin}/shop?cancelled=true`,
                metadata: {
                    orderId: order.id,
                    orderNumber,
                },
            })

            // Update order with Stripe session ID
            await payload.update({
                collection: 'orders',
                id: order.id,
                data: {
                    stripeSessionId: session.id,
                },
            })

            return NextResponse.json({ url: session.url, orderNumber })
        }

        // Demo fallback when STRIPE_SECRET_KEY is not configured
        await payload.update({
            collection: 'orders',
            id: order.id,
            data: {
                paymentStatus: 'paid',
            },
        })

        return NextResponse.json({
            url: `/shop/order-confirmation?orderNumber=${orderNumber}`,
            orderNumber,
        })
    } catch (error: any) {
        console.error('Checkout error:', error)
        return NextResponse.json(
            { error: error?.message || 'Internal server error during checkout' },
            { status: 500 }
        )
    }
}


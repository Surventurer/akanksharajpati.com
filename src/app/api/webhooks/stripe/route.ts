import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayloadClient } from '@/lib/payload/client'

export async function POST(req: NextRequest) {
    const signature = req.headers.get('stripe-signature')
    const stripeKey = process.env.STRIPE_SECRET_KEY
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!stripeKey || !webhookSecret || !signature) {
        return NextResponse.json({ received: false, message: 'Webhook secrets unconfigured' }, { status: 400 })
    }

    const stripe = new Stripe(stripeKey)
    const bodyText = await req.text()

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(bodyText, signature, webhookSecret)
    } catch (err: any) {
        console.error('⚠️ Stripe Webhook signature verification failed.', err.message)
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    const payload = await getPayloadClient()

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session
        const orderId = session.metadata?.orderId

        if (orderId) {
            try {
                await payload.update({
                    collection: 'orders',
                    id: orderId,
                    data: {
                        paymentStatus: 'paid',
                        stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : undefined,
                    },
                })
                console.log(`✅ Order ${orderId} marked as paid`)
            } catch (err) {
                console.error('Failed to update order status on webhook:', err)
            }
        }
    }

    return NextResponse.json({ received: true })
}


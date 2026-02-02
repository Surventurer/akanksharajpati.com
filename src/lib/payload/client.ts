import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

let payload: Awaited<ReturnType<typeof getPayload>> | null = null

export async function getPayloadClient() {
    if (payload) return payload
    
    try {
        payload = await getPayload({ config })
        return payload
    } catch (error) {
        console.error('Failed to initialize Payload client:', error)
        throw error
    }
}

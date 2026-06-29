import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
    server: {
        CMS_SEED_ADMIN_EMAIL: z.string().trim().email(),
        CMS_SEED_ADMIN_PASSWORD: z.string().trim().min(1),
        CMS_AUTO_LOGIN: z.enum(['true', 'false']).optional(),
    },
    client: {
        //
    },
    runtimeEnv: {
        CMS_SEED_ADMIN_EMAIL: process.env.CMS_SEED_ADMIN_EMAIL,
        CMS_SEED_ADMIN_PASSWORD: process.env.CMS_SEED_ADMIN_PASSWORD,
        CMS_AUTO_LOGIN: process.env.CMS_AUTO_LOGIN,
    },
})

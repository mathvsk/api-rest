import { config } from 'dotenv'
import { z } from 'zod'

enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

if (process.env.NODE_ENV === NodeEnv.Test) {
  config({ path: '.env.test' })
} else {
  // Carrega o config default ".env"
  config()
}

const envSchema = z.object({
  NODE_ENV: z.nativeEnum(NodeEnv).default(NodeEnv.Production),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']).default('sqlite'),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3000),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error(`Invalid environment variables`)
}

export const env = _env.data

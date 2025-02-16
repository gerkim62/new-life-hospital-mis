import { z } from "zod";

const envVariables = z.object({
  DATABASE_URL: z.string(),
  ADMIN_PASSWORD: z.string(),
  PORT: z.string().optional(),
  NODE_ENV: z.enum(["development", "production"]),
});

const env = envVariables.parse(process.env);

export default env;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

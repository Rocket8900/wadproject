import { Redis } from "ioredis";
import dotenv from "dotenv"


dotenv.config()
export const redis_cache = new Redis(process.env.REDIS_URL);
redis_cache.on('error', (err) => {
    console.error('Redis connection error:', err);
  });
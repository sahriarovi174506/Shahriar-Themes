import Redis from "ioredis";
import { TEMPLATES } from "../api/templates-data.js";

async function resetCounts() {
    const REDIS_URL = process.env.REDIS_URL;

    if (!REDIS_URL) {
        console.error("❌ Error: REDIS_URL environment variable is not set.");
        console.log("Please run this script with REDIS_URL set, for example:");
        console.log('Windows (PowerShell): $env:REDIS_URL="your_url"; node scratch/reset-redis.js');
        console.log('Linux/macOS: REDIS_URL="your_url" node scratch/reset-redis.js');
        process.exit(1);
    }
    console.log("Connecting to Redis...");
    const redis = new Redis(REDIS_URL);

    try {
        const keys = TEMPLATES.map(t => `downloads:${t.id}`);
        console.log(`Found ${keys.length} template keys to reset.`);

        const pipeline = redis.pipeline();
        keys.forEach(key => {
            console.log(`Setting ${key} to 0...`);
            pipeline.set(key, 0);
        });

        await pipeline.exec();
        console.log("✅ Successfully reset all counts to 0 in Redis.");
    } catch (error) {
        console.error("❌ Redis Reset Error:", error);
    } finally {
        redis.disconnect();
    }
}

resetCounts();

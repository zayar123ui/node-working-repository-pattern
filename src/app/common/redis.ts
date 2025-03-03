import Redis from "ioredis";

// Create a new Redis client instance
const redisClient = new Redis({
  host: "localhost", // Redis server host
  port: 6379, // Redis server port
});

export { redisClient };

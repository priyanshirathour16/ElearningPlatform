const Redis = require("ioredis");

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log("redis Connected");
    return process.env.REDIS_URL;
  }
  throw new Error("Redis Connection Failed");
};

const redis = new Redis(redisClient);
module.exports = redis;

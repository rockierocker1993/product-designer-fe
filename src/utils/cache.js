// utils/responseCache.js

const cache = new Map();

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes
const CLEANUP_INTERVAL = 60 * 1000; // 1 minute

export async function putCache(key, data, ttl = DEFAULT_TTL) {
    cache.set(key, {
        data,
        expiredAt: Date.now() + ttl
    });

    return data;
}

export function clearCache(key) {
    if (key) {
        cache.delete(key);
    } else {
        cache.clear();
    }
}

export function getCache(key) {
    const cached = cache.get(key);

    if (!cached) return undefined;

    if (Date.now() >= cached.expiredAt) {
        cache.delete(key);
        return undefined;
    }

    return cached.data;
}

// Cleanup expired cache
export function cleanupCache() {
    const now = Date.now();

    for (const [key, cached] of cache) {
        if (now >= cached.expiredAt) {
            cache.delete(key);
        }
    }
}

// Run cleanup periodically
const cleanupTimer = setInterval(cleanupCache, CLEANUP_INTERVAL);
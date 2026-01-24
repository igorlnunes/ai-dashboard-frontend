/**
 * Cache utility for managing localStorage with TTL (Time To Live)
 * Stores data with expiration timestamps
 */
/**
 * Store data in localStorage with optional TTL
 * @param key - Cache key
 * @param data - Data to cache
 * @param ttlSeconds - Time to live in seconds (default: 3600 = 1 hour)
 */
export const setCacheItem = (key, data, ttlSeconds = 3600) => {
    try {
        const expiresAt = Date.now() + ttlSeconds * 1000;
        const cacheEntry = {
            data,
            expiresAt,
        };
        localStorage.setItem(key, JSON.stringify(cacheEntry));
    }
    catch (error) {
        console.error(`Erro ao cachear ${key}:`, error);
    }
};
/**
 * Retrieve data from localStorage if not expired
 * @param key - Cache key
 * @returns Cached data if valid, null otherwise
 */
export const getCacheItem = (key) => {
    try {
        const item = localStorage.getItem(key);
        if (!item)
            return null;
        const cacheEntry = JSON.parse(item);
        // Check if cache is expired
        if (Date.now() > cacheEntry.expiresAt) {
            localStorage.removeItem(key);
            return null;
        }
        return cacheEntry.data;
    }
    catch (error) {
        console.error(`Erro ao recuperar cache ${key}:`, error);
        return null;
    }
};
/**
 * Check if a cache entry is expired
 * @param key - Cache key
 * @returns true if expired or doesn't exist, false if valid
 */
export const isCacheExpired = (key) => {
    try {
        const item = localStorage.getItem(key);
        if (!item)
            return true;
        const cacheEntry = JSON.parse(item);
        return Date.now() > cacheEntry.expiresAt;
    }
    catch {
        return true;
    }
};
/**
 * Clear a specific cache entry
 * @param key - Cache key
 */
export const clearCacheItem = (key) => {
    try {
        localStorage.removeItem(key);
    }
    catch (error) {
        console.error(`Erro ao limpar cache ${key}:`, error);
    }
};
/**
 * Clear all cached items (optional: filter by prefix)
 * @param prefix - Optional prefix to filter items
 */
export const clearAllCache = (prefix) => {
    try {
        if (!prefix) {
            localStorage.clear();
            return;
        }
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(prefix)) {
                localStorage.removeItem(key);
            }
        });
    }
    catch (error) {
        console.error('Erro ao limpar cache:', error);
    }
};

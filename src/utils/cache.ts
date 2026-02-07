const cache = new Map<string, any>();

export const getCache = (key: string) => cache.get(key);
export const setCache = (key: string, data: any) => cache.set(key, data);

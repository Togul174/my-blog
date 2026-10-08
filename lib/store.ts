import type { StoredArticle } from '../types/article';

declare global {
  var __temporaryArticles: StoredArticle[] | undefined;
}

if (!globalThis.__temporaryArticles) {
  globalThis.__temporaryArticles = [];
}

export const temporaryArticles: StoredArticle[] = globalThis.__temporaryArticles;
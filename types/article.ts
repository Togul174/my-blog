export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string | null;
  author: string;
  contentHtml: string;
}

export interface ArticlePreview {
  slug: string;
  title: string;
  description: string;
  date: string | null;
  author: string;
}

export interface StoredArticle {
  slug: string;
  title: string;
  description: string;
  author: string;
  content: string;
  date: string;
}

export interface CreateArticleDto {
  title: string;
  content: string;
  description?: string;
  author?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface ApiSuccess<T> {
  data: T;
}
import { describe, it, expect } from 'vitest';
import { getAllArticles, getArticleBySlug, getAllSlugs } from './articles';

describe('lib/articles', () => {
    describe('getAllArticles', () => {
        it('должен вернуть массив статей', () => {
            const articles = getAllArticles();
            expect(Array.isArray(articles)).toBe(true);
        });

        it('должен вернуть статьи из файлов (минимум 3)', () => {
            const articles = getAllArticles();
            expect(articles.length).toBeGreaterThanOrEqual(3);
        });

        it('каждая статья должна иметь обязательные поля', () => {
            const articles = getAllArticles();
            articles.forEach((article) => {
                expect(article).toHaveProperty('slug');
                expect(article).toHaveProperty('title');
                expect(article).toHaveProperty('description');
                expect(article).toHaveProperty('date');
                expect(article).toHaveProperty('author');
            });
        });

        it('статьи должны быть отсортированы по дате (новые сверху)', () => {
            const articles = getAllArticles();
            const dates = articles
                .map((a) => (a.date ? new Date(a.date).getTime() : 0))
                .filter((d) => d > 0);

            for (let i = 1; i < dates.length; i++) {
                expect(dates[i - 1]).toBeGreaterThanOrEqual(dates[i]);
            }
        });

        it('не должен возвращать contentHtml', () => {
            const articles = getAllArticles();
            articles.forEach((article) => {
                expect(article).not.toHaveProperty('contentHtml');
            });
        });
    });

    describe('getArticleBySlug', () => {
        it('должен найти статью по существующему slug', async () => {
            const article = await getArticleBySlug('first-article');
            expect(article).not.toBeNull();
            expect(article?.slug).toBe('first-article');
            expect(article?.title).toBe('Моя первая статья');
        });

        it('должен вернуть contentHtml для существующей статьи', async () => {
            const article = await getArticleBySlug('first-article');
            expect(article).toHaveProperty('contentHtml');
            expect(typeof article?.contentHtml).toBe('string');
            expect(article?.contentHtml.length).toBeGreaterThan(0);
        });

        it('должен преобразовать Markdown в HTML', async () => {
            const article = await getArticleBySlug('first-article');
            expect(article?.contentHtml).toContain('<h1>');
            expect(article?.contentHtml).toContain('</h1>');
        });

        it('должен вернуть null для несуществующего slug', async () => {
            const article = await getArticleBySlug('nonexistent-slug-12345');
            expect(article).toBeNull();
        });
    });

    describe('getAllSlugs', () => {
        it('должен вернуть массив строк', () => {
            const slugs = getAllSlugs();
            expect(Array.isArray(slugs)).toBe(true);
            slugs.forEach((slug) => {
                expect(typeof slug).toBe('string');
            });
        });

        it('должен содержать slug из файлов', () => {
            const slugs = getAllSlugs();
            expect(slugs).toContain('first-article');
            expect(slugs).toContain('second-article');
            expect(slugs).toContain('third-article');
        });

        it('не должен содержать дубликаты', () => {
            const slugs = getAllSlugs();
            const uniqueSlugs = [...new Set(slugs)];
            expect(slugs.length).toBe(uniqueSlugs.length);
        });
    });
});
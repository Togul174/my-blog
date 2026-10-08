import { describe, it, expect, vi } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from './[slug]';

function mockReqRes(method: string, query: Record<string, string | string[]> = {}) {
    const req = { method, query } as unknown as NextApiRequest;
    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
    } as unknown as NextApiResponse;
    return { req, res };
}

describe('GET /api/articles/[slug]', () => {
    it('должен вернуть 200 и статью для существующего slug', async () => {
        const { req, res } = mockReqRes('GET', { slug: 'first-article' });
        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        const jsonCall = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
        expect(jsonCall.slug).toBe('first-article');
        expect(jsonCall.title).toBe('Моя первая статья');
        expect(jsonCall).toHaveProperty('contentHtml');
    });

    it('должен вернуть 404 для несуществующего slug', async () => {
        const { req, res } = mockReqRes('GET', { slug: 'nonexistent-xyz' });
        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Статья не найдена' });
    });

    it('должен вернуть 400 для некорректного slug', async () => {
        const { req, res } = mockReqRes('GET', { slug: 'invalid slug!' });
        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Некорректный slug' });
    });

    it('должен вернуть 400 для slug с path traversal', async () => {
        const { req, res } = mockReqRes('GET', { slug: '../../etc/passwd' });
        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('должен вернуть 400 если slug — массив', async () => {
        const { req, res } = mockReqRes('GET', { slug: ['a', 'b'] });
        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('должен вернуть 405 для POST', async () => {
        const { req, res } = mockReqRes('POST', { slug: 'first-article' });
        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(405);
    });
});
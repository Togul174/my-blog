import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from './new';
import { temporaryArticles } from '../../../lib/store';

function mockReqRes(method: string, body: unknown = {}) {
    const req = { method, body } as NextApiRequest;
    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
    } as unknown as NextApiResponse;
    return { req, res };
}

describe('POST /api/articles/new', () => {
    beforeEach(() => {
        temporaryArticles.length = 0;
    });

    it('должен создать статью и вернуть 201', async () => {
        const { req, res } = mockReqRes('POST', {
            title: 'Тестовая статья',
            content: '## Контент',
            description: 'Описание',
            author: 'Автор',
        });

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        const jsonCall = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
        expect(jsonCall.message).toBe('Статья создана');
        expect(jsonCall.article.title).toBe('Тестовая статья');
        expect(jsonCall.article.slug).toBe('тестовая-статья');
    });

    it('должен вернуть 400 если тело пустое', async () => {
        const { req, res } = mockReqRes('POST', null);

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('должен вернуть 400 если нет title', async () => {
        const { req, res } = mockReqRes('POST', { content: 'Контент' });

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Поле "title" обязательно' });
    });

    it('должен вернуть 400 если нет content', async () => {
        const { req, res } = mockReqRes('POST', { title: 'Заголовок' });

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Поле "content" обязательно' });
    });

    it('должен вернуть 405 для GET', async () => {
        const { req, res } = mockReqRes('GET');

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(405);
    });

    it('должен создать уникальный slug при дубликате', async () => {
        const { req: req1, res: res1 } = mockReqRes('POST', {
            title: 'Статья',
            content: 'Контент 1',
        });
        await handler(req1, res1);

        const { req: req2, res: res2 } = mockReqRes('POST', {
            title: 'Статья',
            content: 'Контент 2',
        });
        await handler(req2, res2);

        const jsonCall = (res2.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
        expect(jsonCall.article.slug).toBe('статья-2');
    });
});
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from './articles';

function mockReqRes(method: string) {
    const req = { method } as NextApiRequest;
    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
    } as unknown as NextApiResponse;
    return { req, res };
}

describe('GET /api/articles', () => {
    it('должен вернуть 200 и массив статей', async () => {
        const { req, res } = mockReqRes('GET');
        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        const jsonCall = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
        expect(Array.isArray(jsonCall)).toBe(true);
    });

    it('должен вернуть 405 для POST', async () => {
        const { req, res } = mockReqRes('POST');
        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(405);
        expect(res.json).toHaveBeenCalledWith({ message: 'Метод не разрешен' });
    });

    it('должен вернуть 405 для DELETE', async () => {
        const { req, res } = mockReqRes('DELETE');
        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(405);
    });
});
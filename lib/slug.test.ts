import { describe, it, expect } from 'vitest';
import { makeSlug } from './slug';

describe('lib/slug', () => {
    describe('makeSlug', () => {
        it('должен привести к нижнему регистру', () => {
            expect(makeSlug('Моя Статья')).toBe('моя-статья');
        });

        it('должен заменить пробелы на дефисы', () => {
            expect(makeSlug('моя статья тут')).toBe('моя-статья-тут');
        });

        it('должен убрать спецсимволы', () => {
            expect(makeSlug('Моя Статья!')).toBe('моя-статья');
            expect(makeSlug('Что? Где? Когда?')).toBe('что-где-когда');
        });

        it('должен убрать множественные дефисы', () => {
            expect(makeSlug('моя    статья')).toBe('моя-статья');
            expect(makeSlug('моя---статья')).toBe('моя-статья');
        });

        it('должен убрать дефисы по краям', () => {
            expect(makeSlug('-моя статья-')).toBe('моя-статья');
            expect(makeSlug('  моя статья  ')).toBe('моя-статья');
        });

        it('должен ограничить длину 50 символами', () => {
            const longTitle = 'а'.repeat(100);
            const slug = makeSlug(longTitle);
            expect(slug.length).toBeLessThanOrEqual(50);
        });

        it('должен вернуть "article" для пустой строки', () => {
            expect(makeSlug('')).toBe('article');
        });

        it('должен вернуть "article" для строки только из спецсимволов', () => {
            expect(makeSlug('!!!???')).toBe('article');
        });

        it('должен сохранить цифры', () => {
            expect(makeSlug('Статья 2024')).toBe('статья-2024');
        });

        it('должен работать с кириллицей', () => {
            expect(makeSlug('Привет мир')).toBe('привет-мир');
        });
    });
});
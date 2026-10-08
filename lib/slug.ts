export function makeSlug(title: string): string {
    return (
        title
            .toLowerCase()
            .trim()
            .replace(/[^a-zа-я0-9\s-]/gi, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 50) || 'article'
    );
}
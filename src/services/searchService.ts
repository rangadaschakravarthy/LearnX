import { SearchItem } from '../types/course';
import defaultIndex from '../generated/search-index.json';

export class SearchService {
  private static index: SearchItem[] = defaultIndex as SearchItem[];

  static search(query: string, limit = 20): SearchItem[] {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];

    const tokens = q.split(/\s+/).filter(Boolean);

    const scored: Array<{ item: SearchItem; score: number }> = [];

    for (const item of this.index) {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const pathLower = item.relativePath.toLowerCase();
      const phaseLower = item.phaseTitle?.toLowerCase() || '';
      const dayLower = item.dayTitle?.toLowerCase() || '';

      // Exact title match gets huge bonus
      if (titleLower === q) score += 100;
      else if (titleLower.startsWith(q)) score += 50;
      else if (titleLower.includes(q)) score += 30;

      // Token matches
      let matchedTokens = 0;
      for (const token of tokens) {
        if (titleLower.includes(token)) {
          score += 20;
          matchedTokens++;
        } else if (item.keywords.some(k => k.includes(token))) {
          score += 10;
          matchedTokens++;
        } else if (phaseLower.includes(token) || dayLower.includes(token)) {
          score += 8;
          matchedTokens++;
        } else if (pathLower.includes(token)) {
          score += 5;
          matchedTokens++;
        }
      }

      if (matchedTokens > 0) {
        // Boost exercises and examples if user asks for them
        if (q.includes('exercise') && item.type === 'exercise') score += 15;
        if (q.includes('example') && item.type === 'example') score += 15;
        if (q.includes('solution') && item.type === 'solution') score += 15;

        scored.push({ item, score });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map(s => s.item);
  }

  static getTotalIndexed(): number {
    return this.index.length;
  }
}

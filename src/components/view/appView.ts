import News from './news/news';
import Sources from './sources/sources';
import { EverythingApiResponse, NewsArticle, NewsSource, SourcesApiResponse } from '../../types';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;
    private currentArticles: NewsArticle[];

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.currentArticles = [];
    }

    public drawNews(data: EverythingApiResponse): void {
        const values: NewsArticle[] = data && Array.isArray(data.articles) ? data.articles : [];
        this.currentArticles = values;
        this.news.draw(values);
        this.updateNewsCount(values.length);
        this.setLoading(false);
    }

    public drawSources(data: SourcesApiResponse): void {
        const values: NewsSource[] = data && Array.isArray(data.sources) ? data.sources : [];
        this.sources.draw(values);
        this.updateSourcesCount(values.length);
    }

    public highlightSource(sourceId: string): void {
        this.sources.highlightActive(sourceId);
    }

    public filterNews(query: string): void {
        const trimmedQuery: string = query.trim().toLowerCase();
        if (!trimmedQuery) {
            this.news.draw(this.currentArticles);
            this.updateNewsCount(this.currentArticles.length);
            return;
        }

        const filtered: NewsArticle[] = this.currentArticles.filter((article: NewsArticle): boolean => {
            const titleMatch: boolean = article.title.toLowerCase().includes(trimmedQuery);
            const descMatch: boolean = Boolean(
                article.description && article.description.toLowerCase().includes(trimmedQuery)
            );
            return titleMatch || descMatch;
        });

        this.news.draw(filtered);
        this.updateNewsCount(filtered.length);
    }

    public setLoading(isLoading: boolean): void {
        const loader: HTMLElement | null = document.querySelector('#loader');
        if (loader) {
            if (isLoading) {
                loader.classList.add('is-loading');
            } else {
                loader.classList.remove('is-loading');
            }
        }
    }

    private updateSourcesCount(count: number): void {
        const badge: HTMLElement | null = document.querySelector('#sourcesCount');
        if (badge) {
            badge.textContent = `${count} channels`;
        }
    }

    private updateNewsCount(count: number): void {
        const badge: HTMLElement | null = document.querySelector('#newsCount');
        if (badge) {
            badge.textContent = `${count} articles`;
        }
    }
}

export default AppView;

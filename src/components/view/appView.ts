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
        this.setLoading(false);
        if (data && data.status === 'error') {
            this.showError(data.message || 'Failed to load news articles. Please try again.');
            return;
        }

        const values: NewsArticle[] = data && Array.isArray(data.articles) ? data.articles : [];
        this.currentArticles = values;
        this.news.draw(values);
        this.updateNewsCount(values.length);
    }

    public drawSources(data: SourcesApiResponse): void {
        this.setLoading(false);
        if (data && data.status === 'error') {
            this.showError(data.message || 'Failed to load news channels. Please check connection.');
            return;
        }

        const values: NewsSource[] = data && Array.isArray(data.sources) ? data.sources : [];
        this.sources.draw(values);
        this.updateSourcesCount(values.length);
    }

    public showError(message: string): void {
        this.setLoading(false);
        const newsContainer: HTMLElement | null = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = `
                <div class="news__empty news__empty--error">
                    <p class="news__empty-title">Unable to load data</p>
                    <p class="news__empty-desc">${message || 'Please check your network connection or try again later.'}</p>
                </div>
            `;
        }
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

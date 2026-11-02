import News from './news/news';
import Sources from './sources/sources';
import { EverythingApiResponse, NewsArticle, NewsSource, SourcesApiResponse } from '../../types';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: EverythingApiResponse): void {
        const values: NewsArticle[] = data && Array.isArray(data.articles) ? data.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: SourcesApiResponse): void {
        const values: NewsSource[] = data && Array.isArray(data.sources) ? data.sources : [];
        this.sources.draw(values);
    }

    public highlightSource(sourceId: string): void {
        this.sources.highlightActive(sourceId);
    }
}

export default AppView;

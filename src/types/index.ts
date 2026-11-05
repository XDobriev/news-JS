export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
    MocksSources = 'mocks/sources',
    MocksEverything = 'mocks/everything',
}

export enum HttpStatus {
    OK = 200,
    Unauthorized = 401,
    NotFound = 404,
    InternalServerError = 500,
}

export interface NewsSource {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly url: string;
    readonly category: string;
    readonly language: string;
    readonly country: string;
}

export type ArticleSource = Pick<NewsSource, 'id' | 'name'>;

export interface NewsArticle {
    readonly source: ArticleSource;
    readonly author: string | null;
    readonly title: string;
    readonly description: string;
    readonly url: string;
    readonly urlToImage: string | null;
    readonly publishedAt: string;
    readonly content: string | null;
}

export type ApiStatus = 'ok' | 'error';

export interface SourcesApiResponse {
    readonly status: ApiStatus;
    readonly sources: NewsSource[];
    readonly message?: string;
    readonly code?: string;
}

export interface EverythingApiResponse {
    readonly status: ApiStatus;
    readonly totalResults: number;
    readonly articles: NewsArticle[];
    readonly message?: string;
    readonly code?: string;
}

export type NewsApiResponse = SourcesApiResponse | EverythingApiResponse;

export type RequestOptions = Partial<Record<string, string | number>>;

export interface ApiRequest {
    readonly endpoint: Endpoint | string;
    readonly options?: RequestOptions;
}

export type LoaderOptions = Partial<Record<string, string | number>>;

export type Callback<T> = (data: T) => void;

export type Nullable<T> = T | null;

export type ReadonlyNewsSource = Readonly<NewsSource>;
export type ReadonlyNewsArticle = Readonly<NewsArticle>;

export type ReadonlySourcesList = ReadonlyArray<ReadonlyNewsSource>;
export type ReadonlyArticlesList = ReadonlyArray<ReadonlyNewsArticle>;

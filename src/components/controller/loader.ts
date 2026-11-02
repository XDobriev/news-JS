import { ApiRequest, Callback, Endpoint, HttpMethod, HttpStatus, LoaderOptions, RequestOptions } from '../../types';

class Loader {
    protected readonly baseLink: string;
    protected readonly options: LoaderOptions;

    public constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: ApiRequest,
        callback: Callback<T> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(HttpMethod.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === HttpStatus.Unauthorized || res.status === HttpStatus.NotFound) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw new Error(res.statusText);
        }

        return res;
    }

    private isValidApiKey(key: unknown): boolean {
        if (typeof key !== 'string') {
            return false;
        }
        const trimmed: string = key.trim();
        return (
            trimmed.length >= 10 &&
            !trimmed.includes(' ') &&
            !trimmed.includes('http') &&
            !trimmed.toLowerCase().includes('get your own')
        );
    }

    private makeUrl(options: RequestOptions, endpoint: Endpoint | string): string {
        const urlOptions: RequestOptions = { ...this.options, ...options };
        const normalizedBase: string = this.baseLink.endsWith('/') ? this.baseLink : `${this.baseLink}/`;

        let resolvedEndpoint: string = endpoint;
        const apiKey: string | number | undefined = this.options.apiKey;
        const hasApiKey: boolean = this.isValidApiKey(apiKey);

        if (!hasApiKey && normalizedBase.includes('rss-news-api.onrender.com')) {
            if (endpoint === Endpoint.Sources || endpoint === 'sources') {
                resolvedEndpoint = Endpoint.MocksSources;
            } else if (endpoint === Endpoint.Everything || endpoint === 'everything') {
                resolvedEndpoint = Endpoint.MocksEverything;
            }
        }

        let url = `${normalizedBase}${resolvedEndpoint}?`;

        const keys: string[] = Object.keys(urlOptions);
        keys.forEach((key: string): void => {
            const value: string | number | undefined = urlOptions[key];
            if (value !== undefined && value !== '') {
                url += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
            }
        });

        return url.endsWith('&') || url.endsWith('?') ? url.slice(0, -1) : url;
    }

    private load<T>(
        method: HttpMethod,
        endpoint: Endpoint | string,
        callback: Callback<T>,
        options: RequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response): Response => this.errorHandler(res))
            .then((res: Response): Promise<T> => res.json())
            .then((data: T): void => callback(data))
            .catch((err: unknown): void => {
                console.error(err);

                const normalizedBase: string = this.baseLink.endsWith('/') ? this.baseLink : `${this.baseLink}/`;
                const isProxy: boolean = normalizedBase.includes('rss-news-api.onrender.com');

                if (isProxy && (endpoint === Endpoint.Sources || endpoint === 'sources')) {
                    this.load<T>(method, Endpoint.MocksSources, callback, options);
                    return;
                }

                if (isProxy && (endpoint === Endpoint.Everything || endpoint === 'everything')) {
                    this.load<T>(method, Endpoint.MocksEverything, callback, options);
                    return;
                }

                const errorMessage: string = err instanceof Error ? err.message : 'Network request failed';
                callback({
                    status: 'error',
                    message: errorMessage,
                    sources: [],
                    articles: [],
                    totalResults: 0,
                } as unknown as T);
            });
    }
}

export default Loader;

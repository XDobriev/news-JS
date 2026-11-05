import AppLoader from './appLoader';
import { Callback, Endpoint, EverythingApiResponse, SourcesApiResponse } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesApiResponse>): void {
        super.getResp<SourcesApiResponse>(
            {
                endpoint: Endpoint.Sources,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: Callback<EverythingApiResponse>): void {
        let target: EventTarget | null = e.target;
        const newsContainer: HTMLElement = e.currentTarget as HTMLElement;

        while (target && target !== newsContainer) {
            if (target instanceof HTMLElement && target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<EverythingApiResponse>(
                        {
                            endpoint: Endpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = (target as HTMLElement).parentElement;
        }
    }
}

export default AppController;

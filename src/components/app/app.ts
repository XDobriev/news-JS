import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { EverythingApiResponse, SourcesApiResponse } from '../../types';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesElement: HTMLElement | null = document.querySelector('.sources');

        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e: MouseEvent): void => {
                const target: HTMLElement | null = (e.target as HTMLElement).closest('.source__item');
                if (!target) {
                    return;
                }

                const sourceId: string | null = target.getAttribute('data-source-id');
                const currentSourceId: string | null = sourcesElement.getAttribute('data-source');

                if (sourceId && sourceId === currentSourceId) {
                    return;
                }

                if (sourceId) {
                    this.view.highlightSource(sourceId);
                    this.view.setLoading(true);
                }

                this.controller.getNews(e, (data: EverythingApiResponse): void => {
                    this.view.drawNews(data);
                });
            });

            sourcesElement.addEventListener('keydown', (e: KeyboardEvent): void => {
                if (e.key === 'Enter' || e.key === ' ') {
                    const target: HTMLElement | null = (e.target as HTMLElement).closest('.source__item');
                    if (target) {
                        e.preventDefault();
                        target.click();
                    }
                }
            });
        }

        const searchInput: HTMLInputElement | null = document.querySelector('#newsSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e: Event): void => {
                const target: HTMLInputElement = e.target as HTMLInputElement;
                this.view.filterNews(target.value);
            });
        }

        this.view.setLoading(true);
        this.controller.getSources((data: SourcesApiResponse): void => {
            this.view.drawSources(data);

            const firstSource: HTMLElement | null = document.querySelector('.source__item');
            if (firstSource) {
                firstSource.click();
            }
        });
    }
}

export default App;

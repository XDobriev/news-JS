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
                let target: EventTarget | null = e.target;
                while (target && target !== sourcesElement) {
                    if (target instanceof HTMLElement && target.classList.contains('source__item')) {
                        const sourceId: string | null = target.getAttribute('data-source-id');
                        if (sourceId) {
                            this.view.highlightSource(sourceId);
                        }
                        break;
                    }
                    target = (target as HTMLElement).parentElement;
                }

                this.controller.getNews(e, (data: EverythingApiResponse): void => {
                    this.view.drawNews(data);
                });
            });
        }

        this.controller.getSources((data: SourcesApiResponse): void => {
            this.view.drawSources(data);
        });
    }
}

export default App;

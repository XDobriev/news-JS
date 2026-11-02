import './sources.css';
import { NewsSource, ReadonlySourcesList } from '../../../types';

class Sources {
    public draw(data: ReadonlySourcesList): void {
        const sourcesContainer: HTMLElement | null = document.querySelector('.sources');
        if (!sourcesContainer) {
            return;
        }

        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        if (!sourceItemTemp) {
            console.error('Template #sourceItemTemp not found in DOM');
            return;
        }

        data.forEach((item: NewsSource): void => {
            const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const nameElement: HTMLElement | null = sourceClone.querySelector('.source__item-name');
            if (nameElement) {
                nameElement.textContent = item.name;
            }

            const itemElement: HTMLElement | null = sourceClone.querySelector('.source__item');
            if (itemElement) {
                itemElement.setAttribute('data-source-id', item.id);
                itemElement.setAttribute('title', item.description || item.name);
            }

            fragment.append(sourceClone);
        });

        sourcesContainer.innerHTML = '';
        sourcesContainer.append(fragment);
    }

    public highlightActive(sourceId: string): void {
        const sourceItems: NodeListOf<HTMLElement> = document.querySelectorAll('.source__item');

        sourceItems.forEach((element: HTMLElement): void => {
            if (element.getAttribute('data-source-id') === sourceId) {
                element.classList.add('source__item--active');
            } else {
                element.classList.remove('source__item--active');
            }
        });
    }
}

export default Sources;

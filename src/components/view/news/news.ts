import './news.css';
import { NewsArticle, ReadonlyArticlesList } from '../../../types';

class News {
    private readonly defaultImage: string =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 360' width='100%25' height='100%25'%3E%3Crect width='600' height='360' fill='%23171d26'/%3E%3Cpath d='M230 220l45-55 55 65 35-40 60 70H175z' fill='%2338bdf8' opacity='0.35'/%3E%3Ccircle cx='235' cy='135' r='22' fill='%2338bdf8' opacity='0.45'/%3E%3Ctext x='50%25' y='82%25' dominant-baseline='middle' text-anchor='middle' fill='%238b949e' font-family='sans-serif' font-size='18' font-weight='600'%3ENo Preview Available%3C/text%3E%3C/svg%3E";

    public draw(data: ReadonlyArticlesList): void {
        const newsContainer: HTMLElement | null = document.querySelector('.news');
        if (!newsContainer) {
            return;
        }

        const news: NewsArticle[] = data.length >= 10 ? data.slice(0, 10) : [...data];

        if (news.length === 0) {
            newsContainer.innerHTML = `
                <div class="news__empty">
                    <p class="news__empty-title">No articles found</p>
                    <p class="news__empty-desc">Please choose another news source to see latest updates.</p>
                </div>
            `;
            return;
        }

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        if (!newsItemTemp) {
            console.error('Template #newsItemTemp not found in DOM');
            return;
        }

        news.forEach((item: NewsArticle, idx: number): void => {
            const newsClone: DocumentFragment = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const itemElement: HTMLElement | null = newsClone.querySelector('.news__item');
            if (itemElement && idx % 2 !== 0) {
                itemElement.classList.add('alt');
            }

            const photoElement: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
            if (photoElement) {
                const rawUrl: string = item.urlToImage || this.defaultImage;
                const safeUrl: string = rawUrl.replace(/"/g, '\\"');
                photoElement.style.backgroundImage = `url("${safeUrl}")`;
            }

            const authorElement: HTMLElement | null = newsClone.querySelector('.news__meta-author');
            if (authorElement) {
                authorElement.textContent = item.author || item.source.name || 'Editorial Staff';
            }

            const dateElement: HTMLElement | null = newsClone.querySelector('.news__meta-date');
            if (dateElement) {
                dateElement.textContent = this.formatDate(item.publishedAt);
            }

            const titleElement: HTMLElement | null = newsClone.querySelector('.news__description-title');
            if (titleElement) {
                titleElement.textContent = item.title;
            }

            const sourceElement: HTMLElement | null = newsClone.querySelector('.news__description-source');
            if (sourceElement) {
                sourceElement.textContent = item.source.name || 'News';
            }

            const contentElement: HTMLElement | null = newsClone.querySelector('.news__description-content');
            if (contentElement) {
                contentElement.textContent =
                    item.description ||
                    item.content ||
                    'Click below to read the full story on the original publication.';
            }

            const readMoreLink: HTMLAnchorElement | null = newsClone.querySelector('.news__read-more a');
            if (readMoreLink) {
                readMoreLink.setAttribute('href', item.url);
                readMoreLink.setAttribute('target', '_blank');
                readMoreLink.setAttribute('rel', 'noopener noreferrer');
            }

            fragment.append(newsClone);
        });

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }

    private formatDate(isoDate: string): string {
        if (!isoDate) {
            return '';
        }

        const datePart: string = isoDate.slice(0, 10);
        const parts: string[] = datePart.split('-');
        if (parts.length === 3) {
            return parts.reverse().join('-');
        }

        return datePart;
    }
}

export default News;

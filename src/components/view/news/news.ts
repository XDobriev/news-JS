import './news.css';
import { NewsArticle, ReadonlyArticlesList } from '../../../types';

class News {
    private readonly defaultImage: string =
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80';

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
                const imageUrl: string = item.urlToImage || this.defaultImage;
                photoElement.style.backgroundImage = `url("${imageUrl}")`;
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

        try {
            const date: Date = new Date(isoDate);
            if (!isNaN(date.getTime())) {
                const day: string = String(date.getDate()).padStart(2, '0');
                const month: string = String(date.getMonth() + 1).padStart(2, '0');
                const year: number = date.getFullYear();
                return `${day}-${month}-${year}`;
            }
        } catch {
            // fallback to string slicing
        }

        return isoDate.slice(0, 10).split('-').reverse().join('-');
    }
}

export default News;

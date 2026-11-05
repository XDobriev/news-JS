import Loader from './loader';
import { LoaderOptions } from '../../types';

class AppLoader extends Loader {
    public constructor() {
        const apiUrl: string = process.env.API_URL || 'https://rss-news-api.onrender.com/';
        const apiKey: string = process.env.API_KEY || '';
        const options: LoaderOptions = apiKey ? { apiKey } : {};

        super(apiUrl, options);
    }
}

export default AppLoader;

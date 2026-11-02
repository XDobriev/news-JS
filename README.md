# News Portal (TypeScript Migration)

A responsive single-page web application for browsing global news headlines, migrated from JavaScript to strictly typed TypeScript with Webpack and ESLint.

## 🚀 Features

- **Full TypeScript Migration**: Strict typing throughout the application (`strict: true`, `noImplicitAny: true`), zero use of `any`.
- **Clean Architecture**:
  - `Loader` & `AppLoader`: Typed HTTP client using Fetch API, generics, enums, and utility types.
  - `AppController`: Controls business logic for fetching news channels and articles.
  - `AppView`, `News`, `Sources`: Decoupled view layer rendering DOM components safely.
- **Adaptive & Responsive Design**:
  - Fully responsive across viewports from `320px` to `1920px`.
  - Mobile-first approach with smooth transitions, touch-friendly scrollable channels row, and alternating desktop article cards.
- **UX Enhancements**:
  - **Live Search / Filter**: Filter displayed articles by keywords in real-time.
  - **Active Source Highlight**: Visual feedback indicating the currently selected channel.
  - **Loading & Empty States**: Clean loader spinner during requests and helpful empty states.
  - **Fallback Imagery**: Safe image fallbacks for missing article preview photos.
- **Footer Attribution**:
  - Author GitHub profile link.
  - Course year `2024`.
  - RS School logo with course link.

## 🛠️ Tech Stack

- **TypeScript** (Strict mode)
- **Webpack 5** (`ts-loader`, `html-webpack-plugin`, `css-loader`, `style-loader`, `dotenv-webpack`)
- **ESLint** (`@typescript-eslint/recommended`, `no-explicit-any: error`, `prettier`)
- **CSS3** (CSS Variables, Flexbox, Media Queries, Backdrop Filter)

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd news-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Set your API variables (defaults to the RS School proxy if no personal API key is supplied):
   ```env
   API_URL=https://rss-news-api.onrender.com/
   API_KEY=
   ```

4. **Start Development Server**:
   ```bash
   npm start
   ```
   The application will open at `http://localhost:8080/`.

5. **Build for Production**:
   ```bash
   npm run build
   ```
   Compiled assets will be placed in the `dist/` directory.

6. **Run Linter & Type Check**:
   ```bash
   npm run lint
   npm run type-check
   npm run validate
   ```

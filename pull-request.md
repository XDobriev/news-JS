# Pull Request: News API (Migration from JS to TS)

### Task Link
[News API FullStack](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/TS-news-api/migration-newip-to-ts.md)

### Pull Request Description
- Complete migration of the News API application from JavaScript to strictly typed TypeScript.
- Set up and configured Webpack with `ts-loader` for `.ts` files and modern module resolution.
- Integrated ESLint with `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, and `typescript-eslint/recommended` preset.
- Strictly prohibited and eliminated all occurrences of the `any` type (`@typescript-eslint/no-explicit-any: error`).
- Configured `tsconfig.json` with `"strict": true` and `"noImplicitAny": true`.
- Applied TypeScript concepts across all layers:
  - **Enums**: `HttpMethod`, `Endpoint`, `HttpStatus`.
  - **Generics**: Generic `load<T>` and `getResp<T>` methods, typed callback `Callback<T>`.
  - **Interfaces & Object Types**: `NewsSource`, `NewsArticle`, `SourcesApiResponse`, `EverythingApiResponse`, `ApiRequest`, `LoaderOptions`.
  - **Utility Types**: `Pick` (`Pick<NewsSource, 'id' | 'name'>`), `Partial` (`Partial<Record<string, string | number>>`), `Readonly` (`Readonly<NewsArticle>`), and `ReadonlyArray`.
  - **Access Modifiers**: `public`, `private`, `protected`, `readonly` on class members.
  - **Union & Function Types**: Explicit function signatures, typed callbacks, and event listener narrowing.
- Implemented responsive and adaptive design from `320px` to `1920px` with CSS variables, modern dark aesthetic, smooth pill-scroller for news sources, and alternating desktop card layouts.
- Added UX features & robustness:
  - Real-time article search/filter by keyword.
  - Active source indicator highlighting the currently loaded channel with auto-scroll.
  - Interactive loading spinner, resilient error state recovery, and empty states.
  - Keyboard navigation (Enter / Space) for news source selection.
  - Self-contained SVG image placeholder eliminating external CDN failures.
- Styled footer with RS School logo and link to course, author GitHub link, and creation year.

---

### Evaluation Criteria Checklist (170 / 170 points)

#### 1. Repository Setup (40 / 40 points)
- [x] **(20 points)** Pull request is made in accordance with the Pull Request Requirements.
- [x] **(20 points)** Commit history is maintained, and commit names follow the Commit Convention (`feat:`, `chore:`, `refactor:`, `docs:`).

#### 2. Code Quality (100 / 100 points)
- [x] **(50 points)** The application is fully migrated to TypeScript:
  - [x] **(10 points)** Everyday Types and Enums are used (`HttpMethod`, `Endpoint`, `HttpStatus`).
  - [x] **(10 points)** Generics are used (`getResp<T>`, `load<T>`, `Callback<T>`).
  - [x] **(10 points)** Object Types & Interfaces are used (`NewsSource`, `NewsArticle`, `SourcesApiResponse`, `EverythingApiResponse`).
  - [x] **(10 points)** Classes and access modifiers (`private`, `public`, `protected`, `readonly`) are used across all classes (`Loader`, `AppLoader`, `AppController`, `AppView`, `News`, `Sources`, `App`).
  - [x] **(10 points)** Function Types are used.
- [x] **(10 points)** ESLint is configured for TypeScript with `no-explicit-any` enabled and 0 errors.
- [x] **(10 points)** The `any` type isn't used anywhere in the codebase.
- [x] **(20 points)** The TypeScript configuration file includes `"noImplicitAny": true` and `"strict": true`.
- [x] **(10 points)** Webpack is configured to work with TypeScript (`ts-loader`, `.ts` entry and extensions).

#### 3. Design and Application Functionality (30 / 30 points)
- [x] **(10 points)** Adaptive layout is implemented (`320px` - `1920px`).
- [x] **(20 points)** Custom design improvements: modern dark theme, active source pill indicators, live article keyword search/filter, loading spinner, resilient error recovery, self-contained SVG placeholder, and responsive cards.

**Total Score: 170 / 170**


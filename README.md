# NUSWhispers (Vue Port)
> Vue + TypeScript port of NUSWhispers' front-end application.

A personal experiment to replicate [NUSWhispers](https://www.nuswhispers.com)'s front-end application using [Vue](https://vuejs.org).

**Warning:** This is a WORK IN PROGRESS! It is undecided whether this web application will replace the existing one.

## Feature Parity Checklist
- [x] Core Layout
- [x] Featured
- [x] Latest
- [x] Popular
- [x] Categories
- [x] Tags
- [x] Single Confession
- [x] Search
- [x] Submit Confession
- [x] Privacy Policy
- [ ] Authentication
- [ ] Favorites
- [ ] Likes
- [ ] Comments

## (Hipster) Checklist
- [x] TypeScript
- [x] TSLint
- [x] Vue
- [x] Vue Router
- [x] Vuex
- [x] ESLint (internal scripts only)
- [x] No jQuery / Bootstrap
- [x] CSS Modules
- [x] SVG Sprites
- [ ] Autotrack (GA)
- [x] Webpack 2
- [x] Code Splitting
- [x] Jest
- [ ] Travis CI
- [ ] Code Coverage
- [x] Service Workers
- [ ] E2E
- [x] Yarn
- [x] Server-side Rendering (SSR)
- [x] Title / Meta Management

## Requirements
- Node 7.0+

## Install / Build
1. Copy `.env.example` as `.env` and fill in the keys.
2. Run any of the following commands:

``` bash
# Install dependencies
yarn

# Build
yarn run build

# Run server at http://localhost:8090/
yarn run start

# Run development server at http://localhost:8090/
yarn run watch
```

## Credits
- [vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)
- [vue-typescript-jest](https://github.com/locoslab/vue-typescript-jest)
- [Vue.js Server-Side Rendering Guide](https://ssr.vuejs.org/en/)
- [Jest for all: Episode 1 — Vue.js](https://hackernoon.com/jest-for-all-episode-1-vue-js-d616bccbe186)

## License
The MIT License (MIT). Please see [License File](LICENSE) for more information.

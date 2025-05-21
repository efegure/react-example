<h1 align="center">New React App</h1>

## npm

```sh
npm install
```

```sh
npm run dev
```

## yarn

```sh
yarn
```

```sh
yarn dev
```

<br />

## ⚗️ Technologies list

- [TypeScript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Moment](https://momentjs.com/)
- [ESlint](https://eslint.org/) & [Prettier](https://prettier.io/)
- [MSW](https://mswjs.io/)
- [Faker.js](https://fakerjs.dev/)

---

<br />

# 🚀 Available Scripts

In the project directory, you can run:

<br />

## ⚡️ start

```
npm start
```

or

```
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

<br />

## 🧪 test

```
npm test
```

or

```
yarn test
```

Launches the test runner in the interactive watch mode.

<br />

## 🦾 build

```
npm build
```

or

```
yarn build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

<br />

## 🧶 lint

```
npm lint
```

or

```
yarn lint
```

Creates a `.eslintcache` file in which ESLint cache is stored. Running this command can dramatically improve ESLint's running time by ensuring that only changed files are linted.

<br />

## 🎯 format

```
npm format
```

or

```
yarn format
```

Checks if your files are formatted. This command will output a human-friendly message and a list of unformatted files, if any.

<br />

# 🧬 Project structure

This is the structure of the files in the project:

```sh
Directory structure:
└── efegure-react-example/
    ├── README.md
    ├── index.html
    ├── jest.config.cjs
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── .eslintignore
    ├── .eslintrc.cjs
    ├── .prettierrc
    ├── public/
    │   ├── manifest.json
    │   ├── mockServiceWorker.js
    │   ├── robots.txt
    │   └── .htaccess
    └── src/
        ├── App.tsx
        ├── index.tsx
        ├── setupTests.ts
        ├── vite-env.d.ts
        ├── __tests__/
        │   └── pages/
        │       ├── HomePage.test.tsx
        │       └── NotFoundPage.test.tsx
        ├── components/
        │   ├── product/
        │   │   ├── ProductForm.tsx
        │   │   └── ProductList.tsx
        │   └── user/
        │       ├── UserForm.tsx
        │       └── UserList.tsx
        ├── features/
        │   ├── productSlice.ts
        │   └── userSlice.ts
        ├── lib/
        │   ├── customAxios.ts
        │   ├── product-api.ts
        │   └── user-api.ts
        ├── mock/
        │   ├── browser.ts
        │   └── handlers.ts
        ├── pages/
        │   ├── NotFoundPage.tsx
        │   ├── Product/
        │   │   ├── AddProductPage.tsx
        │   │   ├── EditProductPage.tsx
        │   │   ├── index.ts
        │   │   ├── ProductDetailPage.tsx
        │   │   ├── ProductOutlet.tsx
        │   │   └── ProductPage.tsx
        │   ├── Root/
        │   │   ├── HomePage.tsx
        │   │   ├── Outlet.tsx
        │   │   └── RootPage.tsx
        │   └── User/
        │       ├── AddUserPage.tsx
        │       ├── EditUserPage.tsx
        │       ├── index.ts
        │       ├── UserDetailPage.tsx
        │       ├── UserOutlet.tsx
        │       └── UsersPage.tsx
        ├── resources/
        │   ├── api-constants.ts
        │   └── routes-constants.ts
        ├── store/
        │   └── store.ts
        ├── styles/
        │   ├── _mixins.sass
        │   ├── _variables.sass
        │   ├── global.css
        │   └── main.sass
        ├── types/
        │   ├── common.ts
        │   ├── domain.ts
        │   └── reducers.ts
        └── utility/
            └── functions.ts
```

<p align="center">Bootstrapped with Vite.</p>

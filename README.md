## About
This single-page application is a mock shape-selling webstore, developed as a coding challenge.

## Quick-start

* `git clone` using the protocol of your choice.
* ```
  cd shape-store
  npm install && npm start
  ```
* Browse to `localhost:8081` to start shopping!

## Technical Information

Tech stack: React + Webpack + Typescript + Material UI

Dev environment: VSCode, Node v15 on WSL2

## Architecture Philosophy

Although the project is small in scope, all components were developed with scalability and integration in mind.

`client.ts` simulates fetching data from an API endpoint.

`theme` is extendable and customizable to adapt to more styling items.

`ShapeStoreCard.tsx` works independantly, allowing different store layouts.

`CartProvider.tsx` is implemented through React Context, thus providing access to the cart details and actions to the whole application.

## UI Design

A flat, high-contrast theme is preserved throughout the whole UI.
Most components were re-styled to follow these guidelines.

The application is implemented through Material UI's Grid system (based on CSS Flex).
Components scale fluidly with screen-size if needed and react to screen breakpoints.
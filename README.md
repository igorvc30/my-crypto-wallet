# Zero Hash Code Challenge

## Description

0# - Crypto wallet

Project created using React, Typescript, Vite, Tanstack Query, Tanstack Router

Routes created using the File-Based Routing, recommended by the [official docs](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing)

Authentication flow from [official docs example](https://tanstack.com/router/latest/docs/framework/react/how-to/setup-authentication)

Manual number input validation due to [antd form issue](https://www.exchangetuts.com/index.php/why-number-validate-rule-doesnt-work-in-antd-1641667924261289)

Components organization inspired in [Atomic Design](https://medium.com/@janelle.wg/atomic-design-pattern-how-to-structure-your-react-application-2bb4d9ca5f97), using mainly Pages, Template (Layouts)

### Prerequisites

- Node JS Installed https://nodejs.org/en/download

### Getting Started

Once you have met the prerequisites, you can prepare your environment by following these steps:

To install dependencies run `npm install`

To run the project `npm run dev`

### Debugging Tools

Tanstack Query DevTools
Tanstack Router DevTools

### Known Issues

- Account Transfer form is breaking for long address in small devices
- Fix redirect after login

### Next Improvements

- Remove inline css from component and move to another file
- Override theme classes style to fix Select Input at Account Transfer Form
- Improve Skeleton
- Improve user session to avoid login again after page reload
- Add breaking points for small devices
- Update theme to stop repeating hardcoded color

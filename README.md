# ODIGEO Frontend challenge

## The exercise
<details>
<summary>
You are responsible to develop a new *Home* and *Results* pages for *eDreams*.
</summary>

The minimum requirements for the *Home* page are:

* The page should contain a *search form* with the following fields:
  * Departure location
  * Arrival location
  * Departure date
  * *Search* button
* Departure and arrival location must be a dropdown field
  * You can retrieve the locations data at this endpoint: http://localhost:3000/locations

The minimum requirements for the *Results* page are:

* Display the results of the previous search, ordered by *price*.
  * In case all fields of the previous search were empty, all itineraries should be displayed.
  * You can retrieve the itineraries data at this endpoint: http://localhost:3000/itineraries
  * For each itinerary, you should display:
    * Price
    * Departure location
    * Arrival location
    * Departure date
    * Arrival date
    * Airline/carrier

### Valuable features
* Production-ready code (modular, testable, reusable)
* Mobile-first
* Single-page application

### Nice to have
* Styles following eDreams brand

### Not to be changed
* You should not modify the API responses or the server logic
</details>

## The solution
* Single-page application
* React + React Router
* Typescript
* CSS modules
* Babel + Webpack
* Jest + React Testing Library

### Project structure
* **`src` folder: frontend application code**
  * `api`: types + wrappers for the api calls to the backend services
  * `hooks`: `useQuery` custom hook to handle URL search params
  * `Layout`: global page framework with an outlet for the page HOCs
  * `pages`: page HOCs, and their respective components
    * `Home`: components for the search form & its search button
    * `Itineraries`: components for the results page
  * `App.tsx`: wrappers for the whole application, including the frontend router
  * `utils.ts`: helper functions

### Running the project

1. Install dependencies
    ```sh
    $ npm install
    ```
1. Build the application
    ```sh
    $ npm run build
    ```
1. Run the backend server:
   ```sh
   $ npm run start
   ```
1. Open a browser and navigate to `http://localhost:3000/`

### Runing unit tests
1. Install dependencies
    ```sh
    $ npm install
    ```
1. Run tests
    ```sh
    $ npm run test
    ```

## Known issues
* Reloading the *Itineraries* page results in a `Cannot GET /results` error. Probably a conflict between the front- and the backend routers. Tried re-creating the React Router on the *Itineraries* page, but also failed.

  This problem would not happen on a project that has frontend and backend in separate servers.

* Datepicker allows selecting past dates. In a real project, I would have set its `min` property to the current date, but given most of the itineraries on the test data are from 2022 and we are forbidden to change the backend data or code, I left it unrestricted.

* Faulty navigation with keyboard. Since I decided to keep the dependencies to the bare minimum, I'm not using any components library. In a real project, I would have used *Material UI*, *React Select*, or any other well-tested library to avoid re-inventing the wheel.

* Changing screen orientation on mobile devices does not change the page layout. In a real case, I would have included event listeners for the `orientationchange` and `resize` window events, or an event listener to the `window.matchMedia` live media-query method. Combined with a memoized value or a hook to replace the `window.matchMedia` calls I use in the code to check the screen orientation.

* Itineraries are not paginated. The backend service does not allow for filtering or pagination, but I could have faked it on the `api` wrapper. Combined with an 'infinite-scroll' mechanism to pull for more data when the user scrolls to the bottom of the list.

* No loading 'spinners'. Both the locations and the itineraries loader functions switch a `loading` state in their respective components, but it is currently not being used. In a real case, a loading indicator would be rendered when said state is set.

## Challenges met
### Issues with dependencies
Some dependencies on the scaffolding's `package-lock.json` file were unreachable (namely, `yargs-parser`). Deleting this file to retry installing dependencies from the `package.json` file failed.

> **Overcome**
>
> **Action:** Create a new project from scratch, using a bare-minimum-dependencies policy.

### Not using `create-react-app`
Having both front- and backend in the same project is not a practice I had seen before. Setting-up a React+Typescript project without using CRA required me to dig deeper into Babel and Webpack than what I used to.

> **Overcome**
>
> **Action:** Investigate how to set up properly Babel's presets and which of its loaders would I need, and also how to configure Webpack's rules to handle JS, TS, and CSS modules.

### Front-end testing
I had never before created tests for the frontend on a React application. I decided to use *React Testing Library* in combination with *Jest*. I've found `@testing.library/user-event` very useful, but I have run into some blockers that would need additional study to be overcome.

> **Partially done**
>
> There is partial test coverage, and some of the test cases fail as stated in the commentaries. Also, I tried using `msw` to mock the backend services but didn't find a way to resolve an issue raised by the fact that the tests run in NodeJs, where `fetch` does not exist. I tried using both `node-fetch`, and then `whatwg-fetch` following `msw`'s docs, but even if `whatwg-fetch` avoided the issue it failed to retrieve the mocked-up responses.

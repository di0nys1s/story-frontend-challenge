## Autocomplete challenge
* `yarn install` to setup the project
* `npx json-server --watch data/db.json` in another console to run the mock `json-server`
* `yarn serve` to compile the project
* `yarn test:unit` to run the unit tests

### Additional notes
* Add search filter on api call, send search value to server and return the filtered list recommended for better performance
* Wait between each calls when user add new character after 2nd character (lodash.debounce is one option)
* Lighthouse performance analyze conducted and 100 SEO and Accessibility
# VMT Screening Tool
---
### Get Started
1. `npm install`
1. `npm run start in terminal`
2. `the site will launch in browser at localhost:3000, or the next open port in the 808x range`

## npm Scripts
---
+ `npm run start`
Bundles and serves application in development environment. Watches for changes in `src` and `webpack.config.js`

+ `npm run build`

## Data Updates & Breaking Changes
---
1. Search `#DATA` to find all locations in the config that are affected by data field and key/value pair updates.
2. Service request method 
  + Verify whether the service accepts `GET` or `POST` requests. Update `requestOptions` in the `geoprocessor` function in src/controllers/esriMapController.js accordingly.




## Development
---
Application utilizes [React](https://facebook.github.io/react/ "React") for building user interfaces, [Redux](http://redux.js.org/ "Redux") for state management.

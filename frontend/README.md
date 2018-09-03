## Plan Guru frontend.

### How to run
```
git clone https://github.com/mauryaavinash95/peoplegrove.git
cd frontend/
npm install
npm start
# To point to local API server edit src/config.js and point to http://localhost:4000/apis/v1/
```

### Folder structure:
Basic structure created by create-react-app (CRA).
```
Project folder name: frontend
frontend
├── build
│   ├── asset-manifest.json
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   ├── service-worker.js
│   └── static
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── README.md
├── src
│   ├── actions
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── components
│   ├── config.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reducers
│   ├── registerServiceWorker.js
│   ├── router
│   ├── store.js
│   └── styles
└── static.json
```

1. `src/` contains all the working and entry points to the application
2. `public/` contains standard template and invocation to application entry points.
3. `build/` contains optimized build for production purposes.

### src
1. `App.js` acts as the entrypoint gluing the root element and registering service-worker.
2. `store.js` contains the redux state store for the application.
3. `router/`:   
  3.1. `index.js`: Includes all routes and frontend path resolutions.
  3.2. `history.js`: Includes history object for manipulating navigation paths for the application.
4. `components` contains all the visible components for the application.    
  4.1. `Main.js` contains the route checking based on authentication status and container for application theme.

### routes
1. `/` shows login page (default landing page)
2. `/home` shows users schedule
3. `/setschedule` searches for users and shows their schedule - Can book appointments from this screen

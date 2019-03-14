#### Node-TS-express-mongodb-API

## Running the API
### Development
To start the application in development mode, run:

```bash
npm install -g nodemon
npm install -g ts-node
npm install -g typescript
npm install
```

Start the application in dev env:
```
nodemon
```
Start the application in production env:

Install ts pm2 and typescript compiler:
```
npm install -g pm2
pm2 install typescript
```

example start with scale on 2 core:
```
pm2 start ./src/index.ts -i 1 \
    && sleep 1 \
    && pm2 scale index 2 --no-daemon
```

Express server listening on http://localhost:3000/, in development mode

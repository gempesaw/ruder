# ruder

ruder is a webserver that makes http requests for you, since you can't
do it yourself. Like if you're a browser, and jsonP only allows GETs
and CORS stops you from accessing other domains.

## installation

    $ npm install
    $ npm start

### endpoints

#### POST /

Make a POST to `/` with a payload like:

    GET https://www.google.com

The ruder server will parse that strange payload into a viable request
and return you the contents.

## development

For development, you may be interested in the following commands. The
`-watch` commands use nodemon and restart automatically after file
changes.

    $ npm run start-watch

    $ npm run test
    $ npm run test-watch

# ruder [![Build Status](https://travis-ci.org/honeydew-sc/ruder.svg?branch=master)](https://travis-ci.org/honeydew-sc/ruder)

ruder is a webserver that makes http requests for you, since you can't
do it yourself. Like if you're a browser, and jsonP only allows GETs
and CORS stops you from accessing other domains.

## installation

    $ npm install
    $ npm start

### endpoints

#### POST /

Make a POST to `/` with a payload like:

```
{ "data": "POST https://www.example.com
Arbitrary: Header

{ \"some\": \"json payload\" }}"
```

The header and body are optional; for example, a simple DELETE payload
could look like `{"data": "DELETE https://www.google.com" }`.

The ruder server will parse that strange payload into a viable request
and return you the contents without the headers. Also, it just assumes
that the body contents of your request are json, so good luck with
that.

## development

For development, you may be interested in the following commands. The
`-watch` commands use nodemon and restart automatically after file
changes.

    $ npm run start-watch

    $ npm run test
    $ npm run test-watch

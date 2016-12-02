# ruder [![Build Status](https://travis-ci.org/honeydew-sc/ruder.svg?branch=master)](https://travis-ci.org/honeydew-sc/ruder)

ruder is a webserver that makes http requests for you, since you can't
do it yourself. Like if you're a browser, and jsonP only allows GETs
and CORS stops you from accessing other domains.

## installation

    $ npm install
    $ npm start

### endpoints

#### POST /


This is the only endpoint in the service. It requires the
`Content-Type: application/json` header. For example, if our service
is running on 4444, the following request would return the source of
`google.com`.

```
POST http://localhost:4444
Content-Type: application/json

{ "data": "GET https://www.google.com" }
```

As a curl, that's

```
$ curl -X POST http://localhost:4444 -H"Content-Type: application/json"  -d'{"data":"GET https://www.google.com"}'
```


The header and body are optional; for example, a simple DELETE payload
could look like `{"data": "DELETE https://www.google.com" }`.

The ruder server parses that payload into a viable request and return
you the contents without the headers. If your payload is JSON, ruder
will also set the `Content-Type` headers automatically on its own
request. If it's not JSON, no `Content-Type` will be set, but in both
cases you're free to set your own.

## development

For development, you may be interested in the following commands. The
`-watch` commands use nodemon and restart automatically after file
changes.

    $ npm run start-watch

    $ npm run test
    $ npm run test-watch

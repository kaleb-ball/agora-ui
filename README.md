# Agora-UI

Agora-UI is a React application integrated with the [Agora API](https://github.com/jake-hansen/agora) application. Combined, they create an application capable of managing a user's video conferencing needs by integrating the functionality of several popular meeting platforms like Zoom and Webex in a single application.

## Setup

To develop the Agora-UI, you should have Docker and Yarn installed, along with your favorite IDE. The Agora-UI project uses [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow),
so the [GitFlow CLI](https://github.com/nvie/gitflow) is also a recommended tool. Once you have these tools installed, follow these steps to start the application.

1. `yarn install` will install the project's dependencies

2. `yarn start` will start the application server on `localhost:3000`

3. Start the API


## Development Proxy

In order for callback URLs to function correctly in the development environment, the application must be capable of procecssing TLS requests.

To that end,
* The `proxy-dev` directory contains a Dockerfile to build an Nginx image that is capable of proxying requests to the front end and supports TLS.
* The `proxy-dev/ssl` directory contains a script to assist with generating self-signed certificates for development. The generated `{domain-name}.crt` and `{domain-name}.key` need to be renamed to `cert.crt` and `cert.key` respectively in order for the proxy Dockerfile to embed these files in the image.

    The `generate.sh` script takes one argument, which is the common name for the certificate. For example running
    ```sh
    $ ./generate.sh localhost
    ```
    will generate a certificate and keys for the domain `localhost`.
* A development configuration can be easily run from the root of the directory by issuing the command `docker-compose up`. This will build the Agora UI production build and proxy images and listen for requests on port `443`.

## Adding Features
Any feature branch added to GitHub should be in the `feature/feature_name` format.

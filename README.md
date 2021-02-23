# Agora-UI

Agora-UI is a React application integrated with the [Agora API](https://github.com/jake-hansen/agora) service.

## Setup

To develop the Agora-UI, you should have Docker and Yarn installed, along with your favorite IDE. The Agora-UI project uses [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow), 
so the [GitFlow CLI](https://github.com/nvie/gitflow) is also a recommended tool. Once you have these tools installed, follow these steps to start the application.

1. `yarn install` will install the project's dependencies

2. `yarn start` will start the application server on `localhost:3000`

3. Start the API 

In the future, Agora and Agora UI will support Docker Compose for development and Kubernetes in production, but for now the two applications must be built and run seperately.


### Docker

To build a Docker image of the project, run `docker image build .` in the application's root directory.


## Adding Features
Any feature branch added to GitHub should be in the `feature/feature_name` format.
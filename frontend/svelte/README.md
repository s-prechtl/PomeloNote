# Creating the svelte project

## Create the docker image

``docker build -t svelte .``

## Run the docker container

``docker run --name svelte -dp 5173:5173 svelte``

## Mastercommand for rebuild run etc.

``docker build -t svelte .;docker stop svelte;docker rm svelte; docker run --name svelte -dp 5173:5173 svelte``
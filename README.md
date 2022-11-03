# 🚀 Getting started with PomeloNote

## Setup
- run `npm i`
- get the .env file and save it to the root directory of the project
- set up Strapi  
  - go to `localhost:1337/admin`
  - register an admin user
  - go to Settings => Users&Permissions Plugin => Roles => Authenticated => Note => Select all
  - Save

### Starting the container with svelte and strapi:
``docker-compose up --build -d``

### Restart and rebuild Svelte:
``docker-compose up --detach --build svelte``

### Restart and rebuild Strapi:
``docker-compose up --detach --build strapi``

[TEST](index.md)

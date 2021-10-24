# User Management REST API

A REST API for admin/superuser of an org to manage users. This includes ADD, REMOVE, UPDATE, DELETE an user.

## Tech & Plugins

- [Express] - fast node.js network app framework
- [Sequelize] - ORM library for database operations.
- [Mocha] - Testing Environment Provider.
- [Chai] - Assertion Library
- [Mochawesome] - Cool library to generate test reports

## Folder/Files Structure

- [index.js](index.js) - Server spaws from this file and is also responsible for initialzing the database.
- [docs](./docs/) - Contain the API Docs.
- [router.js](routes.js) - This list all the GET, PUT, POST, DELETE routes available for user API.
- [models/user.js](./models/user.js) - Sequelize Model class for a user.
- [test](./test) - Test Suite for the application testing
- [auth.js](./auth.js) - Extract and Validate Json Web Tokens from requests.
- [mochawesome.html](./mochawesome-report/mochawesome.html) - Contains the report for the test cases.

---

## Requirements

For development, you will only need Node.js and a node global package, NPM, installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [node.js] and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [node.js] and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`!

    $ npm install npm -g

## Install

    $ git clone https://github.com/aaps3579/user-management-system.git
    $ cd PROJECT_TITLE
    $ npm install

## Running the project

    $ npm start

Verify the project is running by navigating to
[127.0.0.1:8000](127.0.0.1:8000)

## Testing the project

    $ npm test

[node.js]: http://nodejs.org
[express]: http://expressjs.com
[sequelize]: https://sequelize.org
[mocha]: https://mochajs.org
[chai]: https://www.chaijs.com/
[mochawesome]: https://www.npmjs.com/package/mochawesome

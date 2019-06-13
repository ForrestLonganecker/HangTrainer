##Welocome to my Hangboard training app!

---

To run:

- Clone the repo

---

Before running the application you will need to install:

nodemon:
`$ npm install --save-dev nodemon`

morgan
`$ npm install --save-dev morgan`

---

create a `.env` file in the root-directory of the app:

`$ touch .env`

add a cookieSecret to that file ie:

`cookieSecret="something you want here"`

---

Bootstrap the database:

1. install [postgreSQL Homebrew(mac/linux)](https://wiki.postgresql.org/wiki/Homebrew)  
[postgreSQL interactive installer(windows)](https://www.postgresql.org/download/windows/)

2. create the database: `$ createdb -U postgres -w hangtrainer-dev`

3. run the migrations: `$ sequelize db:migrate`

---

To run:

- `$ nodemon server/index.js`

---

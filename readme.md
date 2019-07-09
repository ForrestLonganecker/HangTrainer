## Welocome to my Hangboard training app!  

_If you would like to see the deployed version please follow the link below_  

[HangTrainer demo](https://forrestlonganecker-hangtrainer.herokuapp.com/)

---

To run:

__First clone the repo__

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

__To run:__

- `$ npm run dev`

---

__To run tests:__

Install jasmine:

- `$ npm i --save-dev jasmine`

Then:

- `$ npm run test`

---

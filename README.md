# Shop made with React and Node.js
 ![MIT License](https://img.shields.io/badge/license-MIT-blue)
<br>
 <img src="./frontend/public/home-page.PNG" alt="Print Home Page" width="700">.
 ### Demo app: https://shop-project.nkportfolio.tech
# About
 This project is a shop that let users create requests, manage items and use many more features.
 In order to use admin features, please use the following account: email: "admin@gmail.com", password: "12345".
 For the web page I used React and the API was made using Node.js.
 The authentication occurs on the middleware, using HTTPOnly Signed Cookies and JWT.
 The API makes the communication between the web page and the database that stores all the data.
 If you want to add or remove an item on the site, please, use moderately.

# Working on
 - [x] ~~Better UI~~
 - [x] ~~New sorting options~~
 - [x] ~~Tests with JEST~~

 # Used Tecnologies
  ### Back-end
  - JavaScript
  - Node.js
  - Express
  - Prisma
  - MySQL
  - Cookie-Parser
  - Bcrypt
  - JWT
  - CORS

  ### Front-end
  - React
  - JavaScript
  - Axios
  - JSX
  - CSS

  ### Implantation
  - Website: https://shop-project.nkportfolio.tech
  - API: https://shop-project-api.nkportfolio.tech (check project for routes)

 # Testing
  ### Prerequisites
  - Node.js installed
  - NPM installed
  - Git installed
  - MySQL Database named "shop-project"
 ### Step-by-step
 ```bash
 # clone repository
 git clone https://github.com/nicolaskleinaraujo/shop-project

 # enter "backend" folder
 cd shop-project\backend

 # Install depedencies
 npm install

 # Create a .env file with your database url
 DATABASE_URL = "mysql://yourUser:yourPassword@localhost:3306/shop_project"

 # Run the following prisma command
 npx prisma db push

 # Run the test command
 npm run test
 ```

  # Author
   Nicolas Klein Faria de Araujo <br>
   https://nkportfolio.tech

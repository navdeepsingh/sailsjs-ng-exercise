# Sailsjs + Mongodb + Angularjs

### Database Management System

Sailsjs is a node framework works with MySQL to NoSQL (MongoDB) with conjunction with Angularjs.

### Installation
```sh
$ git clone [git-repo-url] sailsjs-app
$ cd sailsjs-app
```

### Steps to deploy
```sh
1. npm install

2. // Importing DB files into tmp folder
cd /tmp
curl -LO https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json //use correct json link

2. // Use mongoimport to import Database Schema into your Mongo Server
mongoimport --db sailjs --collection user --file /tmp/user.json
mongoimport --db sailjs --collection role --file /tmp/role.json
mongoimport --db sailjs --collection menu --file /tmp/menu.json

3. Run nodemon or sails lift

4. http://localhost:1337/ Here u GO
```

### Status
Admin Panel Sailjs Prototype is ready

###### Thanks, ######
__*Navdeep Singh*__

# RESTHub
A simple contacts app with model-view-controller (MVC) architecture to demonstrate simple RESTful API implementation (GET, POST, PUT, DELETE). Tests are developed with Mocha and Chai.

## Setting up
Clone this repo and cd into repo directory:\
`git clone https://github.com/Yen-Peng/resthub.git`\
`cd resthub`\
Run `brew services start mongodb-community` (for mac).\
Keep this terminal window open so that mongo server continues to run for the rest of the tasks.

In another terminal window, cd into same dir.\
Run `npm install` followed by `npm start`.

In browser, open http://localhost:4000/api/contacts/ to see api website.

## Task B1
To run API locally, install [Postman](https://www.postman.com/downloads/) and open the app.

### Commands for testing in Postman:
For the Request URLs below that take in {id}, replace {id} with the id of an individual's contact, which is a unique alphanumeric string attached to each contact.

**POST /api/contacts** - to create a new contact (takes in 4 keys: name, email, phone and gender).\
Select dropdown POST.\
Enter Request URL: http://localhost:4000/api/contacts/ <br/>
Under the 'Body' tab, 'x-www-form-urlencoded' format, enter the 4 keys and their appropriate values.\
Click Send.

**PUT /api/contacts/{id}** - to update a single contact (takes in the updated key-value pairs).\
Select dropdown PUT.\
Enter Request URL: http://localhost:4000/api/contacts/{id} <br/>
Under the 'Body' tab, 'x-www-form-urlencoded' format, edit the values of the keys.\
Click Send.

**GET /api/contacts** - to list all contacts\
Select dropdown GET.\
Enter Request URL: http://localhost:4000/api/contacts/ <br/>
Click Send.

**GET /api/contacts/{id}** - to retrieve a single contact\
Select dropdown GET.\
Enter Request URL: http://localhost:4000/api/contacts/{id} <br/>
Click Send.

**DELETE /api/contacts/{id}** - to delete a single contact.\
Select dropdown DELETE.\
Enter Request URL: http://localhost:4000/api/contacts/{id} <br/>
Under the 'Body' tab, 'x-www-form-urlencoded' format, edit the values of the keys.\
Click Send.

## Task B2
To run test locally, run the command `npm test`. Ensure that mongodb-community service is still running for tests to work.



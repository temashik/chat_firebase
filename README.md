# Chat app
Test project, where I created a chat App. It have 3 folders for each server. I wanted to contain full project in one repo, thats why I did this. 
## Installation
1. Clone this repo.
2. Create Firebase Firestore database and copy config to ```.env``` file in ```/server``` folder with fields:
  ```
        PORT=/*number of port you use (8000 for example, 3000 used for react and 4000 for socket.io in my app)*/
        API_KEY=/*...*/                {
        AUTH_DOMAIN=/*...*/            {     config
        PROJECT_ID=/*...*/             {     from
        STORAGE_BUCKET=/*...*/         {     Firestore
        MESSAGING_SENDER_ID=/*...*/    {     database
        APP_ID=/*...*/                 {
        SALT=/*salt for encrypting password (any number 0-9 would be enough)*/
 ```
3. Because there are 3 projects in one repo, you can manually separate them to different projects locally, or run in one, just using 3 terminals.
4. For each project ```cd *project folder*```, then run ```npm i```. Make sure nodemon is installed in server and socket projects, or change ```package.json``` scripts for your choise, e.g. ```node index.js``` in ```server``` project.
5. Run by: client ```npm run start```, server ```npm run dev```. socket ```npm run dev```.

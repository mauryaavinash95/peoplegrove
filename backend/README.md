## Plan Guru backend

### How to run
```
git clone https://github.com/mauryaavinash95/peoplegrove.git
cd backend/
npm install
npm start # Defaults to port 3000
# For custom port run: NODE_ENV=dev PORT=$customPort node server.js
# To point to local DB, edit config/local_conf.json
# DB Schema gets created automatically
```

### Routes:
1. User Signup      
POST `/signup`      
```  
Request:
{
    "username":"username",
    "name": "full name",
    "email": "username@mail.com",
    "password": "password",
    "timezone": "Asia/Kolkata"
}
```

2. User signin          
POST `/signin`
```
Request:
{
    "email": "username@mail.com",
    "password": "password"
}
```

3. User search  
GET `/search`
```
Request:
/search?username=xyz
```

4. Set appointment      
POST `/setschedule`     
```
Request:
"header": {
    "token": "usertoken"
}
"body": {
    "host": "username",
    "date": "2018-09-02",
    "time": 5,
    "details": "none",
    "system": "mozilla"
}
```

5. Get appointment availablity of a given user  
GET `/getschedule/:username`
```
Request:
/getschedule/xyz
```

6. Get appointment schedule of loggedin user.   
GET `/`
```
Request:
"header": {
    "token": "usertoken"
}
```
7. Delete appointment of a given user using scheduleId      
DELETE `/:id`
```
Request:
"header": {
    "token": "usertoken"
}
```

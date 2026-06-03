const express = require('express')
const app = express()
app.use(express.json());
app.use(express.static('public'))

const jwt = require("jsonwebtoken")
const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!"

const index = (req, res) => {
  res.json({ data: 'secret data' })
}

const isLoggedIn = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const data = jwt.verify(token, key);
      console.log('The logged in user is: ' + data.username);
      return next()
    } catch (err) { 
      return res.status(401).send("Invalid Token");
    }
  }
  else
    return res.status(403).send('Token required');
}

const processLogin = (req, res) => {
  if (req.body.username == 'guest' && req.body.password == '123456') {
    const data = { username: req.body.username }
    const token = jwt.sign(data, key)
    res.status(201).json({ token });
  }
  else
    res.status(404).send('Invalid username and/or password')
}

app.post('/login', processLogin)
app.get('/', isLoggedIn, index)
app.listen(89)
require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const data = [
    {
      username: 'Utkarsh',
      Age: '22'
    },
    {
      username: 'Ayush',
      Age: '25'
    }
  ]

  app.get('/data', authenticate, (req, res) => {
    res.json(data.filter(post => post.username === req.user.name))
  })
  
  function authenticate(req, res, next) {
    const heading = req.headers['authorization']
    const token = heading && heading.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) 
      return res.sendStatus(403)
      
      req.user = user
      next()
    })
  }
  
  app.listen(5000)
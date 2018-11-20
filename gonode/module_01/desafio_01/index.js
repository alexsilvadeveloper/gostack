const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

const checkMiddleware = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('form')
})

app.post('/check', (req, res) => {
  const { age } = req.body

  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  }

  return res.redirect(`/minor?age=${age}`)
})

app.get('/major', checkMiddleware, (req, res) => {
  const { age } = req.query

  return res.render('message', { age })
})

app.get('/minor', checkMiddleware, (req, res) => {
  const { age } = req.query

  return res.render('message', { age })
})

app.listen(3000)

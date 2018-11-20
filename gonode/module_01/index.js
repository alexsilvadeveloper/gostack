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

/* const logMiddleware = (req, res, next) => {
  console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
  );

  req.appName = "GoNode";

  return next();
}; */

// app.use(logMiddleware);

/* app.get("/", logMiddleware, (req, res) => {
  //return res.send(`Bem-vindo, ${req.query.name}`);
  return res.send(`Bem-vindo, ${req.appName}`);
}); */

/* app.get("/login", (req, res) => {
  return res.send("Login");
});

app.get("/name/:name", (req, res) => {
  return res.json({
    message: `Welcome, ${req.params.name}`,
  });
}); */

const users = ['Alex Silva', 'Alan Silva']

app.get('/', (req, res) => {
  return res.render('list', { users })
})

app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/create', (req, res) => {
  users.push(req.body.user)

  return res.redirect('/')
})

app.listen(3000)

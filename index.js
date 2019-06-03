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

const checkParamsAgeMiddleware = (req, res, next) => {
  const age = req.query.age
  if (!age) { return res.redirect('/') }
  return next()
}

app.get('/', (req, res) => {
  return res.render('list')
})

app.get('/minor', checkParamsAgeMiddleware, (req, res) => {
  const age = req.query.age
  return res.render('minor', { age })
})

app.get('/major', checkParamsAgeMiddleware, (req, res) => {
  const age = req.query.age
  return res.render('major', { age })
})

app.post('/check', (req, res) => {
  const age = req.body.age
  if (age < 18) res.redirect(`/minor?age=${age}`)
  res.redirect(`/major?age=${age}`)
})

app.listen(3000)

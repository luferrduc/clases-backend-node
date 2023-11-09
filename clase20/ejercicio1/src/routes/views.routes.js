import { Router } from "express";

const router = Router()

// Middlewares

const publicAccess = (req, res, next)  => {
  if(req.session?.user) return res.redirect('/')
  next()
}

const privateAccess = (req, res, next)  => {
  if(!req.session?.user) return res.redirect('/login')
  next()
}

router.get('/register', publicAccess ,(req, res) => {
  res.render('register')
})
.get("/login", publicAccess, (req, res) => {
  res.render('login')

})
.get('/', privateAccess, (req, res) => {
  res.render('profile', {
    user: req.session.user
  })
})

export default router
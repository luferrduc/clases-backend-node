import { Router } from "express"

const router = Router()


const WORDS = ['test', 'product']

router.get("/:word([a-zA-Z]+)", (req, res) => {
  return res.send(req.params.word)
})
.put("/:word", (req, res) => {
  return res.send(req.word)
})
.delete("/:word", (req, res) => {
  return res.send(req.word)
})
.param("word", (req, res, next, word) => {
  const searchWord = WORDS.find( wd => wd === word)
  if(!searchWord){
    return res.status(404).send({ status: "error", message: "word not found" })
  }
  req.word = searchWord
  next()
})
.get("*", (req, res) => {
  return res.status(404).send('cannot get specified word')
})

export default router
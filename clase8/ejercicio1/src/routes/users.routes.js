import { Router } from "express";

const router = Router()
const USERS = []

router
  .get("/", (req, res) => {
    res.send({ status: "success", payload: USERS });
  })

  .post("/", (req, res) => {
    const user = req.body
    if(!user.name){
        return res.status(400).send({status: "error", error: "Incomplete values"})
    }
    USERS.push(pet)
    return res.send({status: "success", payload: user})
  });


export default router
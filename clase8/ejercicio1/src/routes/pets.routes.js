import { Router } from "express";
import { uploader } from "../utils.js";

const router = Router();
const PETS = [];

router
  .get("/", (req, res) => {
    res.send({ status: "success", payload: PETS });
  })

  .post("/", (req, res) => {
    const pet = req.body
    if(!pet.name){
        return res.status(400).send({status: "error", error: "Incomplete values"})
    }
    PETS.push(pet)
    return res.send({status: "success", payload: pet})
  })
  .post("/v2", uploader.single('thumbnail') ,(req, res) => {
    const filename = req.file.filename
    if(!filename) return res.status(500).send({status: "error", error: "No se puede subir el archivo"})
    const pet = req.body
    if(!pet.name){
        return res.status(400).send({status: "error", error: "Incomplete values"})
    }
    pet.thumbnail = `http://localhost:8080/img/pets/${filename}`
    PETS.push(pet)
    return res.send({status: "success", payload: pet})
  });


export default router
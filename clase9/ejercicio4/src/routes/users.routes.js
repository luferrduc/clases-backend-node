import { Router } from "express";
const router = Router();

const USERS = [];

router.post("/", (req, res) => {
    const user = req.body
    USERS.push(user)
    return res.send({status: "success"})
})
.get('/', (req, res)=>{
    return res.send(USERS)
})

export default router;

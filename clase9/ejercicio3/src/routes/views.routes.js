import { Router } from "express";
const router = Router()


const food = [
    {
        name: "Pizza",
        price: 100
    },
    {
        name: "Soda",
        price: 30
    },
    {
        name: "Banana",
        price: 15
    },
    {
        name: "Ensalada",
        price: 8
    },
    {
        name: "Fruta",
        price: 60
    },
]

router.get('/', (req, res)=>{
    const testUser = {
        name: 'Luciano',
        role: 'admin'
    }

    const testUser2 = {
        name: 'José',
        role: 'User'
    }

    res.render('food', {
        user: testUser,
        style: 'index.css',
        isAdmin: testUser.role === 'admin',
        food
    })
})


export default router
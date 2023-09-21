// Resolver un CRUD

import express from "express";

const app = express();

// Middlewares

app.use(express.json());

const users = [];
// ROUTES
app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  const user = req.body;
  const { firstName, lastName } = user;
  if (!firstName || !lastName) {
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
  }
  if (users.length === 0) {
    user.id = 1;
  } else {
    user.id = users[users.length - 1].id + 1;
  }

  users.push(user);

  res.send(user);
});

app.put("/users/:id", (req, res) => {
    const user = req.body
    const userId = parseInt(req.params.id)
    const {firstName, lastName} = user
    if (!firstName || !lastName) {
        return res
          .status(400)
          .send({ status: "error", error: "Incomplete values" });
      }

    const userIndex = users.findIndex(user => user.id === userId)
    if(userIndex === -1) return res.status(404).send({status: "error", message: "User not found"})

    user.id = userId
    users[userIndex] = user
    return res.send({status: 'success', message: "User updated"})

});

app.delete('/users/:id', (req, res)=>{
    const userId = parseInt(req.params.id)
    const userIndex = users.findIndex(user => user.id === userId)
    if(userIndex === -1) return res.status(404).send({status: "error", message: "User not found"})

    users.splice(userIndex, 1)
    return res.send({status: "success", message: "User deleted"})
})

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

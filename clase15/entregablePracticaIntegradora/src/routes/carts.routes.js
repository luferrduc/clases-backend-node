import { Router } from "express";
// import CartManager from "../dao/fileManagers/cart-file.manager.js";
import CartsManager from "../dao/dbManagers/carts.manager.js";
import { cartsFilePath } from "../utils.js";

const router = Router();
// const manager = new CartManager(cartsFilePath);
const manager = new CartsManager();
router
  .get("/:cid", async (req, res) => {
    const cid = req.params.cid;
    try {
      const cart = await manager.getById(cid);
      if (!cart)
        return res
          .status(400)
          .send({ status: "error", error: "Cart not found" });

      return res.send({ status: "success", payload: cart });

    } catch (error) {
      return res.status(500).send({ status: "error", error: error.message });
    }
  })
  .post("/", async (req, res) => {
    const cart = await manager.create();
    if (cart.status === "server error")
      return res.status(500).send({ status: "error", error: cart.error });
    return res.send({ status: "success", payload: cart });
  })
  .post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const carts = await manager.addProduct(cid, pid);
    if (carts.status === "error")
      return res.status(400).send({ status: "error", error: carts.error });
    return res.send({ status: "success", payload: carts });
  });

export default router;

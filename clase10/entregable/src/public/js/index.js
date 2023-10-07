const socket = io();

const container = document.getElementById("container");
const form = document.getElementById("product-form");
const deleteButton = document.getElementById("delete-product")

form.addEventListener("submit", async (evt) => {
  evt.preventDefault()
  const data = Object.fromEntries( new FormData(evt.target))

  try {
    let result = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
    console.log(result)
    if(result.status === 400) return alert("Rellenar los campos")
  
  } catch (error) {
    console.log(error)
  }
});

socket.on("refreshProducts", (data) => {
  container.innerHTML = ``;
  data.forEach((product) => {
    container.innerHTML += `
    <section style="padding: 1.5rem">
      <div style="display: flex; flex-direction: column; gap: 10px; padding-bottom:0.8rem">
          <h3 style="margin-bottom: 0;">title: ${product.title}</h3> 
          <p style="margin: 0;">code: ${product.code}</p>
          <p style="margin: 0;">description: ${product.description}</p>
          <span style="margin: 0;">price: $${product.price}</span>
          <p style="margin: 0;">status: ${product.status}</p>
          <span style="margin: 0;">stock: ${product.stock}</span>
      </div>
      <button id="delete-product" style="background-color: red; padding:5px 10px; border-radius:25px; cursor:pointer; font-weight:bold">Eliminar</button>
    </section>
    `;
  });
});

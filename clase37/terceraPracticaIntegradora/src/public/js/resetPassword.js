const resetForm = document.getElementById("restablecer")


registerForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const data  = new FormData(registerForm)
  const obj = {}
  data.forEach((value, key) => {
    obj[key] = value
  })
  fetch('/api/sessions/reset-password', {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(result => {
    console.log(result)
    if(result.status === 201){
      window.location.replace("/login")
    }
    if(result.status === 400){
      alert("Usuario ya está registrado")
    }
    if(result.status === 422){
      alert("Error en los campos")
    }
  })

})
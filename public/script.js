document.getElementById("Guardo-envio").addEventListener("click", (event) => {
    event.preventDefault(); // Evitar el envío del formulario por defecto
  
    // Obtener los valores de los campos del formulario
    const code = document.getElementById("code").value;
    const description = document.getElementById("description").value;
    const stock = document.getElementById("stock").value;
    const value = document.getElementById("value").value;
    const sotckMin = document.getElementById("sotck-min").value;
  
    // Crear un objeto JSON con los datos del formulario
    const product = {
      code,
      description,
      stock,
      value,
      "sotck-min": sotckMin
    };
  
    const URL = "http://localhost:3000/";
  
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error en la respuesta del servidor");
        }
      })
      .then(data => {
        console.log(data);
        // Limpiar los campos del formulario después de recibir la respuesta del servidor
        if (data.state === true) {
          document.getElementById("code").value = "";
          document.getElementById("description").value = "";
          document.getElementById("stock").value = "";
          document.getElementById("value").value = "";
          document.getElementById("sotck-min").value = "";
          alert("Producto agregado correctamente");
        } else {
          alert(data.message);
        }
      })
      .catch(err => alert(err.message));
  });
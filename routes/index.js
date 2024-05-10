const router = require("express").Router();

const { renderFile } = require("ejs");

const path = require('path');
const fs = require('fs');


// Importar el archivo JSON completo
const booksData = require("./../resource/file/data");

router.get("/", (req, res) => {
  // Acceder al contenido del archivo JSON
  const productsObject = booksData.products; // Obtener el objeto "products"
  const products = Object.values(productsObject); // Obtener los valores del objeto "products" (los objetos de productos individuales)
  console.log(products); // Imprimirá un arreglo de objetos de productos

  // Aquí se imprimirán los datos de products
  res.render("index.ejs", { title: "Gestión de Productos", data: products });
 
});
  

router.get("/", (req, res) => {
  // Acceder al contenido del archivo JSON
  const productsObject = booksData.products; // Obtener el objeto "products"
  const products = Object.values(productsObject); // Obtener los valores del objeto "products" (los objetos de productos individuales)
  console.log(products); // Imprimirá un arreglo de objetos de productos

  // Aquí se imprimirán los datos de products
  res.render("ventas.ejs", { title: "Gestión de Productos", data: products });

});

//direccionar a otra pagina

router.get("/form", (req, res) => {
    res.render("form.ejs", { title: "Adicionar producto" });
});

router.get("/index", (req, res) => {
  res.render("index.ejs", { title: "productos" });
});
router.get("/ventas", (req, res) => {
  res.render("ventas.ejs", { title: "productos" });
});


router.post("/", (req, res) => {
  const { code, description, stock, value, sotckMin } = req.body;

  // Leer el archivo JSON existente
  const filePath = path.join(__dirname, '..', 'resource', 'file', 'books.json');
  let booksData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Obtener el objeto "products"
  const productsObject = booksData.products || {};

  // Verificar si el producto ya existe en el objeto "products"
  const productoExistente = productsObject[code];

  if (!productoExistente) {
    // Crear un nuevo objeto para el producto
    const nuevoProducto = {
      code,
      description,
      stock,
      value,
      "sotck-min": sotckMin
    };

    // Agregar el nuevo producto al objeto "products"
    booksData.products = { ...productsObject, [code]: nuevoProducto };

    // Escribir el nuevo objeto "products" en el archivo JSON
    fs.writeFileSync(filePath, JSON.stringify(booksData, null, 2));

    return res.status(200).json({ state: true, data: nuevoProducto });
  }

  return res.status(200).json({ status: false, message: "Producto ya Registrado" });
});
module.exports = router;

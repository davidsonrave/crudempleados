const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "empleados_crud",
});

app.use(express.json()); // Middleware para manejar datos JSON en las solicitudes

app.post("/create", (req, res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const direccion = req.body.direccion;
  const email = req.body.email;

  db.query(
    'INSERT INTO empleados(nombre,apellido,direccion,email) VALUES(?,?,?,?)',
    [nombre, apellido, direccion, email],
    (err, result) => {
      if (!err) {
        res.send({ msg: "Empleado creado con éxito!" });
      } else {
        console.log(err);
        res.status(500).send({ error: "Error al crear el empleado" });
      }
    }
  );
});

app.get("/empleados", (req, res) => {
  db.query("SELECT * FROM  empleados", (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
      
    }
  });
});

app.put("/update", (req, res) => {
  const { id, nombre, apellido, direccion, email } = req.body;

  // Validación de datos
  if (!id || !nombre || !apellido || !direccion || !email) {
    return res.status(400).send({ error: "Datos incompletos para la actualización" });
  }

  // Actualización en la base de datos
  db.query(
    'UPDATE empleados SET nombre=?,apellido=?,direccion=?,email=? WHERE id=?',
    [nombre, apellido, direccion, email, id],
    (err, result) => {
      if (!err) {
        res.send({ msg: "Empleado actualizado con éxito!" });
      } else {
        console.error(err);
        res.status(500).send({ error: "Error al actualizar el empleado", details: err.message });
      }
    }
  );
});


  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
 
  
    db.query(
      'DELETE FROM   empleados WHERE id=?',[id],
      (err, result) => {
        if (!err) {
          res.send({ msg: "Empleado ELIMINADO con éxito!" });
        } else {
          console.log(err);
          res.status(500).send({ error: "Error al ELIMINAR el empleado" });
        }
      }
    );
  });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

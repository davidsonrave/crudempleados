const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Separación de la configuración de la base de datos
const db = require("./database");

app.post("/create", async (req, res) => {
  try {
    const { nombre, apellido, direccion, email } = req.body;
    const result = await db.query('INSERT INTO empleados(nombre,apellido,direccion,email) VALUES(?,?,?,?)', [nombre, apellido, direccion, email]);
    res.send({ msg: "Empleado creado con éxito!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error al crear el empleado", details: err.message });
  }
});

app.get("/empleados", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM empleados");
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error al obtener los empleados", details: err.message });
  }
});

app.put("/update", async (req, res) => {
  try {
    const { id, nombre, apellido, direccion, email } = req.body;
    const result = await db.query('UPDATE empleados SET nombre=?,apellido=?,direccion=?,email=? WHERE id=?', [nombre, apellido, direccion, email, id]);
    res.send({ msg: "Empleado actualizado con éxito!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error al actualizar el empleado", details: err.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query('DELETE FROM empleados WHERE id=?', [id]);
    res.send({ msg: "Empleado eliminado con éxito!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error al eliminar el empleado", details: err.message });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

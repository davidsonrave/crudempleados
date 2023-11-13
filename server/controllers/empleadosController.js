import { db } from "../db.js";

export const createEmpleado = (req, res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const direccion = req.body.direccion;
  const email = req.body.email;

  db.query(
    "INSERT INTO empleados(nombre,apellido,direccion,email) VALUES(?,?,?,?)",
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
};

export const getEmpleados = (req, res) => {
  db.query("SELECT * FROM  empleados", (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
    }
  });
};
export const updateEmpleado = (req, res) => {
  const { id, nombre, apellido, direccion, email } = req.body;

  // Validación de datos
  if (!id || !nombre || !apellido || !direccion || !email) {
    return res
      .status(400)
      .send({ error: "Datos incompletos para la actualización" });
  }

  // Actualización en la base de datos
  db.query(
    "UPDATE empleados SET nombre=?,apellido=?,direccion=?,email=? WHERE id=?",
    [nombre, apellido, direccion, email, id],
    (err, result) => {
      if (!err) {
        res.send({ msg: "Empleado actualizado con éxito!" });
      } else {
        console.error(err);
        res
          .status(500)
          .send({
            error: "Error al actualizar el empleado",
            details: err.message,
          });
      }
    }
  );
};

export const deleteEmpleado = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM   empleados WHERE id=?", [id], (err, result) => {
    if (!err) {
      res.send({ msg: "Empleado ELIMINADO con éxito!" });
    } else {
      console.log(err);
      res.status(500).send({ error: "Error al ELIMINAR el empleado" });
    }
  });
};

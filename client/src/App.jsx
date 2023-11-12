import { useEffect, useState } from "react";
import Axios from "axios";
import "./index.css";
import Swal from "sweetalert2";

function App() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(0);

  const [editar, setEditar] = useState(false);

  const [empleados, setEmpleados] = useState([]);

  const add = () => {
    // Basic form validation
    if (!nombre || !apellido || !direccion || !email) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos",
        icon: "warning",
      });
      return;
    }
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      apellido: apellido,
      direccion: direccion,
      email: email,
    })
      .then(() => {
        getEmpleados();
        limpiarCampos();
        Swal.fire({
          title: "<p>Registro Exitoso</p>",
          html: `<i>El empleado ${nombre} fue registrado con éxito</i>`,
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            JSON.parce(JSON.stringify(error)).message === "Network Error"
              ? "Intente más tarde"
              : JSON.parce(JSON.stringify(error)).message,
        });
      });
  };

  const update = () => {
    if (!nombre || !apellido || !direccion || !email) {
      Swal.fire({
        title: "<p>Error</p>",
        html: `<i>Por favor, complete todos los campos</i>`,
        icon: "error",
      });
      return;
    }
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      apellido: apellido,
      direccion: direccion,
      email: email,
    })
      .then(() => {
        getEmpleados();
        limpiarCampos();
        Swal.fire({
          title: "<p>Registro Actualizado</p>",
          html: `<i>El empleado ${nombre} fue Actualizado  con éxito</i>`,
          icon: "success",
          timer: 3000,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            JSON.parce(JSON.stringify(error)).message === "Network Error"
              ? "Intente más tarde"
              : JSON.parce(JSON.stringify(error)).message,
        });
      });
  };
  const deleteEmpleado = (empleado) => {
    Swal.fire({
      title: "Confirmar Eliminado?",
      html: `<i>Quiere eliminar A: ${empleado.nombre}</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SÍ, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${empleado.id}`)
          .then(() => {
            getEmpleados();
            limpiarCampos();
            Swal.fire({
              title: "Eliminado!",
              text: `${empleado.nombre} fue eliminado`,
              showConfirmButton: false,
              timer: 3000,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se logró eliminar",
              footer:
                JSON.parce(JSON.stringify(error)).message === "Network Error"
                  ? "Intente más tarde"
                  : JSON.parce(JSON.stringify(error)).message,
            });
          });
      }
    });
  };

  const limpiarCampos = () => {
    setNombre("");
    setApellido("");
    setDireccion("");
    setEmail("");
    setEditar(false);
  };

  const editarEmpleado = (empleado) => {
    setEditar(true);
    setNombre(empleado.nombre);
    setApellido(empleado.apellido);
    setDireccion(empleado.direccion);
    setEmail(empleado.email);
    setId(empleado.id);
  };

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados")
      .then((response) => {
        console.log("Datos recibidos:", response.data);
        setEmpleados(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener empleados:", error);
      });
  };
  useEffect(() => {
    getEmpleados();
  }, []);

  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="nombre"
              >
                Nombre:
              </label>
              <input
                className="mt-1 p-2 sm:w-full rounded-md border border-gray-300"
                id="nombre"
                name="nombre"
                type="text"
                value={nombre}
                placeholder="Nombre"
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="apellido"
              >
                Apellido:
              </label>
              <input
                className="mt-1 p-2 sm:w-full rounded-md border border-gray-300"
                id="apellido"
                name="apellido"
                type="text"
                value={apellido}
                placeholder="Apellido"
                onChange={(e) => {
                  setApellido(e.target.value);
                }}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="direccion"
              >
                Dirección:
              </label>
              <input
                className="mt-1 p-2 sm:w-full rounded-md border border-gray-300"
                id="direccion"
                name="direccion"
                type="text"
                value={direccion}
                placeholder="Dirección"
                onChange={(e) => {
                  setDireccion(e.target.value);
                }}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                className="mt-1 p-2 sm:w-full rounded-md border border-gray-300"
                id="email"
                name="email"
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 sm:px-6 flex items-center justify-between">
          {editar ? (
            <div className="flex items-center">
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:border-yellow-700 focus:shadow-outline-yellow active:bg-yellow-800 mx-2"
                onClick={update}
              >
                Actualizar
              </button>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-800 mx-2"
                onClick={limpiarCampos}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-800"
              onClick={add}
            >
              Registrar
            </button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Lista de Empleados</h2>
        <div className="max-w-3xl overflow-x-auto">
          <table className="w-full whitespace-no-wrap border border-gray-300 table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Apellido</th>
                <th className="py-2 px-4 border-b">Dirección</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((empleado, index) => (
                <tr key={empleado.id} className="border-b">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{empleado.nombre}</td>
                  <td className="py-2 px-4">{empleado.apellido}</td>
                  <td className="py-2 px-4">{empleado.direccion}</td>
                  <td className="py-2 px-4">{empleado.email}</td>
                  <td className="py-2 px-4">
                    <button
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-500 hover:bg-teal-500 focus:outline-none focus:border-teal-500 focus:shadow-outline-green active:bg-teal-500"
                      onClick={() => {
                        editarEmpleado(empleado);
                      }}
                    >
                      Editar
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-600 focus:outline-none focus:border-red-600 focus:shadow-outline-green active:bg-red-600"
                      onClick={() => {
                        deleteEmpleado(empleado);
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;

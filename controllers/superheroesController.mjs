import {
  obtenerSuperheroePorId,
  obtenerTodosLosSuperheroes,
  buscarSuperheroesPorAtributo,
  obtenerSuperheroesMayoresDe30,
  crearNuevoSuperheroe,
  actualizarSuperheroe,
  eliminarSuperheroePorId,
  eliminarSuperheroePorNombre,
} from "../services/superheroesService.mjs";
import {
  renderizarSuperheroe,
  renderizarListaSuperheroes,
} from "../views/responseView.mjs";

export async function obtenerSuperheroePorIdController(req, res) {
  try {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);
    if (!superheroe) {
      return res.status(404).send({ mensaje: "Superheroe no encontrado" });
    }
    const superheroeFormateado = renderizarSuperheroe(superheroe);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener el superheroe",
      error: error.message,
    });
  }
}

// RENDER EJS

export async function obtenerTodosLosSuperheroesController(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperheroes(); // Obtiene los datos de MongoDB

    res.render("dashboard", { superheroes }); // Renderiza la vista y pasa los datos
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener los superhéroes",
      error: error.message,
    });
  }
}

// FUNCION ANTERIOR

// // export async function obtenerTodosLosSuperheroesController(req, res) {
// //   try {
// //     const superheroes = await obtenerTodosLosSuperheroes();

// //     const superheroeFormateados = renderizarListaSuperheroes(superheroes);
// //     res.status(200).json(superheroeFormateados);
// //   } catch (error) {
// //     res.status(500).send({
// //       mensaje: "Error al obtener los superheroes",
// //       error: error.message,
// //     });
// //   }
// // }

export async function buscarSuperheroesPorAtributoController(req, res) {
  try {
    const { atributo, valor } = req.params;
    const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
    if (superheroes.length === 0) {
      return res
        .status(404)
        .send({ mensaje: "No se encontraron superheroes con ese atributo" });
    }
    const superheroeFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).json(superheroeFormateados);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al buscar los superheroes",
      error: error.message,
    });
  }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
  try {
    const superheroes = await obtenerSuperheroesMayoresDe30();
    if (superheroes.length === 0) {
      return res
        .status(404)
        .send({ mensaje: "No se encontraron superheroes mayores de 30 años" });
    }
    const superheroeFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).json(superheroeFormateados);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener superheroes mayores de 30",
      error: error.message,
    });
  }
}

// ENDPOINT SPRINT 3 TRABAJO PRACTICO 1 //

// CREAR SUPERHEROE //

export async function crearNuevoSuperheroeController(req, res) {
  try {
    console.log("Datos recibidos:", req.body); // <--- Agregar esto para ver los datos
    const datos = req.body;
    const superheroeCreado = await crearNuevoSuperheroe(datos);

    if (!superheroeCreado) {
      return res.status(404).send({ mensaje: "Superheroe no encontrado" });
    }

    res.redirect("/api/desa/heroes/dashboard"); // Redirige al dashboard después de crear
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al crear el nuevo superhéroe",
      error: error.message,
    });
  }
}

// export async function crearNuevoSuperheroeController(req, res) {
//   try {
//     const datos = req.body;
//     const superheroeCreado = await crearNuevoSuperheroe(datos);
//     if (!superheroeCreado) {
//       return res.status(404).send({ mensaje: "Superheroe no econtrado" });
//     }
//     res.redirect('heroes/dashboard');
//     const superheroeFormateado = renderizarSuperheroe(superheroeCreado);

//     // res.status(200).json(superheroeFormateado);
//   } catch (error) {
//     res.status(500).send({
//       mensaje: "Error al crear el nuevo superheroe",
//       error: error.message,
//     });
//   }
// }
// // res.render("crear", { datos }); // Renderiza la vista y pasa los datos

// ACTUALIZAR SUPERHEROE POR ID //

export async function actualizarSuperheroeController(req, res) {
  try {
    const { id } = req.params;
    const datosActualizar = req.body;

    console.log(id);
    console.log(typeof id);
    const superheroeActualizado = await actualizarSuperheroe(
      id,
      datosActualizar
    );

    if (!superheroeActualizado) {
      return res
        .status(404)
        .send({ mensaje: "No se contro el superheroe a actualizar" });
    }

    const superheroeFormateado = renderizarSuperheroe(superheroeActualizado);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al actualizar el superhéroe",
      error: error.message,
    });
  }
}

// ELIMINAR SUPERHEROE POR ID //

export async function eliminarSuperheroePorIdController(req, res) {
  try {
    const { id } = req.params;
    const superheroeEliminado = await eliminarSuperheroePorId(id);
    if (!superheroeEliminado) {
      return res
        .status(404)
        .send({ mensaje: "Id de superheroe no encontrado" });
    }
    const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al eliminar el superheroe por ID",
      error: error.message,
    });
  }
}

// ELIMINAR POR NOMBRE //

export async function eliminarSuperheroePorNombreController(req, res) {
  try {
    const { nombre } = req.params;
    const superheroeEliminado = await eliminarSuperheroePorNombre(nombre);
    if (!superheroeEliminado) {
      return res
        .status(404)
        .send({ mensaje: "Nombre de superheroe no encontrado" });
    }
    const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al eliminar el superheroe por nombre",
      error: error.message,
    });
  }
}

export async function mostrarFormularioEdicion(req, res) {
  try {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);

    if (!superheroe) {
      return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
    }

    res.render("editSuperhero", { superheroe });
  } catch (error) {
    console.error("Error al obtener superhéroe:", error);
    res.status(500).json({ mensaje: "Error al obtener superhéroe", error });
  }
}

export const editarSuperheroeController = async (req, res) => {
  try {
    console.log("Solicitud recibida para editar:", req.params.id);
    console.log("Datos recibidos:", req.body);
    
    const { id } = req.params;
    const {
      nombreSuperHeroe,
      nombreReal,
      edad,
      planetaOrigen,
      debilidad,
      poderes,
      aliados,
      enemigos,
    } = req.body;

    const updatedData = {
      nombreSuperHeroe,
      nombreReal,
      edad,
      planetaOrigen,
      debilidad,
      poderes: poderes ? poderes.split(",").map(p => p.trim()) : [], // Convertir a array
      aliados: aliados ? aliados.split(",").map(a => a.trim()) : [], // Convertir a array
      enemigos: enemigos ? enemigos.split(",").map(e => e.trim()) : [], // Convertir a array
    };

    const updatedHero = await actualizarSuperheroe(id, updatedData);

    if (!updatedHero) {
      return res.status(404).send("Superhéroe no encontrado");
    }

    res.redirect("/api/desa/heroes/dashboard"); // Redirige al dashboard tras la edición
  } catch (error) {
    console.error("Error al editar el superhéroe:", error);
    res.status(500).send("Error interno del servidor");
  }
};
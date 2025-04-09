import { body } from "express-validator";

export const validationDataSuperHeros = () => [
  body("nombreSuperHeroe")
    .trim()
    .notEmpty()
    .withMessage("El nombre del superheroe es requerido y no puede estar vacio")
    .isLength({ min: 3, max: 60 })
    .withMessage("El nombre del superheroe debe tener entre 3 y 60 caracteres"),

  body("nombreReal")
    .trim()
    .notEmpty()
    .withMessage("El nombre real es requerido y no puede estar vacio")
    .isLength({ min: 3, max: 60 })
    .withMessage("El nombre real debe tener entre 3 y 60 caracteres"),

  /*body("edad")
    .trim()
    .notEmpty()
    .withMessage("La edad es requerida y no puede estar vacia")
    .isNumeric()
    .isInt({ min: 0 })
    .withMessage("La edad es incorrecta"),*/

  body("edad")
    .trim()
    .notEmpty()
    .withMessage("La edad es requerida y no puede estar vacia")
    .custom((value) => {
      const numValue = Number(value); // Convierte el valor a número
      if (isNaN(numValue)) {
        throw new Error("La edad debe ser un número válido");
      }
      if (!Number.isInteger(numValue)) {
        throw new Error("La edad debe ser un número entero");
      }
      if (numValue < 0) {
        throw new Error("La edad no puede ser negativa");
      }
      return true;
    }),

  body("poderes").custom((value) => {
    if (typeof value === "string") {
      value = value.split(",").map((p) => p.trim()); // Convertir string a array
    }

    if (!Array.isArray(value) || value.length === 0) {
      throw new Error("Poderes no es un array o está vacío");
    }

    if (
      value.some(
        (poder) =>
          typeof poder !== "string" ||
          poder.includes(" ") || 
          poder.length < 3 || 
          poder.length > 60
      )
    ) {
      throw new Error(
        "Cada poder no puede estar vacio y debe tener entre 3 y 60 caracteres"
      );
    }

    return true;
  }),

  body("aliados").custom((value) => {
    if (typeof value === "string") {
      value = value.split(",").map((a) => a.trim()); // Convierte string a array
    }

    if (!Array.isArray(value) || value.length === 0) {
      throw new Error("Aliados no es un array o está vacío");
    }

    if (
      value.some(
        (aliado) =>
          typeof aliado !== "string" ||
          aliado.includes(" ") ||
          aliado.length < 3 ||
          aliado.length > 60
      )
    ) {
      throw new Error(
        "Cada aliado no puede estar vacio y debe tener entre 3 y 60 caracteres"
      );
    }

    return true;
  }),

  body("enemigos").custom((value) => {
    if (typeof value === "string") {
      value = value.split(",").map((e) => e.trim());
    }

    if (!Array.isArray(value) || value.length === 0) {
      throw new Error("Enemigos no es un array o está vacío");
    }

    if (
      value.some(
        (enemigo) =>
          typeof enemigo !== "string" ||
          enemigo.includes(" ") ||
          enemigo.length < 3 ||
          enemigo.length > 60
      )
    ) {
      throw new Error(
        "Cada enemigo no puede estar vacio y debe tener entre 3 y 60 caracteres"
      );
    }

    return true;
  }),
];

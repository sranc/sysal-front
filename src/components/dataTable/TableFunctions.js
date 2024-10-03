export const searchFunction = (data, search, header) => {
  if (typeof search !== "string") {
    throw new Error("El término de búsqueda debe ser una cadena de texto");
  }
  if (!Array.isArray(data) || data.some((el) => typeof el !== "object")) {
    throw new Error("Los datos a buscar deben ser un arreglo de objetos");
  }

  search = search.split(" ");

  search.map((e) => {
    data = data.filter((el) => {
      let data1 = header.some((item) => {
        const fieldParts = item.data.split("."); // Divide el campo en partes si contiene puntos

        let fieldValue = el;

        for (const part of fieldParts) {
          if (Object.prototype.hasOwnProperty.call(fieldValue, part)) {
            fieldValue = fieldValue[part];
          } else {
            // Si no se encuentra un campo anidado, se omite este campo
            return false;
          }
        }
        if (typeof fieldValue === "string" || typeof fieldValue === "number") {
          // Normaliza el valor de campo si es una cadena de texto
          fieldValue = String(fieldValue)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
        }
        return String(fieldValue).includes(e.toLowerCase());
      });
      return data1;
    });
  });

  return data;
};

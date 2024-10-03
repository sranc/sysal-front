export const searchFunction = (data, search, header) => {
  if (typeof search !== "string") {
    throw new Error("El término de búsqueda debe ser una cadena de texto");
  }
  if (!Array.isArray(data) || data.some((el) => typeof el !== "object")) {
    throw new Error("Los datos a buscar deben ser un arreglo de objetos");
  }

  search = search.split(" ");

  search.map(
    (e) =>
      (data = data.filter((el) => {
        let data1 = Object.keys(el)
          .map((key) => {
            if (header.some((item) => item.data === key)) {
              return el[key]
                .toString()
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(e.toLowerCase());
            }
          })
          .filter((ele) => ele === true);
        if (data1[0]) {
          return el;
        }
      }))
  );
  return data;
};

import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import SearchData from "./SearchData";
import { Button } from "@nextui-org/react";

const DataTable = ({ data, header, handleCloseGestion }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [dataToShow, setDataToShow] = useState([]);

  const numberOfPages = Math.ceil(dataToShow.length / dataPerPage);

  const startIdx = (currentPage - 1) * dataPerPage;
  const endIdx = currentPage * dataPerPage;

  const newData = data.map((el) => {
    const newDataItem = {};
    newDataItem["id"] = el.id;
    newDataItem["state"] = el.state.value;
    header.forEach((prop) => {
      if (prop.data !== "action") {
        const keys = prop.data.split(".");
        newDataItem[prop.data] = keys.reduce((obj, key) => obj && obj[key], el);
      }
    });
    return newDataItem;
  });

  newData.sort((a, b) => (a.gestion < b.gestion ? 1 : -1));

  const currentPageData = dataToShow.slice(startIdx, endIdx);

  // const newData = data.map((el) => {
  //   const newDataItem = {};

  //   // Recorre todas las propiedades del objeto original
  //   for (const key in el) {
  //     if (typeof el[key] === "object" && !Array.isArray(el[key])) {
  //       // Si la propiedad es un objeto, desglosa sus propiedades
  //       for (const subKey in el[key]) {
  //         newDataItem[`${key}.${subKey}`] = el[key][subKey];
  //       }
  //     } else {
  //       newDataItem[key] = el[key];
  //     }
  //   }

  //   return newDataItem;
  // });

  const handleNexPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDataPerPage = (e) => {
    const value = e.target.value;
    if (value === "all") {
      setDataPerPage(data.length);
    } else {
      setDataPerPage(e.target.value);
    }
    setCurrentPage(1);
  };
  useEffect(() => {
    setDataToShow(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <SearchData
        handleDataPerPage={handleDataPerPage}
        data={newData}
        header={header}
        setDataToShow={setDataToShow}
      />
      <table className="table table-auto w-full overflow-y-auto">
        <thead className=" text-black dark:text-white p-3">
          <tr key="title">
            {header.map((e) => (
              <th key={e.name}>{e.name}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y p-4 divide-stroke dark:divide-strokedark text-center ">
          {currentPageData.map((el) => (
            <tr
              key={el.id}
              className=" hover:bg-meta-2 dark:hover:bg-meta-4 cursor-default "
            >
              {header.map((e) =>
                e.data !== "action" ? (
                  <td key={`${el.id}-${e.name}`} className="py-2">
                    {el[e.data]}
                  </td>
                ) : (
                  <td key={e.buttonName}>
                    {el.state ? (
                      <Button
                        size="sm"
                        color="danger"
                        onClick={() => handleCloseGestion(el)}
                        className=" text-sm"
                      >
                        {e.buttonName}
                      </Button>
                    ) : (
                      <h1></h1>
                    )}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {numberOfPages > 1 ? (
        <Pagination
          handleNexPage={handleNexPage}
          handlePreviousPage={handlePreviousPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          dataPerPage={dataPerPage}
        />
      ) : (
        <div className="flex flex-wrap gap-2 justify-center my-5 ">
          <h1>
            Pagina {currentPage} de {numberOfPages}
          </h1>
        </div>
      )}
    </div>
  );
};

export default DataTable;

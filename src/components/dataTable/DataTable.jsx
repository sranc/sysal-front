// const tableHeader = [
//   { name: "Financiamiento", data: "name" },
//   {
//     name: "Accion",
//     data: "action",
//     actions: [
//       "update",
//       "delete",
//       { function: "props.handleVer", icon: FaRegFileLines, color: "bg-sea2" },
//     ],
//   },
// ];

import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import SearchData from "./SearchData";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { Button } from "@nextui-org/react";

// eslint-disable-next-line no-unused-vars
const DataTable = ({ data, header, handleUpdate, handleDelete, ...props }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [dataToShow, setDataToShow] = useState([]);

  const numberOfPages = Math.ceil(dataToShow.length / dataPerPage);

  const startIdx = (currentPage - 1) * dataPerPage;
  const endIdx = currentPage * dataPerPage;

  const newData = [...data];

  const getNestedValue = (obj, path) => {
    const keys = path.split(".");
    return keys.reduce((acc, key) => acc && acc[key], obj);
  };

  newData.sort((a, b) => (a.id < b.id ? 1 : -1));

  const currentPageData = dataToShow.slice(startIdx, endIdx);

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
      <div className="overflow-auto">
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
                      {getNestedValue(el, e.data)}
                    </td>
                  ) : (
                    <td key={`accion-${el.id}`}>
                      {e.actions.map((action) =>
                        !action.function ? (
                          action === "update" ? (
                            <Button
                              isIconOnly
                              key={`update-${el.id}`}
                              color="primary"
                              title="Agregar"
                              size="sm"
                              onClick={() => handleUpdate(el)}
                              className="mx-0.5 dark:bg-transparent dark:hover:bg-black-2/20"
                            >
                              <FaPencil className=" text-bodydark1 text-lg dark:text-primary" />
                            </Button>
                          ) : (
                            <Button
                              isIconOnly
                              key={`delete-${el.id}`}
                              color="danger"
                              title="Eliminar"
                              size="sm"
                              onClick={() => handleDelete(el)}
                              className="mx-0.5 dark:bg-transparent dark:hover:bg-black-2/20"
                            >
                              <FaTrashCan className=" text-bodydark1 text-lg dark:text-danger" />
                            </Button>
                          )
                        ) : (
                          <Button
                            isIconOnly
                            key={`action-${el.id}`}
                            size="sm"
                            onClick={() => eval(action.function)}
                            className={`mx-0.5 bg-${action.color} dark:bg-transparent dark:hover:bg-black-2/20`}
                          >
                            <action.icon
                              className={`text-bodydark1 text-lg dark:text-${action.color}`}
                            />
                          </Button>
                        )
                      )}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

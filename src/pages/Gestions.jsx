import { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import GestionForm from "./../components/forms/GestionForm";
import DataTable from "../components/dataTableGestion/DataTable";
import Swal from "sweetalert2";
import axios from "../api/axios";
import { CircularProgress } from "@nextui-org/react";
import { FaTableList, FaWpforms } from "react-icons/fa6";

const tableHeader = [
  { name: "Gestión", data: "gestion" },
  { name: "Estado", data: "state.formatted" },
  { name: "Accion", data: "action", buttonName: "Cerrar Gestion" },
];

const initialForm = { form: { gestion: "" }, errors: {} };

const Gestions = () => {
  const [data, setData] = useState(null);
  const [hasTrueState, setHasTrueState] = useState(true);

  const handleCloseGestion = (element) => {
    const controller = new AbortController();
    Swal.fire({
      title: "Esta Seguro? ",
      text: `Usted va ha cerrar la gesion ${element.gestion} y no podra revertirlo!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3C50E0",
      cancelButtonColor: "#D34053",
      confirmButtonText: "Si, Cierralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/gestion/${element.id}`, {
            signal: controller.signal,
          })
          .then((response) => {
            if (response.status === 204) {
              Swal.fire(
                "Cerrada!",
                `La gestion ${element.gestion} fue cerrada.`,
                "success"
              );
              const newData = data.map((el) => {
                if (el.id === element.id) {
                  return {
                    ...el,
                    state: {
                      value: 0,
                      formatted: "Inactivo",
                    },
                  };
                }
                return el;
              });
              setData(newData);
              setHasTrueState(false);
            }
          });
      }
    });
  };

  const handleCreate = (element, reset) => {
    axios
      .post("/gestion", element)
      .then((response) => {
        setData([response.data.data, ...data]);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Gestion Agregada",
          showConfirmButton: false,
          timer: 3000,
        });
        reset();
      })
      .catch((err) => {
        if (err.response.data) {
          const error = err.response.data;
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Error!!!",
            text: error.message,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error!",
            text: "Ocurrio un error, intente nuevamente o llame al administrador",
          });
        }
        console.error(err);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const getGestions = async () => {
      try {
        const response = await axios.get("/gestion", {
          signal: controller.signal,
        });
        setData(response.data.data);
        setHasTrueState(
          response.data.data.some((item) => item.state.value === 1)
        );
      } catch (err) {
        console.log(err);
        if (err.response.data) {
          const error = err.response.data;
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Error!!!",
            text: error.message,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error!",
            text: "Ocurrio un error, intente nuevamente o llame al administrador",
          });
        }
        console.error(err);
      }
    };
    getGestions();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Gestiones" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="flex flex-col col-span-1 sm:col-span-2  gap-5">
          <div className="rounded-md bg-white border border-stroke shadow-default dark:shadow-strokedark  dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke bg-sea1 rounded-t-md dark:bg-transparent py-4 px-6.5 dark:border-strokedark">
              <div className="font-medium text-black dark:text-white">
                <div className="flex items-center">
                  <FaTableList className="mr-2" />
                  <p>Lista de Gestiones</p>
                </div>
              </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-1.5  dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 overflow-auto">
              {data ? (
                <DataTable
                  data={data}
                  header={tableHeader}
                  handleCloseGestion={handleCloseGestion}
                />
              ) : (
                <CircularProgress size="lg" aria-label="Cargando..." />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col col-span-1 gap-9">
          <div className="rounded-md bg-white border border-stroke shadow-default dark:shadow-strokedark dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke bg-sea1 rounded-t-md dark:bg-transparent py-4 px-6.5 dark:border-strokedark">
              <div className="font-medium text-black dark:text-white">
                <div className="flex items-center">
                  <FaWpforms className="mr-2" />
                  <p>Agregar Gesti&oacute;n</p>
                </div>
              </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-1.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 overflow-auto">
              <GestionForm
                initialForm={initialForm}
                hasTrueState={hasTrueState}
                handleCreate={handleCreate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gestions;

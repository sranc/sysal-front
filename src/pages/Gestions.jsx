import { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import GestionForm from "./../components/forms/GestionForm";
import DataTable from "../components/dataTableGestion/DataTable";
import Swal from "sweetalert2";
import { CircularProgress } from "@nextui-org/react";
import { FaTableList, FaWpforms } from "react-icons/fa6";
import useCrudQuery from "../hooks/useCrudQuery";

const tableHeader = [
  { name: "Gestión", data: "gestion" },
  { name: "Estado", data: "state.formatted" },
  { name: "Accion", data: "action", buttonName: "Cerrar Gestion" },
];

const initialForm = { form: { gestion: "" }, errors: {} };

const Gestions = () => {
  const [hasTrueState, setHasTrueState] = useState(false);

  const { data, isLoading, error, createData, closeData } = useCrudQuery(
    "gestions",
    "/gestion"
  );

  const handleCloseGestion = (element) => {
    Swal.fire({
      title: "Está seguro?",
      text: `Usted va a cerrar la gestión ${element.gestion} y no podrá revertirlo!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3C50E0",
      cancelButtonColor: "#D34053",
      confirmButtonText: "Sí, ciérralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        closeData.mutate(element.id, {
          onSuccess: () => {
            Swal.fire(
              "Cerrada!",
              `La gestión ${element.gestion} fue cerrada.`,
              "success"
            );
            setHasTrueState(false);
          },
          onError: (err) => {
            Swal.fire({
              position: "top",
              icon: "error",
              title: "Error!!!",
              text:
                err.message ||
                "Ocurrió un error, intente nuevamente o llame al administrador",
            });
            console.error(err);
          },
        });
      }
    });
  };

  const handleCreate = (element, reset) => {
    createData.mutate(element, {
      onSuccess: () => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Gestión Agregada",
          showConfirmButton: false,
          timer: 3000,
        });
        setHasTrueState(true);
        reset();
      },
      onError: (err) => {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Error!!!",
          text:
            err.message ||
            "Ocurrió un error, intente nuevamente o llame al administrador",
        });
        console.error(err);
      },
    });
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const someActiveState = data.some((item) => item.state.value === 1);
      console.log(someActiveState);
      setHasTrueState(someActiveState);
    }
  }, []);

  if (isLoading) {
    return <CircularProgress size="lg" aria-label="Cargando..." />;
  }

  if (error) {
    Swal.fire({
      position: "top",
      icon: "error",
      title: "Error!!!",
      text:
        error.message ||
        "Ocurrió un error, intente nuevamente o llame al administrador",
    });
    console.error(error);
  }

  return (
    <>
      <Breadcrumb pageName="Gestiones" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="flex flex-col col-span-1 sm:col-span-2 gap-5">
          <div className="rounded-md bg-white border border-stroke shadow-default dark:shadow-strokedark dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke bg-sea1 rounded-t-md dark:bg-transparent py-4 px-6.5 dark:border-strokedark">
              <div className="font-medium text-black dark:text-white">
                <div className="flex items-center">
                  <FaTableList className="mr-2" />
                  <p>Lista de Gestiones</p>
                </div>
              </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-1.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 overflow-auto">
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
                  <p>Agregar Gestión</p>
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

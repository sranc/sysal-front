import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import DataTable from "./../components/dataTable/DataTable";
import { CircularProgress } from "@nextui-org/react";
import FinancingForm from "../components/forms/FinancingForm";
import Swal from "sweetalert2";
import { FaTableList, FaWpforms } from "react-icons/fa6";
import useFinancing from "../hooks/useFinancing";

const tableHeader = [
  { name: "Financiamiento", data: "name" },
  {
    name: "Accion",
    data: "action",
    actions: ["update", "delete"],
  },
];

const Financing = () => {
  // Utiliza el hook useFinancing
  const {
    data,
    isLoading,
    error,
    createFinancing,
    updateFinancing,
    deleteFinancing,
  } = useFinancing();

  const [dataToUpdate, setDataToUpdate] = useState(null);

  const handleDataToUpdate = (el) => {
    setDataToUpdate(el);
  };

  const handleCreate = (form, resetForm) => {
    createFinancing.mutate(form, {
      onSuccess: () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Agregado!",
          showConfirmButton: false,
          timer: 2000,
        });
        resetForm();
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

  const handleUpdate = (form, resetForm) => {
    const updatedForm = {
      id: form.id,
      name: form.name,
    };
    console.log("Datos enviados para actualización:", updatedForm);
    updateFinancing.mutate(updatedForm, {
      onSuccess: () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Modificado!",
          showConfirmButton: false,
          timer: 2000,
        });
        resetForm();
        setDataToUpdate(null);
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

  const handleDelete = (el) => {
    Swal.fire({
      title: "Está Seguro?",
      text: `Usted va a eliminar el financiamiento ${el.name} y no podrá revertirlo!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3C50E0",
      cancelButtonColor: "#D34053",
      confirmButtonText: "Sí, Ciérralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFinancing.mutate(el.id, {
          onSuccess: () => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Eliminado!",
              showConfirmButton: false,
              timer: 2000,
            });
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

  const handleCancel = (resetForm) => {
    resetForm();
    setDataToUpdate(null);
  };

  if (isLoading) {
    return <CircularProgress size="md" aria-label="Cargando..." />;
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
      <Breadcrumb pageName="Financiamiento" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
        <div className="flex flex-col col-span-1 sm:col-span-2 gap-9">
          <div className="rounded-md bg-white border border-stroke shadow-default dark:shadow-strokedark dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke bg-sea1 rounded-t-md dark:bg-transparent py-4 px-6.5 dark:border-strokedark">
              <div className="font-medium text-black dark:text-white">
                <div className="flex items-center">
                  <FaTableList className="mr-2" />
                  <p>Lista de Financiamiento</p>
                </div>
              </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-1.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 overflow-auto">
              {data && (
                <DataTable
                  data={data}
                  header={tableHeader}
                  handleUpdate={handleDataToUpdate}
                  handleDelete={handleDelete}
                />
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
                  <p>{`${
                    dataToUpdate ? "Modificar" : "Agregar"
                  } Financiamiento`}</p>
                </div>
              </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-1.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 overflow-auto">
              <FinancingForm
                dataToUpdate={dataToUpdate}
                handleCreate={handleCreate}
                handleUpdate={handleUpdate}
                handleCancel={handleCancel}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Financing;

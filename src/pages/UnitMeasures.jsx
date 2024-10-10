import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import DataTable from "./../components/dataTable/DataTable";
import { CircularProgress } from "@nextui-org/react";
import Swal from "sweetalert2";
import UnitMeasureForm from "../components/forms/UnitMeasureForm";
import { FaTableList, FaWpforms } from "react-icons/fa6";
import useCrudQuery from "../hooks/useCrudQuery"; // Importa el hook

const tableHeader = [
  { name: "Unidad de Medida", data: "name" },
  {
    name: "Accion",
    data: "action",
    actions: ["update", "delete"],
  },
];

const UnitMeasures = () => {
  // Utiliza el hook useUnitMeasure
  const { data, isLoading, error, createData, updateData, deleteData } =
    useCrudQuery("unitMeasures", "/unitMeasure");

  const [dataToUpdate, setDataToUpdate] = useState(null);

  const handleDataToUpdate = (el) => {
    setDataToUpdate(el);
  };

  const handleCreate = (form, resetForm) => {
    createData.mutate(form, {
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
    updateData.mutate(updatedForm, {
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
      text: `Usted va a eliminar la unidad de medida ${el.name} y no podrá revertirlo!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3C50E0",
      cancelButtonColor: "#D34053",
      confirmButtonText: "Sí, Ciérralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData.mutate(el.id, {
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
      <Breadcrumb pageName="Unidad de medida" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
        <div className="flex flex-col col-span-1 sm:col-span-2 gap-9">
          <div className="rounded-md bg-white border border-stroke shadow-default dark:shadow-strokedark dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke bg-sea1 rounded-t-md dark:bg-transparent py-4 px-6.5 dark:border-strokedark">
              <div className="font-medium text-black dark:text-white">
                <div className="flex items-center">
                  <FaTableList className="mr-2" />
                  <p>Lista de Unidad de Medida</p>
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
                  } Unidad de medida`}</p>
                </div>
              </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-1.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 overflow-auto">
              <UnitMeasureForm
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

export default UnitMeasures;

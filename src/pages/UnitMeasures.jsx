import { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import axios from "./../api/axios";
import DataTable from "./../components/dataTable/DataTable";
import { CircularProgress } from "@nextui-org/react";
import Swal from "sweetalert2";
import UnitMeasureForm from "../components/forms/UnitMeasureForm";
import { FaTableList, FaWpforms } from "react-icons/fa6";

const tableHeader = [
  { name: "Unidad de Medida", data: "name" },
  {
    name: "Accion",
    data: "action",
    actions: ["update", "delete"],
  },
];

const UnitMeasures = () => {
  const [data, setData] = useState(null);
  const [dataToUpdate, setDataToUpdate] = useState(null);

  const handleDataToUpdate = (el) => {
    setDataToUpdate(el);
  };

  const handleCreate = (form, resetForm) => {
    axios
      .post("/unitMeasure", form)
      .then((response) => {
        const createdData = response.data.data;
        setData([...data, createdData]);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Agregado!",
          showConfirmButton: false,
          timer: 2000,
        });
        resetForm();
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

  const handleUpdate = (form, resetForm) => {
    axios
      .put(`/unitMeasure/${form.id}`, form)
      .then((response) => {
        const updatedData = response.data.data;
        const newData = data.map((el) =>
          el.id === updatedData.id ? updatedData : el
        );
        setData(newData);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Modificado!",
          showConfirmButton: false,
          timer: 2000,
        });
        resetForm();
        setDataToUpdate(null);
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

  const handleDelete = (el) => {
    const controller = new AbortController();
    Swal.fire({
      title: "Esta Seguro? ",
      text: `Usted va ha Eliminar el financiamiento ${el.name} y no podra revertirlo!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3C50E0",
      cancelButtonColor: "#D34053",
      confirmButtonText: "Si, Cierralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/unitMeasure/${el.id}`, {
            signal: controller.signal,
          })
          .then((response) => {
            if (response.status === 204) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Eliminado!",
                showConfirmButton: false,
                timer: 2000,
              });
              const newData = data.filter((e) => e.id !== el.id);
              setData(newData);
            }
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
      }
    });
  };

  const handleCancel = (resetForm) => {
    resetForm();
    setDataToUpdate(null);
  };

  useEffect(() => {
    const controller = new AbortController();

    const getFinancing = async () => {
      try {
        const response = await axios.get("/unitMeasure", {
          signal: controller.signal,
        });
        setData(response.data.data);
      } catch (err) {
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

    getFinancing();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Unidad de medida" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
        <div className="flex flex-col col-span-1 sm:col-span-2  gap-9">
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
              {data ? (
                <DataTable
                  data={data}
                  header={tableHeader}
                  handleUpdate={handleDataToUpdate}
                  handleDelete={handleDelete}
                />
              ) : (
                <CircularProgress size="md" aria-label="Cargando..." />
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

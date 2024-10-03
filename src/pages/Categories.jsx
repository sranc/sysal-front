import Swal from "sweetalert2";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import DataTable from "../components/dataTable/DataTable";
import { CircularProgress } from "@nextui-org/react";
import { FaTableList, FaWpforms } from "react-icons/fa6";
import CategoryForm from "../components/forms/CategoryForm";

const tableHeader = [
  { name: "Partida Presupuestaria", data: "budget_line_id.code" },
  { name: "Categoria", data: "name" },
  {
    name: "Acción",
    data: "action",
    actions: ["update", "delete"],
  },
];
const Categories = () => {
  const [data, setData] = useState(null);
  const [dataToUpdate, setDataToUpdate] = useState(null);

  const handleDataToUpdate = (el) => {
    const newData = data
      .filter((e) => e.id === el.id)
      .map((item) => {
        // eslint-disable-next-line no-unused-vars
        const { id, budget_line_id, name } = item;
        return { id: id, name: name, budget_line_id: budget_line_id.id };
      });
    setDataToUpdate(newData[0]);
  };

  const handleCreate = (form, resetForm) => {
    axios
      .post("/category", form)
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
      .put(`/category/${form.id}`, form)
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
          .delete(`/category/${el.id}`, {
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

    const getData = async () => {
      try {
        const response = await axios.get("/category", {
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

    getData();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Categoria" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
        <div className="flex flex-col col-span-1 sm:col-span-2  gap-9">
          <div className="rounded-md bg-white border border-stroke shadow-default dark:shadow-strokedark dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke bg-sea1 rounded-t-md dark:bg-transparent py-4 px-6.5 dark:border-strokedark">
              <div className="font-medium text-black dark:text-white">
                <div className="flex items-center">
                  <FaTableList className="mr-2" />
                  <p>Lista de categorias </p>
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
                  <p>{`${dataToUpdate ? "Modificar" : "Agregar"} categoria`}</p>
                </div>
              </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-1.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 overflow-auto">
              <CategoryForm
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

export default Categories;

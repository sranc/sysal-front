import { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import axios from "./../api/axios";
import DataTable from "./../components/dataTable/DataTable";
import { Button, CircularProgress } from "@nextui-org/react";
import Swal from "sweetalert2";
import { FaCirclePlus, FaTableList, FaWpforms } from "react-icons/fa6";
import ItemForm from "../components/forms/ItemForm";
import useLocalStorage from "../hooks/useLocalStorage";

const tableHeader = [
  { name: "Partida", data: "category_id.budget_line.code" },
  { name: "Categoria", data: "category_id.name" },
  { name: "Item", data: "description" },
  { name: "U. Medida", data: "unit_measure_id.name" },
  { name: "Cantidad", data: "number_of" },
  {
    name: "Acción",
    data: "action",
    actions: ["update", "delete"],
  },
];

const Items = () => {
  const [data, setData] = useState(null);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [budgetData, setBudgetData] = useLocalStorage("budgetData", {});
  const [categoryData, setCategoryData] = useLocalStorage("categoryData", {});
  const [unitMeasureData, setUnitMeasureData] = useLocalStorage(
    "unitMeasureData",
    {}
  );

  const handleDataToUpdate = (el) => {
    const newData = data
      .filter((e) => e.id === el.id)
      .map((item) => {
        // eslint-disable-next-line no-unused-vars
        const { id, category_id, unit_measure_id, description, number_of } =
          item;
        return {
          id: id,
          category_id: category_id.id,
          budget_line_id: category_id.budget_line.id,
          unit_measure_id: unit_measure_id.id,
          description: description,
          number_of: number_of,
        };
      });
    setDataToUpdate(newData[0]);
    setToggle(false);
  };

  const handleCreate = (form, resetForm) => {
    axios
      .post("/item", form)
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
        setToggle(true);
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
    // eslint-disable-next-line no-unused-vars
    const { id, budget_line_id, ...dataForm } = form;
    axios
      .put(`/item/${id}`, dataForm)
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
        setToggle(true);
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
          .delete(`/item/${el.id}`, {
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
    setToggle(true);
  };

  useEffect(() => {
    const controller = new AbortController();

    const getData = async () => {
      try {
        const response = await axios.get("/item", {
          signal: controller.signal,
        });
        setData(response.data.data);
        const budgetLine = await axios.get("/budgetLine");
        const category = await axios.get("/category");
        const unitMeasure = await axios.get("/unitMeasure");
        const selectDataBudget = budgetLine.data.data;
        const selectDataCategory = category.data.data;
        const selectDataUnit = unitMeasure.data.data;
        selectDataBudget.sort((a, b) => (a.name > b.name ? 1 : -1));
        selectDataCategory.sort((a, b) => (a.name > b.name ? 1 : -1));
        selectDataUnit.sort((a, b) => (a.name > b.name ? 1 : -1));
        setBudgetData(selectDataBudget);
        setCategoryData(selectDataCategory);
        setUnitMeasureData(selectDataUnit);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb pageName="Artículos" />
      <div className="grid grid-cols-1 gap-9 ">
        {toggle ? (
          <div className="flex flex-col col-span-1  gap-9">
            <div className="rounded-md bg-white border border-stroke shadow-default dark:shadow-strokedark dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke bg-sea1 rounded-t-md dark:bg-transparent py-4 px-6.5 dark:border-strokedark">
                <div className="font-medium text-black dark:text-white">
                  <div className="flex items-center">
                    <FaTableList className="mr-2" />
                    <p>Lista de Artículos</p>
                  </div>
                </div>
              </div>
              <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-1.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4">
                {data ? (
                  <>
                    <div className="mb-3 mx-1 w-30">
                      <Button
                        size="md"
                        onClick={() => setToggle(false)}
                        className="w-full bg-sea1"
                      >
                        <FaCirclePlus className="text-xl text-white" /> Agregar
                      </Button>
                    </div>
                    <DataTable
                      data={data}
                      header={tableHeader}
                      handleUpdate={handleDataToUpdate}
                      handleDelete={handleDelete}
                    />
                  </>
                ) : (
                  <CircularProgress size="md" aria-label="Cargando..." />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col col-span-1 gap-9">
            <div className="rounded-md bg-white border border-stroke shadow-default dark:shadow-strokedark dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke bg-sea1 rounded-t-md dark:bg-transparent py-4 px-6.5 dark:border-strokedark">
                <div className="font-medium text-black dark:text-white">
                  <div className="flex items-center">
                    <FaWpforms className="mr-2" />
                    <p>{`${
                      dataToUpdate ? "Modificar" : "Agregar"
                    } Artículo`}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-1.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 overflow-auto">
                <ItemForm
                  dataToUpdate={dataToUpdate}
                  handleCreate={handleCreate}
                  handleUpdate={handleUpdate}
                  handleCancel={handleCancel}
                  budgetData={budgetData}
                  categoryData={categoryData}
                  unitMeasureData={unitMeasureData}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Items;

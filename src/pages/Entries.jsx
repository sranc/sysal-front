import { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import axios from "./../api/axios";
import DataTable from "./../components/dataTable/DataTable";
import { Button, CircularProgress } from "@nextui-org/react";
import Swal from "sweetalert2";
import { FaCirclePlus, FaTableList, FaWpforms } from "react-icons/fa6";
import useLocalStorage from "../hooks/useLocalStorage";
import EntryForm from "../components/forms/entryForm";
import EntryDetail from "./EntryDetail";

const tableHeader = [
  { name: "Financiamiento", data: "financing_id.financing" },
  { name: "Proveedor", data: "supplier_id.supplier" },
  { name: "Tipo de Entrada", data: "type_income_id.type_income" },
  { name: "Detalle", data: "detail" },
  { name: "Total", data: "total" },
  {
    name: "Acción",
    data: "action",
    actions: ["update", "delete"],
  },
];

const Entries = () => {
  const [data, setData] = useLocalStorage("entryData", null);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [selectData, setSelectData] = useLocalStorage("selectData", {
    financingData: {},
    supplierData: {},
    typeIncomeData: {},
  });
  const [itemData, setItemData] = useLocalStorage("itemData", null);
  const [boughtItem, setBoughtItem] = useState([]);

  const handleDataToUpdate = (el) => {
    const newData = data
      .filter((e) => e.id === el.id)
      .map((item) => {
        // eslint-disable-next-line no-unused-vars
        const {
          id,
          financing_id,
          supplier_id,
          type_income_id,
          detail,
          total,
          iva,
          receipt_invoice_number,
          date_receipt_invoice,
          iva_amount,
          remarks,
          entry_details,
        } = item;
        return {
          id: id,
          financing_id: financing_id.id,
          supplier_id: supplier_id.id,
          type_income_id: type_income_id.id,
          detail: detail,
          total: total,
          iva: iva,
          receipt_invoice_number: receipt_invoice_number,
          date_receipt_invoice: date_receipt_invoice,
          iva_amount: iva_amount,
          remarks: remarks,
          entry_details: entry_details,
        };
      });

    setDataToUpdate(newData[0]);
    setBoughtItem(newData[0].entry_details);
    setToggle(false);
  };

  const handleCreate = (form, resetForm) => {
    axios
      .post("/entry", form)
      .then((response) => {
        const createdData = response.data.data;
        setData([...data, createdData]);
        handleMsg("create", "Agregado");
        resetForm();
        setToggle(true);
      })
      .catch((err) => {
        handleMsg("error", err);
      });
  };

  const handleUpdate = (form, resetForm) => {
    // eslint-disable-next-line no-unused-vars
    const { id, budget_line_id, ...dataForm } = form;
    axios
      .put(`/entry/${id}`, dataForm)
      .then((response) => {
        const updatedData = response.data.data;
        const newData = data.map((el) =>
          el.id === updatedData.id ? updatedData : el
        );
        setData(newData);
        handleMsg("update", "Modificado");
        resetForm();
        setDataToUpdate(null);
        setToggle(true);
      })
      .catch((err) => {
        handleMsg("error", err);
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
          .delete(`/entry/${el.id}`, {
            signal: controller.signal,
          })
          .then((response) => {
            if (response.status === 204) {
              handleMsg("delete", "Eliminado");
              const newData = data.filter((e) => e.id !== el.id);
              setData(newData);
            }
          })
          .catch((err) => {
            handleMsg("error", err);
          });
      }
    });
  };

  const handleCancel = (resetForm) => {
    resetForm();
    setDataToUpdate(null);
    setToggle(true);
    setBoughtItem([]);
  };

  const handleMsg = (kind, msg) => {
    if (kind === "error") {
      if (msg.response?.data) {
        const error = msg.response.data;
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
          text: "Ocurrió un error, inténtelo nuevamente o llame al administrador",
        });
      }
      console.error(msg);
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: msg,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const [
          entryResponse,
          financingResponse,
          supplierResponse,
          typeIncomeResponse,
          itemResponse,
        ] = await Promise.all([
          axios.get("/entry", { signal: controller.signal }),
          axios.get("/financing"),
          axios.get("/supplier"),
          axios.get("/typeIncome"),
          axios.get("/item"),
        ]);

        setData(entryResponse.data.data);
        setItemData(itemResponse.data.data);

        const selectDataFinancing = financingResponse.data.data;
        const selectDataSupplier = supplierResponse.data.data;
        const selectDataTypeIncome = typeIncomeResponse.data.data;

        selectDataFinancing.sort((a, b) => (a.name > b.name ? 1 : -1));
        selectDataSupplier.sort((a, b) => (a.name > b.name ? 1 : -1));
        selectDataTypeIncome.sort((a, b) => (a.name > b.name ? 1 : -1));

        setSelectData({
          financingData: selectDataFinancing,
          supplierData: selectDataSupplier,
          typeIncomeData: selectDataTypeIncome,
        });
      } catch (err) {
        handleMsg("error", err);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb pageName="Ingreso a almacen" />
      <div className="grid grid-cols-1 gap-9 ">
        {toggle ? (
          <div className="flex flex-col col-span-1  gap-9">
            <div className="rounded-md bg-white border border-stroke shadow-default dark:shadow-strokedark dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke bg-sea1 rounded-t-md dark:bg-transparent py-4 px-6.5 dark:border-strokedark">
                <div className="font-medium text-black dark:text-white">
                  <div className="flex items-center">
                    <FaTableList className="mr-2" />
                    <p>Lista de Ingreso a almacen</p>
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
          <div className="grid lg:grid-cols-5 xl:grid-cols-7 gap-2">
            <div className="flex flex-col lg:col-span-3 xl:col-span-5">
              <div className="rounded-md bg-white border border-stroke shadow-default dark:shadow-strokedark dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke bg-sea1 rounded-t-md dark:bg-transparent py-4 px-6.5 dark:border-strokedark">
                  <div className="font-medium text-black dark:text-white">
                    <div className="flex items-center">
                      <FaWpforms className="mr-2" />
                      <p>{`${
                        dataToUpdate ? "Modificar" : "Agregar"
                      } Ingreso`}</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-1.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 overflow-auto">
                  <EntryForm
                    dataToUpdate={dataToUpdate}
                    handleCreate={handleCreate}
                    handleUpdate={handleUpdate}
                    handleCancel={handleCancel}
                    selectData={selectData}
                    boughtItem={boughtItem}
                    setBoughtItem={setBoughtItem}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:col-span-2 gap-3">
              <div className="rounded-md bg-white border border-stroke shadow-default dark:shadow-strokedark dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke bg-sea1 rounded-t-md dark:bg-transparent py-4 px-6.5 dark:border-strokedark">
                  <div className="font-medium text-black dark:text-white">
                    <div className="flex items-center">
                      <FaTableList className="mr-2" />
                      <p>Articulos</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-1.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 overflow-auto">
                  <EntryDetail
                    itemData={itemData}
                    boughtItem={boughtItem}
                    setBoughtItem={setBoughtItem}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Entries;

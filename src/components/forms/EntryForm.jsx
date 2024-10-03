import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";
import {
  FaBarcode,
  FaCalendarDay,
  FaDollarSign,
  FaLayerGroup,
  FaMoneyCheckDollar,
} from "react-icons/fa6";

import OwnSwitch from "../switch/OwnSwitch";
import OwnSelect from "../select/OwnSelect";
import OwnButton from "../button/OwnButton";
import InputGroup from "../input/InputGroup";
import InputArea from "../input/InputArea";
import TableItems from "../tableItems/TableItems";

const initialForm = {
  form: {
    gestion_id: 19,
    financing_id: "",
    supplier_id: "",
    type_income_id: "",
    detail: "",
    total: 0,
    iva: 0,
    receipt_invoice_number: "",
    date_receipt_invoice: "",
    iva_amount: 0,
    remarks: "",
  },
  errors: {},
};
const validator = {
  financing_id: { required: true },
  supplier_id: { required: true },
  type_income_id: { required: true },
  detail: { required: true },
};
const EntryForm = ({
  dataToUpdate,
  handleCreate,
  handleUpdate,
  handleCancel,
  selectData,
  boughtItem,
  setBoughtItem,
}) => {
  const [isInvalid, setIsInvalid] = useState({
    financing_id: false,
    supplier_id: false,
    type_income_id: false,
    detail: false,
  });
  const { financingData, supplierData, typeIncomeData } = selectData;
  const register = () => {
    if (!dataToUpdate) {
      handleCreate(form, resetForm);
    } else {
      handleUpdate(form, resetForm);
    }
  };

  const [state, handleChange, handleSubmit, resetForm, handleDataToUpdate] =
    useForm(initialForm, validator, register);

  const { form, errors } = state;
  const handleSwitch = (e) => {
    const el = { target: { name: e.target.name, value: e.target.checked } };
    handleChange(el);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      setIsInvalid({
        financing_id: false,
        supplier_id: false,
        type_income_id: false,
        detail: false,
      });
    } else {
      setIsInvalid({
        financing_id: "financing_id" in errors,
        supplier_id: "supplier_id" in errors,
        type_income_id: "type_income_id" in errors,
        detail: "detail" in errors,
      });
    }
  }, [errors]);

  const addColumn = () => {
    const updatedItems = boughtItem.map((item) => ({
      ...item,
      newColumn: false, // Agrega la nueva columna con valor false
    }));
    setBoughtItem(updatedItems);
  };

  useEffect(() => {
    handleDataToUpdate(dataToUpdate);
    addColumn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataToUpdate]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="lg:p-1">
        <div className="flex flex-col md:flex-row flex-wrap gap-1 md:gap-2 mb-12 justify-center">
          <div className="flex flex-col md:flex-row gap-3 w-full">
            {Object.keys(financingData).length > 0 && (
              <OwnSelect
                label="Financiamiento"
                name="financing_id"
                value={form.financing_id}
                onChange={handleChange}
                option={financingData}
                isInvalid={isInvalid.financing_id}
                color={isInvalid.financing_id ? "danger" : "success"}
                errorMessage={isInvalid.financing_id && errors.financing_id}
                className="md:w-1/3"
              />
            )}
            {Object.keys(supplierData).length > 0 && (
              <OwnSelect
                label="Proveedor"
                name="supplier_id"
                value={form.supplier_id}
                onChange={handleChange}
                option={supplierData}
                isInvalid={isInvalid.supplier_id}
                color={isInvalid.supplier_id ? "danger" : "success"}
                errorMessage={isInvalid.supplier_id && errors.supplier_id}
                className="md:w-1/3"
              />
            )}
            {Object.keys(typeIncomeData).length > 0 && (
              <OwnSelect
                label="Tipo de entrada"
                name="type_income_id"
                value={form.type_income_id}
                onChange={handleChange}
                option={typeIncomeData}
                isInvalid={isInvalid.type_income_id}
                color={isInvalid.type_income_id ? "danger" : "success"}
                errorMessage={isInvalid.type_income_id && errors.type_income_id}
                className="md:w-1/3"
              />
            )}
          </div>
          <div className="flex flex-col items-center md:flex-row gap-3 w-full">
            <OwnSwitch
              name="iva"
              label="Iva"
              checked={form.iva}
              onChange={handleSwitch}
            />
            <InputGroup
              type="text"
              label={form.iva ? "Nro_Factura" : "Nro_Recibo"}
              className="md:w-1/3"
              value={form.receipt_invoice_number}
              onChange={handleChange}
              name="receipt_invoice_number"
              startContent={<FaMoneyCheckDollar />}
            />
            <InputGroup
              type="date"
              label="Fecha_Documetno"
              className="md:w-1/3"
              value={form.date_receipt_invoice}
              onChange={handleChange}
              name="date_receipt_invoice"
              startContent={<FaCalendarDay />}
            />
            <InputGroup
              type="text"
              label="Monto_IVA"
              name="iva_amount"
              value={form.iva_amount}
              onChange={handleChange}
              startContent={<FaDollarSign />}
              className=" md:w-1/3"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <InputGroup
              value={form.detail}
              onChange={handleChange}
              name="detail"
              type="text"
              label="Detalle"
              color={isInvalid.detail ? "danger" : "success"}
              errorMessage={isInvalid.detail && errors.detail}
              isInvalid={isInvalid.detail}
              className="md:w-2/3"
              startContent={
                <FaBarcode className={`${isInvalid.detail && "text-danger"}`} />
              }
            />
            <InputGroup
              value={form.total}
              onChange={handleChange}
              name="total"
              type="number"
              label="Total"
              color={isInvalid.total ? "danger" : "success"}
              errorMessage={isInvalid.total && errors.total}
              isInvalid={isInvalid.total}
              className="md:w-1/3"
              startContent={<FaLayerGroup />}
              readOnly
            />
          </div>
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <InputArea
              value={form.remarks}
              onChange={handleChange}
              name="remarks"
              label="Observaciones"
              variant="faded"
              size="xs"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full pb-2 xl:pb-8">
          <TableItems boughtItem={boughtItem} setBoughtItem={setBoughtItem} />
        </div>
        <div className="flex flex-col md:flex-row gap-2 align-middle justify-center ">
          <OwnButton
            type="submit"
            color="primary"
            className="w-full text-white text-sm py-2"
          >
            {dataToUpdate ? "Modificar" : "Agregar"}
          </OwnButton>

          <OwnButton
            className="w-full text-white text-sm py-2 px-1"
            type="button"
            color="danger"
            onClick={() => handleCancel(resetForm)}
          >
            Cancelar
          </OwnButton>
        </div>
      </div>
    </form>
  );
};

export default EntryForm;

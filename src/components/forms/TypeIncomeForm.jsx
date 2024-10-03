import { Button, Input } from "@nextui-org/react";
import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";

const initialForm = { form: { name: "" }, errors: {} };
const validator = {
  name: { required: true },
};
const TypeIncomeForm = ({
  dataToUpdate,
  handleCreate,
  handleUpdate,
  handleCancel,
}) => {
  const [isInvalid, setIsInvalid] = useState(false);

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

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  }, [errors]);

  useEffect(() => {
    handleDataToUpdate(dataToUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataToUpdate]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="lg:p-6">
        <div className="mb-4.5">
          <Input
            value={form.name}
            onChange={handleChange}
            name="name"
            type="text"
            label="Tipo de entrada"
            color={isInvalid ? "danger" : "success"}
            variant="faded"
            errorMessage={isInvalid && errors.name}
            isInvalid={isInvalid}
            className="max-w-xs"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 align-middle justify-center ">
          <Button type="submit" color="primary" className="w-full">
            {dataToUpdate ? "Modificar" : "Agregar"}
          </Button>
          {dataToUpdate && (
            <Button
              color="danger"
              className="w-full"
              onClick={() => handleCancel(resetForm)}
            >
              Cancelar
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TypeIncomeForm;

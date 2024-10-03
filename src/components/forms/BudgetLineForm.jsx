import { Button, Input } from "@nextui-org/react";
import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";

const initialForm = { form: { code: "", name: "" }, errors: {} };
const validator = {
  code: { required: true },
  name: { required: true },
};
const BudgetLineForm = ({
  dataToUpdate,
  handleCreate,
  handleUpdate,
  handleCancel,
}) => {
  const [isInvalid, setIsInvalid] = useState({ code: false, name: false });

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
      setIsInvalid({ code: false, name: false });
    } else {
      setIsInvalid({ code: "code" in errors, name: "name" in errors });
    }
  }, [errors]);

  useEffect(() => {
    handleDataToUpdate(dataToUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataToUpdate]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="lg:p-6">
        <div className="flex flex-col gap-2 mb-4.5">
          <Input
            value={form.code}
            onChange={handleChange}
            name="code"
            type="text"
            label="Codigo"
            color={isInvalid.code ? "danger" : "success"}
            variant="faded"
            errorMessage={isInvalid.code && errors.code}
            isInvalid={isInvalid.code}
            className="max-w-xs"
          />
          <Input
            value={form.name}
            onChange={handleChange}
            name="name"
            type="text"
            label="Partida Presupuestaria"
            color={isInvalid.name ? "danger" : "success"}
            variant="faded"
            errorMessage={isInvalid.name && errors.name}
            isInvalid={isInvalid.name}
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

export default BudgetLineForm;

// revisa este codigo y dime como arreglar
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

const initialForm = {
  form: { id: "", name: "", budget_line_id: 1 },
  errors: {},
};
const validator = {
  budget_line_id: { required: true },
  name: { required: true },
};
const CategoryForm = ({
  dataToUpdate,
  handleCreate,
  handleUpdate,
  handleCancel,
}) => {
  const [isInvalid, setIsInvalid] = useState({
    budget_line_id: false,
    name: false,
  });

  const [budgetData, setBudgetData] = useState({});

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
      setIsInvalid({ budget_line_id: false, name: false });
    } else {
      setIsInvalid({
        budget_line_id: "budget_line_id" in errors,
        name: "name" in errors,
      });
    }
  }, [errors]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/budgetLine");
        const selectData = response.data.data;
        selectData.sort((a, b) => (a.name > b.name ? 1 : -1));
        setBudgetData(selectData);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    handleDataToUpdate(dataToUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataToUpdate]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="lg:p-6">
        <div className="flex flex-col gap-2 mb-4.5">
          {Object.keys(budgetData).length > 0 && (
            <Select
              label="Partida presupuestaria"
              onChange={handleChange}
              name="budget_line_id"
              selectedKeys={`${[form.budget_line_id]}`}
              className="max-w-xs"
            >
              {budgetData.map((el) => (
                <SelectItem key={el.id} value={el.id}>
                  {el.name}
                </SelectItem>
              ))}
            </Select>
          )}
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

export default CategoryForm;

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";
import { FaBarcode, FaLayerGroup } from "react-icons/fa6";

const initialForm = {
  form: {
    category_id: "",
    budget_line_id: "",
    unit_measure_id: "",
    description: "",
    number_of: "",
  },
  errors: {},
};
const validator = {
  category_id: { required: true },
  unit_measure_id: { required: true },
  description: { required: true },
  number_of: { required: true, numeric: true },
};
const ItemForm = ({
  dataToUpdate,
  handleCreate,
  handleUpdate,
  handleCancel,
  budgetData,
  categoryData,
  unitMeasureData,
}) => {
  const [isInvalid, setIsInvalid] = useState({
    category_id: false,
    unit_measure_id: false,
    description: false,
    number_of: false,
  });

  const [categoryDataToShow, setCategoryDataToShow] = useState(categoryData);

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

  const handleChangeBudget = (el) => {
    handleChange(el);
    if (el.target.value != 0) {
      const categoryFilter = categoryData.filter((element) => {
        console.log(element.budget_line_id.id, el.target.value);
        return element.budget_line_id.id == el.target.value;
      });
      setCategoryDataToShow(categoryFilter);
    } else {
      setCategoryDataToShow(categoryData);
    }
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      setIsInvalid({
        category_id: false,
        unit_measure_id: false,
        description: false,
        number_of: false,
      });
    } else {
      setIsInvalid({
        category_id: "category_id" in errors,
        unit_measure_id: "unit_measure_id" in errors,
        description: "description" in errors,
        number_of: "number_of" in errors,
      });
    }
  }, [errors]);

  useEffect(() => {
    handleDataToUpdate(dataToUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataToUpdate]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="lg:p-6">
        <div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-8 mb-12 justify-center">
          <div className="flex flex-col md:flex-row gap-3 w-full">
            {Object.keys(budgetData).length > 0 && (
              <Select
                label="Partida presupuestaria"
                onChange={handleChangeBudget}
                name="budget_line_id"
                variant="faded"
                color={isInvalid.budget_line_id ? "danger" : "success"}
                errorMessage={isInvalid.budget_line_id && errors.budget_line_id}
                selectedKeys={[
                  form.budget_line_id ? String(form.budget_line_id) : "",
                ]}
                className="md:w-1/3"
              >
                <SelectItem key="" value="">
                  Todos
                </SelectItem>
                {budgetData.map((el) => (
                  <SelectItem key={el.id} value={el.id}>
                    {el.name}
                  </SelectItem>
                ))}
              </Select>
            )}
            {Object.keys(categoryDataToShow).length > 0 && (
              <Select
                label="Categoria"
                onChange={handleChange}
                name="category_id"
                variant="faded"
                color={isInvalid.category_id ? "danger" : "success"}
                errorMessage={isInvalid.category_id && errors.category_id}
                selectedKeys={[String(form.category_id)]}
                className="md:w-1/3"
              >
                <SelectItem key="" value="">
                  ...Seleccione una Categoria
                </SelectItem>
                {categoryDataToShow.map((el) => (
                  <SelectItem key={el.id} value={el.id}>
                    {el.name}
                  </SelectItem>
                ))}
              </Select>
            )}
            {Object.keys(unitMeasureData).length > 0 && (
              <Select
                label="Unidad de medida"
                onChange={handleChange}
                name="unit_measure_id"
                variant="faded"
                color={isInvalid.unit_measure_id ? "danger" : "success"}
                errorMessage={
                  isInvalid.unit_measure_id && errors.unit_measure_id
                }
                selectedKeys={[String(form.unit_measure_id)]}
                className="md:w-1/3"
              >
                <SelectItem key="" value="">
                  ...Seleccione una Unidad de medida
                </SelectItem>
                {unitMeasureData.map((el) => (
                  <SelectItem key={el.id} value={el.id}>
                    {el.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <Input
              value={form.description}
              onChange={handleChange}
              name="description"
              type="text"
              label="Articulo"
              color={isInvalid.description ? "danger" : "success"}
              variant="faded"
              errorMessage={isInvalid.description && errors.description}
              isInvalid={isInvalid.description}
              className="md:w-2/3"
              startContent={
                <FaBarcode
                  className={`${isInvalid.description && "text-danger"}`}
                />
              }
            />
            <Input
              value={form.number_of}
              onChange={handleChange}
              name="number_of"
              type="number"
              label="Cantidad"
              color={isInvalid.number_of ? "danger" : "success"}
              variant="faded"
              errorMessage={isInvalid.number_of && errors.number_of}
              isInvalid={isInvalid.number_of}
              className="md:w-1/3"
              startContent={
                <FaLayerGroup
                  className={`${isInvalid.number_of && "text-danger"}`}
                />
              }
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 align-middle justify-center ">
          <Button type="submit" color="primary" className="w-full">
            {dataToUpdate ? "Modificar" : "Agregar"}
          </Button>
          <Button
            color="danger"
            className="w-full"
            onClick={() => handleCancel(resetForm)}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ItemForm;

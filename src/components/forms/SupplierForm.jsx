import { Button, Input } from "@nextui-org/react";
import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";
import {
  FaAddressCard,
  FaEnvelope,
  FaFax,
  FaPhoneFlip,
  FaSuitcase,
  FaUserTie,
} from "react-icons/fa6";

const initialForm = {
  form: {
    name: "",
    contact: "",
    address: "",
    city: "",
    phone: "",
    fax: "",
    email: "",
    nit: "",
  },
  errors: {},
};
const validator = {
  name: { required: true },
  contact: { required: true, string: true },
  address: { required: true },
  city: { required: true, string: true },
  phone: { required: true, phone: true },
  fax: { phone: true },
  email: { email: true },
  nit: { required: true, numeric: true },
};
const SupplierForm = ({
  dataToUpdate,
  handleCreate,
  handleUpdate,
  handleCancel,
}) => {
  const [isInvalid, setIsInvalid] = useState({
    name: false,
    contact: false,
    address: false,
    city: false,
    phone: false,
    fax: false,
    email: false,
    nit: false,
  });

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
      setIsInvalid({
        name: false,
        contact: false,
        address: false,
        city: false,
        phone: false,
        fax: false,
        email: false,
        nit: false,
      });
    } else {
      setIsInvalid({
        name: "name" in errors,
        contact: "contact" in errors,
        address: "address" in errors,
        city: "city" in errors,
        phone: "phone" in errors,
        fax: "fax" in errors,
        email: "email" in errors,
        nit: "nit" in errors,
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
            <Input
              value={form.name}
              onChange={handleChange}
              name="name"
              type="text"
              label="Proveedor"
              color={isInvalid.name ? "danger" : "success"}
              variant="faded"
              errorMessage={isInvalid.name && errors.name}
              isInvalid={isInvalid.name}
              className=" md:w-1/3"
              startContent={
                <FaSuitcase className={`${isInvalid.name && "text-danger"}`} />
              }
            />
            <Input
              value={form.contact}
              onChange={handleChange}
              name="contact"
              type="text"
              label="Contacto"
              color={isInvalid.contact ? "danger" : "success"}
              variant="faded"
              errorMessage={isInvalid.contact && errors.contact}
              isInvalid={isInvalid.contact}
              className="md:w-1/3"
              startContent={
                <FaUserTie
                  className={`${isInvalid.contact && "text-danger"}`}
                />
              }
            />
            <Input
              value={form.email}
              onChange={handleChange}
              name="email"
              type="email"
              label="Correo"
              color={isInvalid.email ? "danger" : "success"}
              variant="faded"
              errorMessage={isInvalid.email && errors.email}
              isInvalid={isInvalid.email}
              className="md:w-1/3"
              startContent={
                <FaEnvelope className={`${isInvalid.email && "text-danger"}`} />
              }
            />
          </div>
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <Input
              value={form.phone}
              onChange={handleChange}
              name="phone"
              type="number"
              label="Teléfono"
              color={isInvalid.phone ? "danger" : "success"}
              variant="faded"
              errorMessage={isInvalid.phone && errors.phone}
              isInvalid={isInvalid.phone}
              className="md:w-1/3"
              startContent={
                <FaPhoneFlip
                  className={`${isInvalid.phone && "text-danger"}`}
                />
              }
            />
            <Input
              value={form.fax ? form.fax : ""}
              onChange={handleChange}
              name="fax"
              type="number"
              label="Fax"
              color={isInvalid.fax ? "danger" : "success"}
              variant="faded"
              errorMessage={isInvalid.fax && errors.fax}
              isInvalid={isInvalid.fax}
              className="md:w-1/3"
              startContent={
                <FaFax className={`${isInvalid.fax && "text-danger"}`} />
              }
            />
            <Input
              value={form.nit}
              onChange={handleChange}
              name="nit"
              type="number"
              label="Nit"
              color={isInvalid.nit ? "danger" : "success"}
              variant="faded"
              errorMessage={isInvalid.nit && errors.nit}
              isInvalid={isInvalid.nit}
              className="md:w-1/3"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <Input
              value={form.address}
              onChange={handleChange}
              name="address"
              type="text"
              label="Dirección"
              color={isInvalid.address ? "danger" : "success"}
              variant="faded"
              errorMessage={isInvalid.address && errors.address}
              isInvalid={isInvalid.address}
              className="md:w-2/3"
              startContent={
                <FaAddressCard
                  className={`${isInvalid.address && "text-danger"}`}
                />
              }
            />
            <Input
              value={form.city ? form.city : ""}
              onChange={handleChange}
              name="city"
              type="text"
              label="Ciudad"
              color={isInvalid.city ? "danger" : "success"}
              variant="faded"
              errorMessage={isInvalid.city && errors.city}
              isInvalid={isInvalid.city}
              className="md:w-1/3"
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

export default SupplierForm;

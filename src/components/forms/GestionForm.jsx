import { useEffect, useRef, useState } from "react";
import useForm from "../../hooks/useForm";
import Swal from "sweetalert2";
import { Button, Input } from "@nextui-org/react";

const validator = {
  gestion: { required: true, numeric: true, maxLength: 4, minLength: 4 },
};
const GestionForm = ({ initialForm, hasTrueState, handleCreate }) => {
  const [isInvalid, setIsInvalid] = useState(false);

  const gestionRef = useRef(null);

  const handleGestion = () => {
    const inputValue = gestionRef.current.value;
    if (inputValue.length > 4) {
      gestionRef.current.value = inputValue.slice(0, 4);
    }
  };

  const register = () => {
    if (hasTrueState) {
      Swal.fire({
        icon: "error",
        title: "Accion Requerida",
        text: "Debe cerrar la gestion abierta para poder abrir una nueva",
      });
    } else {
      Swal.fire({
        title: `Agregar la gestion ${state.form.gestion}`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Agregar",
      }).then((result) => {
        if (result.isConfirmed) {
          handleCreate(state.form, resetForm);
        }
      });
    }
  };

  const [state, handleChange, handleSubmit, resetForm] = useForm(
    initialForm,
    validator,
    register
  );

  const { form, errors } = state;

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  }, [errors]);
  return (
    <form onSubmit={handleSubmit}>
      <div className=" lg:p-6">
        <div className="mb-4.5">
          <div className="w-full">
            <Input
              value={form.gestion}
              onChange={handleChange}
              onInput={handleGestion}
              ref={gestionRef}
              name="gestion"
              id="gestion"
              type="number"
              label="Gesti&oacute;n"
              color={isInvalid ? "danger" : "success"}
              variant="faded"
              errorMessage={isInvalid && errors.gestion}
              isInvalid={isInvalid}
              className="max-w-xs text-lg"
            />
          </div>
        </div>
        {/* <button
          className="flex w-full bg-primary justify-center rounded p-3 font-medium text-gray"
          type="submit"
        >
          Agregar
        </button> */}
        <Button type="submit" color="primary" className=" w-full">
          Agregar
        </Button>
      </div>
    </form>
  );
};

export default GestionForm;

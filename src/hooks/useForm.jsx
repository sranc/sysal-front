import { validate } from "./../utils/Validator";
import { useMemo, useReducer } from "react";
import { ACTIONS_FORM as ACTIONS } from "./actions";

// Acciones para el reducer

// Reducer para gestionar el estado del formulario
function formReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_FIELD:
      return { ...state, form: action.form };
    case ACTIONS.SET_ERRORS:
      return { ...state, errors: action.errors };
    case ACTIONS.RESET:
      return action.initialForm;
    default:
      return state;
  }
}

const useForm = (initialForm, validator, submitCallback) => {
  const [state, dispatch] = useReducer(formReducer, initialForm);

  const { form } = state;

  const handleChange = (e) => {
    // console.log(e.target);

    let name, value;

    if (e.nativeEvent && e.nativeEvent.target) {
      // Si e.nativeEvent.target existe, lo usamos
      const { name: nativeName, value: nativeValue } = e.nativeEvent.target;
      name = nativeName;
      value = nativeValue;
    } else if (e.target) {
      // Si no, usamos e.target
      const { name: targetName, value: targetValue } = e.target;
      name = targetName;
      value = targetValue;
    }
    dispatch({ type: ACTIONS.SET_FIELD, form: { ...form, [name]: value } });

    // Validar y actualizar errores en tiempo real
    const formErrors = validate(name, value, validator);
    dispatch({ type: ACTIONS.SET_ERRORS, errors: formErrors.error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm(form, validator);
    dispatch({
      type: ACTIONS.SET_ERRORS,
      errors: formErrors,
    });

    if (Object.keys(formErrors).length === 0) {
      submitCallback();
    }
  };

  const handleDataToUpdate = (form) => {
    if (form) {
      dispatch({ type: ACTIONS.SET_FIELD, form: form });
      const formErrors = validateForm(form, validator);
      dispatch({
        type: ACTIONS.SET_ERRORS,
        errors: formErrors,
      });
    }
  };

  const resetForm = () => {
    dispatch({ type: ACTIONS.RESET, initialForm });
  };

  const validateForm = useMemo(() => {
    return (formData, validator) => {
      let err = {};
      for (const fieldName in formData) {
        const { error } = validate(fieldName, formData[fieldName], validator);
        if (error) {
          err = { ...err, ...error };
        }
      }
      return err;
    };
  }, []);

  return [state, handleChange, handleSubmit, resetForm, handleDataToUpdate];
};

export default useForm;

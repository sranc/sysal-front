export const validate = (name, value, validator, error = {}) => {
  const validations = {
    required: (value) => !value && "Este campo es requerido",
    maxLength: (value, maxLength) =>
      value.length > maxLength &&
      `La longitud maxima para este campo es de ${maxLength}`,
    minLength: (value, minLength) =>
      value.length < minLength &&
      `La longitud minima para este campo es de ${minLength}`,
    email: (value) => !isValidEmail(value) && "No es un email valido",
    password: (value) => !isValidPassword(value) && "No es un password valido",
    date: (value) => !isValidDate(value) && "No es una fecha valida",
    phone: (value) => !isValidPhone(value) && "No es un Telefono valido",
    string: (value) => !isValidString(value) && "Solo se acepta letras",
    numeric: (value) => !isValidNumber(value) && "No es un Numero valido",
  };

  if (validator[name] && name) {
    for (let validation in validator[name]) {
      const errorMessage = validations[validation](
        value,
        validator[name][validation]
      );
      if (errorMessage) {
        error[name] = errorMessage;
        break;
      }
    }
  }
  return { error };
};

const isValidString = (string) => {
  // La expresión regular permite cadenas de caracteres alfabéticos o un campo vacío
  const stringRegex = /^(?:[a-zA-Z ]+|\s*)$/;
  return stringRegex.test(string);
};
const isValidDate = (date) => {
  // La expresión regular permite fechas con el formato correcto o un campo vacío
  const dateRegex =
    /^(?:(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2}))|\s*$/;
  return dateRegex.test(date);
};
const isValidPassword = (password) => {
  const regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
  return regex.test(password);
};
const isValidEmail = (email) => {
  // La expresión regular permite correos electrónicos válidos o un campo vacío
  const emailRegex = /^(?:[^\s@]+@[^\s@]+\.[^\s@]+|\s*)$/;
  return emailRegex.test(email);
};
const isValidPhone = (phone) => {
  const phoneRegex = /^(\d*)$/;
  return phoneRegex.test(phone);
};
const isValidNumber = (number) => {
  // La expresión regular permite números o un campo vacío
  const numberRegex = /^(?:[0-9]+(\.[0-9]*)?|\s*)$/;
  return numberRegex.test(number);
};

export const objectEmpty = (object) => {
  return Object.keys(object).length === 0;
};

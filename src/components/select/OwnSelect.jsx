import "./select.css";
import { colorErrorCase, colorErrorLabel } from "../../utils/CommonFunctions";

const OwnSelect = ({
  color,
  label,
  isInvalid = false,
  errorMessage = "",
  startContent,
  className,
  option,
  ...rest
}) => {
  return (
    <div className={`select-group flex flex-col w-full ${className}`}>
      <select
        {...rest}
        className={`border-2 border-bdinput dark:border-graydark outline-none rounded-lg bg-bginput dark:bg-bgdarkinput px-4 pt-6 pb-2 z-10 text-sm  focus:outline-none 
        ${colorErrorCase(color)} `}
      >
        <option
          className=" dark:bg-bgdarkinput"
          value=""
        >{`Seleccione un ${label.toLowerCase()}`}</option>
        {option &&
          option.map((el) => (
            <option
              className=" dark:bg-bgdarkinput"
              key={`${label}-${el.id}`}
              value={el.id}
            >
              {el.name}
            </option>
          ))}
      </select>
      <label
        className={`absolute left-4 pointer-events-none py-0 bg-transparent ${colorErrorLabel(
          color
        )} transform translate-y-4 z-10`}
      >
        <div className="flex gap-0.5">
          {startContent && <span className="mt-1">{startContent}</span>}
          <span>{label}</span>
        </div>
      </label>
      {isInvalid && <p className="text-danger">{errorMessage}</p>}
    </div>
  );
};

export default OwnSelect;

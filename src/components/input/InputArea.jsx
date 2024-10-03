import "./input.css";
import { colorErrorCase, colorErrorLabel } from "../../utils/CommonFunctions";

const InputArea = ({
  color,
  label,
  isInvalid = false,
  errorMessage = "",
  startContent,
  className,
  ...rest
}) => {
  const areaClasses = `border-2 border-bdinput dark:border-graydark outline-none rounded-lg bg-bginput dark:bg-bgdarkinput px-4 pt-6 pb-2 z-10 text-sm focus:outline-none ${colorErrorCase(
    color
  )}`;

  const labelClasses = `absolute left-4 pointer-events-none py-0 bg-transparent ${colorErrorLabel(
    color
  )} transform translate-y-4 z-10`;
  return (
    <div className={`flex flex-col input-group w-full ${className} `}>
      <textarea {...rest} placeholder=" " className={areaClasses} />
      <label className={labelClasses}>
        <div className="flex gap-0.5">
          {startContent && <span className="mt-1">{startContent}</span>}
          <span>{label}</span>
        </div>
      </label>
      {isInvalid && <p className="text-danger">{errorMessage}</p>}
    </div>
  );
};

export default InputArea;

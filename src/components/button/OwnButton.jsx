import { colorButton } from "../../utils/CommonFunctions";
import "./button.css"; // Asegúrate de tener los estilos CSS importados

const OwnButton = ({ children, className, color, ...rest }) => {
  const createRipple = (e) => {
    const button = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${
      e.clientX - button.getBoundingClientRect().left - radius
    }px`;
    circle.style.top = `${
      e.clientY - button.getBoundingClientRect().top - radius
    }px`;
    circle.classList.add("ripple-circle");

    const ripple = button.getElementsByClassName("ripple-circle")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <div className={`flex rounded-xl w-full `}>
      <button
        className={` ${className} relative w-full h-full overflow-hidden border-none ${colorButton(
          color
        )} cursor-pointer rounded-xl outline-none ripple-btn`}
        onClick={createRipple}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};

export default OwnButton;

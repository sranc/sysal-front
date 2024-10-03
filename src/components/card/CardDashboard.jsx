import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const CardDashboard = ({ card }) => {
  const { icon: CardIcon, value, path, title, percentage } = card;

  const renderPercentage = () => {
    const absPercentage = Math.abs(percentage);

    if (percentage > 0) {
      return (
        <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
          {absPercentage}%
          <FaArrowUp />
        </span>
      );
    } else if (percentage < 0) {
      return (
        <span className="flex items-center gap-1 text-sm font-medium text-meta-1">
          {absPercentage}%
          <FaArrowDown />
        </span>
      );
    } else {
      return (
        <span className="flex items-center gap-1 text-sm font-medium text-meta-5"></span>
      );
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full text-xl bg-meta-2 dark:bg-meta-4">
        <CardIcon className="fill-sea1 dark:fill-sea2" />
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {value}
          </h4>
          <NavLink to={path}>
            <span className="text-md font-medium hover:dark:text-white">
              {title}
            </span>
          </NavLink>
        </div>

        {renderPercentage()}
      </div>
    </div>
  );
};

export default CardDashboard;

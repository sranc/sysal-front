export const colorErrorCase = (color) => {
  switch (color) {
    case "danger":
      return "hover:border-danger dark:hover:border-danger focus:border-danger dark:focus:border-danger";
    case "success":
      return "hover:border-success dark:hover:border-sea2 focus:border-success dark:focus:border-sea2";
    default:
      return "hover:border-bodydark dark:hover:border-bodydark2 focus:border-bodydark dark:focus:border-bodydark2";
  }
};
export const colorErrorLabel = (color) => {
  switch (color) {
    case "danger":
      return "text-danger";
    case "success":
      return "text-success dark:text-sea2";
    default:
      return "text-body dark:text-bodydark";
  }
};
export const colorButton = (color) => {
  switch (color) {
    case "danger":
      return "bg-danger";
    case "success":
      return "bg-success";
    case "primary":
      return "bg-primary";
    case "secondary":
      return "bg-secondary";
    case "warning":
      return "bg-warning";
    default:
      return "bg-default";
  }
};

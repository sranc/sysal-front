import DataTable from "../components/dataTable/DataTable";
import { CircularProgress } from "@nextui-org/react";
import { FaCirclePlus } from "react-icons/fa6";
import Swal from "sweetalert2";

const tableHeader = [
  { name: "Categoria", data: "category_id.name" },
  { name: "Item", data: "description" },
  {
    name: "Acción",
    data: "action",
    actions: [
      {
        function: "props.handleVer(el)",
        icon: FaCirclePlus,
        color: "sea1",
      },
    ],
  },
];

const EntryDetail = ({ itemData, boughtItem, setBoughtItem }) => {
  const showTable = () => {
    return itemData ? (
      <DataTable data={itemData} header={tableHeader} handleVer={handleVer} />
    ) : (
      <CircularProgress size="md" />
    );
  };
  const handleVer = async (el) => {
    const { value: values } = await Swal.fire({
      title: `Item : ${el.description}`,
      html:
        '<div class="swal2-input-container flex items-center">' +
        '  <label for="input1" class="swal2-input-label">Cantidad</label>' +
        '  <input id="input1" class="swal2-input" type="number" inputmode="numeric">' +
        "</div>" +
        '<div class="swal2-input-container flex items-center">' +
        '  <label for="input2" class="swal2-input-label">Costo unitario</label>' +
        '  <input id="input2" class="swal2-input" type="number" inputmode="numeric">' +
        "</div>",
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        return new Promise(function (resolve) {
          // Validate input
          const numberOfProducts = Number(
            document.getElementById("input1").value
          );
          const AmountPerUnit = Number(document.getElementById("input2").value);
          if (numberOfProducts == "" && numberOfProducts <= 0) {
            Swal.showValidationMessage("Ingresa una canditad válida");
            Swal.enableButtons();
          } else if (AmountPerUnit == "" && AmountPerUnit <= 0) {
            Swal.showValidationMessage("Ingresa un costo unitario válido");
            Swal.enableButtons();
          } else {
            Swal.resetValidationMessage(); // Reset the validation message.
            resolve([numberOfProducts, AmountPerUnit]);
          }
        });
      },
    });
    if (values) {
      el.number_of = values[0];
      el.unit_cost = values[1];
      el.total_cost = values[0] * values[1];
      el.editable = true;
      setBoughtItem([...boughtItem, el]);
    }
  };
  return <div>{showTable()}</div>;
};

export default EntryDetail;

import { Button } from "@nextui-org/react";
import { useEffect } from "react";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const TableItems = ({ boughtItem, setBoughtItem }) => {
  const handleActions = async (action, element) => {
    let newBoughtItem = [];
    if (action === "Update") { 
      const values = await handleMsg(element);
      element.numberOfProducts = values[0];
      element.amountPerUnit = values[1];
      element.totalAmount = values[2];
      newBoughtItem = boughtItem.map((el) => {
        return el.id === element.id ? element : el;
      });
      setBoughtItem(newBoughtItem);
    }
    if (action === "Delete") {
      newBoughtItem = boughtItem.filter((el) => el.id !== element.id);
      setBoughtItem(newBoughtItem);
    }
  };
  console.log(boughtItem);
  const handleMsg = async (element) => {
    const { value: values } = await Swal.fire({
      title: `Item : ${element.description}`,
      html:
        '<div class="swal2-input-container flex items-center">' +
        '  <label for="input1" class="swal2-input-label">Cantidad</label>' +
        `  <input id="input1" class="swal2-input" type="number" inputmode="numeric" value = 
            ${element.number_of}>` +
        "</div>" +
        '<div class="swal2-input-container flex items-center">' +
        '  <label for="input2" class="swal2-input-label">Costo unitario</label>' +
        `  <input id="input2" class="swal2-input" type="number" inputmode="numeric" value = 
            ${element.unit_cost}>` +
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
      values.push(values[0] * values[1]);
      return values;
    }
  };

  useEffect(() => {}, []);

  return (
    <table className="table table-auto w-full overflow-y-auto border border-stroke dark:border-strokedark p-2 rounded-lg">
      <thead className=" text-lg text-black dark:text-white p-3 border-b border-strokedark dark:border-stroke">
        <tr>
          <th>Item</th>
          <th>Cantidad</th>
          <th>costoUnitario</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="divide-y p-4 divide-stroke dark:divide-strokedark text-center ">
        {boughtItem.length > 0 ? (
          boughtItem.map((el) => (
            <tr key={`${el.id}-${el.total_cost}`} className="py-3">
              <td>{el.description ? el.description : el.item_id.item}</td>
              <td>{el.number_of}</td>
              <td>{el.unit_cost}</td>
              <td>{el.total_cost}</td>
              <td>
                {el.editable ? (
                  <>
                    <Button
                      isIconOnly
                      color="sea"
                      title="Modificar"
                      size="sm"
                      onClick={() => {
                        handleActions("Update", el);
                      }}
                      className="mx-0.5 bg-sea1 dark:bg-transparent hover:bg-sea1/70 dark:hover:bg-black-2/20"
                    >
                      <FaPencil className=" text-bodydark1 text-lg dark:text-sea1" />
                    </Button>
                    <Button
                      isIconOnly
                      color="sea"
                      title="Eliminar"
                      size="sm"
                      onClick={() => {
                        handleActions("Delete", el);
                      }}
                      className="mx-0.5 bg-sea3 dark:bg-transparent hover:bg-sea3/70 dark:hover:bg-black-2/20"
                    >
                      <FaTrashCan className=" text-bodydark1 text-lg dark:text-sea3" />
                    </Button>
                  </>
                ) : (
                  "sin Accion"
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="items-center py-3">
              Sin Items
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableItems;

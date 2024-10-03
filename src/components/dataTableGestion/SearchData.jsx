import { Input, Select, SelectItem } from "@nextui-org/react";
import { searchFunction } from "./TableFunctions";
import { FiSearch } from "react-icons/fi";

const pagePagination = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
  { value: "all", label: "Todos" },
];

const SearchData = ({ handleDataPerPage, data, header, setDataToShow }) => {
  const handleSearch = (e) => {
    const newData = searchFunction(data, e.nativeEvent.target.value, header);
    setDataToShow(newData);
  };
  return (
    <div className="flex  mb-8 justify-between">
      <div className="w-24">
        <Select
          label=" "
          size="sm"
          defaultSelectedKeys={["10"]}
          className="max-w-xs"
          onChange={handleDataPerPage}
        >
          {pagePagination.map((cant) => (
            <SelectItem key={cant.value} value={cant.value}>
              {cant.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex md:w-80">
        <Input
          label="Buscar"
          size="sm"
          onChange={handleSearch}
          type="text"
          radius="lg"
          placeholder="Escriba para buscar..."
          startContent={
            <FiSearch className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>
    </div>
  );
};

export default SearchData;

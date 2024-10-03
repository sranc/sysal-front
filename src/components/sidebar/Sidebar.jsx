import { useState, useEffect, useRef } from "react";
import {
  FaArrowLeft,
  FaCalendar,
  FaMoneyBill,
  FaMoneyBillTransfer,
} from "react-icons/fa6";
import Menu from "./Menu";
import { NavLink, useLocation } from "react-router-dom";

const menu = [
  {
    title: "Gestiones",
    path: "/gestions",
    icon: FaCalendar,
  },
  {
    title: "Financiamiento",
    path: "/financing",
    icon: FaCalendar,
  },
  {
    title: "Unidad de Medida",
    path: "/unitMeasures",
    icon: FaCalendar,
  },
  {
    title: "Entradas",
    linkName: "entries",
    subLinks: [
      {
        title: "Entrada",
        path: "/entries/entries",
        icon: FaMoneyBillTransfer,
      },
      {
        title: "Tipo de Entrada",
        path: "/entries/typeIncomes",
        icon: FaMoneyBillTransfer,
      },
      {
        title: "Proveedor",
        path: "/entries/suppliers",
        icon: FaMoneyBillTransfer,
      },
    ],
    icon: FaMoneyBill,
  },
  {
    title: "Artículos",
    linkName: "items",
    subLinks: [
      {
        title: "Artículo",
        path: "/items/items",
        icon: FaMoneyBillTransfer,
      },
      {
        title: "Partida Presupuestaria",
        path: "/items/budgetLines",
        icon: FaMoneyBillTransfer,
      },
      {
        title: "Categoria",
        path: "/items/categories",
        icon: FaMoneyBillTransfer,
      },
    ],
    icon: FaMoneyBill,
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) {
        return;
      }
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-60 flex-col overflow-y-hidden bg-black duration-300 ease-linear text-bodydark   dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 ">
        <div className={`w-3/4  text-3xl text-center transition-all `}>
          <NavLink to="/">
            <p>
              <span className=" text-sea1">Sy</span>sal
            </p>
          </NavLink>
        </div>
        <div className="flex-1  text-right">
          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden text-lg"
          >
            <FaArrowLeft />
          </button>
        </div>
      </div>
      <div
        className={` flex flex-col overflow-y-auto duration-300 ease-linear`}
      >
        <nav className=" mt-0 mb-5 ">
          <Menu
            menu={menu}
            sidebarExpanded={sidebarExpanded}
            setSidebarExpanded={setSidebarExpanded}
            pathname={pathname}
          />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

import {
  FaCartShopping,
  FaClipboardCheck,
  FaDollarSign,
  FaTruck,
} from "react-icons/fa6";
import CardDashboard from "../components/card/CardDashboard";
import ChartOne from "../components/Charts/ChartOne";
import ChartTwo from "../components/Charts/ChartTwo";

const cards = [
  {
    title: "Entradas",
    name: "entries",
    value: 500,
    percentage: 0.45,
    icon: FaCartShopping,
    path: "/entries/entries",
  },
  {
    title: "Salidas",
    name: "outputs",
    value: 1000,
    percentage: 0.8,
    icon: FaDollarSign,
    path: "/outputs/outputs",
  },
  {
    title: "Proveedores",
    name: "suppliers",
    value: 50,
    percentage: 0,
    icon: FaTruck,
    path: "/entries/suppliers",
  },
  {
    title: "Solicitudes",
    name: "requests",
    value: 200,
    percentage: 95,
    icon: FaClipboardCheck,
    path: "/requests",
  },
];

const Home = () => {
  const renderCards = () => {
    return cards.map((card) => <CardDashboard key={card.name} card={card} />);
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 2xl:gap-7.5">
        {renderCards()}
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
      </div>
    </>
  );
};

export default Home;

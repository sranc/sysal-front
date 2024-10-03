import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Gestions from "./pages/Gestions";
import Financing from "./pages/Financing";
import UnitMeasures from "./pages/UnitMeasures";
import BudgetLines from "./pages/BudgetLines";
import TypeIncomes from "./pages/TypeIncomes";
import Suppliers from "./pages/Suppliers";
import Categories from "./pages/Categories";
import Requests from "./pages/Requests";
import PurchaseRequests from "./pages/PurchaseRequests";
import HousingDevelopmentUnit from "./pages/housingDevelopmentUnit";
import Items from "./pages/Items";
import Entries from "./pages/Entries";
import Outputs from "./pages/Outputs";
import Error404 from "./pages/Error404";
import Forbidden from "./pages/Forbidden";
// import LayoutPages from "./layouts/LayoutPages";
import { Toaster } from "react-hot-toast";
import { lazy, useEffect, useState } from "react";
import Loader from "./utils/Loader";

const LayoutPages = lazy(() => import("./layouts/LayoutPages"));

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/login" element={<Home />} />
        <Route path="/" element={<LayoutPages />}>
          <Route index element={<Home />} />

          <Route path="/gestions" element={<Gestions />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/unitMeasures" element={<UnitMeasures />} />
          <Route path="/items/budgetLines" element={<BudgetLines />} />
          <Route path="/entries/typeIncomes" element={<TypeIncomes />} />
          <Route path="/entries/suppliers" element={<Suppliers />} />

          <Route path="items/categories" element={<Categories />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/purchaseRequests" element={<PurchaseRequests />} />
          <Route
            path="/housingDevelopmentUnit"
            element={<HousingDevelopmentUnit />}
          />
          <Route path="items/items" element={<Items />} />
          <Route path="/entries/entries" element={<Entries />} />
          <Route path="/outputs/outputs" element={<Outputs />} />
        </Route>

        <Route path="/forbidden" exact element={<Forbidden />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;

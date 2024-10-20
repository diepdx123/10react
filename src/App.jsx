import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import ProductsList from "./pages/ProductsList";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
import SIgnin from "./pages/SIgnin";
import Signup from "./pages/Signup";
import PrivateRouter from "./PrivateRouter";

function App() {
  return (
    <>
      <Routes>
        <Route path="signin" element={<SIgnin />} />
        <Route path="signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <PrivateRouter>
              <Layout />
            </PrivateRouter>
          }
        >
          <Route path="products" element={<ProductsList />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/:id/edit" element={<ProductEdit />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

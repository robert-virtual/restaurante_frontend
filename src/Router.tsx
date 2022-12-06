import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "@components/PrivateRoute";
import Signin from "@views/Signin";
import SignUp from "@views/SignUp";
import Producto from "@views/Productos";
import ProductoNew from "@views/ProductoNew";
import NotFound from "@views/NotFound";
import ProductoDetail from "@views/ProductoDetail";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
              <Producto />
          }
        />
         <Route
          path="/productos"
          element={
              <Producto />
          }
        />
        <Route
          path="/productos/new"
          element={
            <PrivateRoute allowedRoles={["public","admin"]}>
              <ProductoNew />
            </PrivateRoute>
          }
        />
         <Route
          path="/productos/:id"
          element={
            <PrivateRoute allowedRoles={["public","admin"]}>
              <ProductoDetail />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </Router>
  );
};

export default Routes;

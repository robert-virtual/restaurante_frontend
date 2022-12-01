import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "@components/PrivateRoute";
import Login from "@views/Login";
import SignUp from "@views/SignUp";
import Home from "@views/Home";
import Productos from "@views/Productos";
import ChartsExamples from "@views/ChartsExamples";
import NotFound from "@views/NotFound";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/charts" element={<ChartsExamples />} />
        <Route
          path="/home"
          element={
            <PrivateRoute allowedRoles={["public","admin"]}>
              <Home />
            </PrivateRoute>
          }
        />
         <Route
          path="/productos"
          element={
            <PrivateRoute allowedRoles={["public","admin"]}>
              <Productos />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </Router>
  );
};

export default Routes;

import { useAuth } from "../context/auth";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { useContext } from "react";

const Routes = () => {
  const { signed } = useAuth();

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;

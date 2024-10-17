import { Navigate } from "react-router-dom";

type Props = {
  element: React.ReactNode;
};

export default function PrivateRoute({ element }: Props) {
  const access_token = localStorage.getItem("access_token");

  return access_token ? element : <Navigate to={"/"} />;
}

import { Navigate } from "react-router-dom";
import { useUserStore } from "../config/store";

type Props = {
  element: React.ReactNode;
};

export default function PrivateRoute({ element }: Props) {
  const { user } = useUserStore();
  return user.id !== 0 ? element : <Navigate to={"/"} />;
}

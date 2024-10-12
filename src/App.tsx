import { Route, Routes } from "react-router-dom";
import "./global.css";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import CategoryPage from "./pages/CategoryPage";
import UserDetailPage from "./pages/UserDetailPage";
import EditInfoPage from "./pages/EditInfoPage";
import OrdersPage from "./pages/OrdersPage";
import GameMatePage from "./pages/GameMatePage";
import CoinPage from "./pages/CoinPage";

function App() {
  return (
    <Routes>
      <Route path='/catagory/:gameId' element={<CategoryPage />} />
      <Route path='/user/:userId' element={<UserDetailPage />} />
      <Route path='/user/edit-info' element={<EditInfoPage />} />
      <Route path='/user/orders' element={<OrdersPage />} />
      <Route path='/user/gamemate' element={<GameMatePage />} />
      <Route path='/coin' element={<CoinPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
}

export default App;

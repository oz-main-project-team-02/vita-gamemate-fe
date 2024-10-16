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
import GoogleCallback from "./pages/GoogleCallback";
import KakaoCallback from "./pages/KakaoCallback";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path='/category/:gameId' element={<CategoryPage />} />
      <Route path='/user/:userId' element={<UserDetailPage />} />
      <Route path='/user/edit-info' element={<PrivateRoute element={<EditInfoPage />} />} />
      <Route path='/user/orders' element={<PrivateRoute element={<OrdersPage />} />} />
      <Route path='/user/gamemate' element={<PrivateRoute element={<GameMatePage />} />} />
      <Route path='/coin' element={<CoinPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='*' element={<ErrorPage />} />
      <Route path='/auth/google/callback' element={<GoogleCallback />} />
      <Route path='/auth/kakao/callback' element={<KakaoCallback />} />
    </Routes>
  );
}

export default App;

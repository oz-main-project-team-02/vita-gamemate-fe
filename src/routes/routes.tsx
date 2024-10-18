import CategoryPage from '../pages/CategoryPage';
import CoinPage from '../pages/CoinPage';
import EditInfoPage from '../pages/EditInfoPage';
import ErrorPage from '../pages/ErrorPage';
import GameMatePage from '../pages/GameMatePage';
import GoogleCallback from '../pages/GoogleCallback';
import HomePage from '../pages/HomePage';
import KakaoCallback from '../pages/KakaoCallback';
import OrdersPage from '../pages/OrdersPage';
import UserDetailPage from '../pages/UserDetailPage';

export const privateRoutes = [
  { path: '/user/edit-info', element: <EditInfoPage /> },
  { path: '/user/orders', element: <OrdersPage /> },
  { path: '/user/gamemate', element: <GameMatePage /> },
];

export const publicRoutes = [
  { path: '/category/:gameId', element: <CategoryPage /> },
  { path: '/user/:userId', element: <UserDetailPage /> },
  { path: '/coin', element: <CoinPage /> },
  { path: '/auth/kakao/callback', element: <KakaoCallback /> },
  { path: '/auth/google/callback', element: <GoogleCallback /> },
  { path: '/auth/google/callback', element: <GoogleCallback /> },
  { path: '/', element: <HomePage /> },
  { path: '*', element: <ErrorPage /> },
];

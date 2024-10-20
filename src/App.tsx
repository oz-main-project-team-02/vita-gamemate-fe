import './global.css';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import VitaPrivateRoute from './routes/VitaPrivateRoute';

const CategoryPage = React.lazy(() => import('@/pages/CategoryPage'));
const CoinPage = React.lazy(() => import('@/pages/CoinPage'));
const EditInfoPage = React.lazy(() => import('@/pages/EditInfoPage'));
const ErrorPage = React.lazy(() => import('@/pages/ErrorPage'));
const GameMatePage = React.lazy(() => import('@/pages/GameMatePage'));
const GoogleCallback = React.lazy(() => import('@/pages/GoogleCallback'));
const HomePage = React.lazy(() => import('@/pages/HomePage'));
const KakaoCallback = React.lazy(() => import('@/pages/KakaoCallback'));
const OrdersPage = React.lazy(() => import('@/pages/OrdersPage'));
const UserDetailPage = React.lazy(() => import('@/pages/UserDetailPage'));

function App() {
  return (
    <Suspense>
      <Routes>
        {/* Private Routes */}
        {/* TODO: 각각 페이지 루트에서 <Suspense fallback={<SkeletonUI>}>{children}</Suspense> 만드셔서 추가하시면됩니다. */}
        <Route element={<VitaPrivateRoute />}>
          <Route path='/user/edit-info' element={<EditInfoPage />} />
          <Route path='/user/orders' element={<OrdersPage />} />
          <Route path='/user/gamemate' element={<GameMatePage />} />
        </Route>

        {/* Public Routes */}
        {/* TODO: 각각 페이지 루트에서 <Suspense fallback={<SkeletonUI>}>{children}</Suspense> 만드셔서 추가하시면됩니다. */}
        <Route path='/category/:gameId' element={<CategoryPage />} />
        <Route path='/user/:userId' element={<UserDetailPage />} />
        <Route path='/coin' element={<CoinPage />} />
        <Route path='/auth/kakao/callback' element={<KakaoCallback />} />
        <Route path='/auth/google/callback' element={<GoogleCallback />} />
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}
export default App;

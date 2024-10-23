import './global.css';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import VitaPrivateRoute from './routes/VitaPrivateRoute';
import LoginStatusChecker from './components/Common/LoginStatusChecker';
import Spinner from './components/Common/Spinner'; // 공통 스피너 컴포넌트
import { SuccessPage } from './pages/payments/SuccessPage';
import { FailPage } from './pages/payments/FailPage';
import { CheckoutPage } from './pages/payments/CheckoutPage';

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
    <LoginStatusChecker>
      <Routes>
        {/* Private Routes */}
        <Route element={<VitaPrivateRoute />}>
          <Route
            path='/user/edit-info'
            element={
              <Suspense fallback={<Spinner />}>
                <EditInfoPage />
              </Suspense>
            }
          />
          <Route
            path='/user/orders'
            element={
              <Suspense fallback={<Spinner />}>
                <OrdersPage />
              </Suspense>
            }
          />
          <Route
            path='/user/gamemate'
            element={
              <Suspense fallback={<Spinner />}>
                <GameMatePage />
              </Suspense>
            }
          />
        </Route>

        {/* Public Routes */}
        <Route
          path='/category/:gameId'
          element={
            <Suspense fallback={<Spinner />}>
              <CategoryPage />
            </Suspense>
          }
        />
        <Route
          path='/user/:userId'
          element={
            <Suspense fallback={<Spinner />}>
              <UserDetailPage />
            </Suspense>
          }
        />
        <Route
          path='/coin'
          element={
            <Suspense fallback={<Spinner />}>
              <CoinPage />
            </Suspense>
          }
        />
        <Route
          path='/auth/kakao/callback'
          element={
            <Suspense fallback={<Spinner />}>
              <KakaoCallback />
            </Suspense>
          }
        />
        <Route
          path='/auth/google/callback'
          element={
            <Suspense fallback={<Spinner />}>
              <GoogleCallback />
            </Suspense>
          }
        />
        <Route
          path='/'
          element={
            <Suspense fallback={<Spinner />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<Spinner />}>
              <ErrorPage />
            </Suspense>
          }
        />

        {/* TOSS 테스트 결제 페이지 */}
        <Route path='/payment' element={<CheckoutPage />} />
        <Route path='/payment/success' element={<SuccessPage />} />
        <Route path='/payment/fail' element={<FailPage />} />
      </Routes>
    </LoginStatusChecker>
  );
}

export default App;

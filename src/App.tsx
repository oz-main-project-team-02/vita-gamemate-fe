import './global.css';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import VitaPrivateRoute from './routes/VitaPrivateRoute';
import LoginStatusChecker from './components/Common/LoginStatusChecker';
import Spinner from './components/Common/Spinner';
import { SuccessPage } from './pages/payments/SuccessPage';
import { FailPage } from './pages/payments/FailPage';
import { PaymentCheckoutPage } from './pages/payments/PaymentCheckout';
import PaymentBillingPage from './pages/payments/PaymentBilling';
import CommonLayout from './layouts/CommonLayout';

const CategoryPage = React.lazy(() => import('@/pages/CategoryPage'));
const ErrorPage = React.lazy(() => import('@/pages/ErrorPage'));
const HomePage = React.lazy(() => import('@/pages/HomePage'));
const KakaoCallback = React.lazy(() => import('@/pages/KakaoCallback'));

const EditInfoPage = React.lazy(() => import('@/pages/user/EditInfoPage'));
const CoinPage = React.lazy(() => import('@/pages/user/CoinPage'));
const GameMatePage = React.lazy(() => import('@/pages/user/GameMatePage'));
const OrdersPage = React.lazy(() => import('@/pages/user/OrdersPage'));
const UserDetailPage = React.lazy(() => import('@/pages/user/UserDetailPage'));
const PaymentsPage = React.lazy(() => import('@/pages/user/PaymentsPage'));

function App() {
  return (
    <LoginStatusChecker>
      <Routes>
        <CommonLayout>
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
            <Route
              path='/user/payments'
              element={
                <Suspense fallback={<Spinner />}>
                  <PaymentsPage />
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
            path='/user/coin'
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
        </CommonLayout>

        {/* TOSS WIDGETS 테스트 결제 페이지 */}
        {/* <Route path='/payment' element={<CheckoutPage />} /> */}
        {/* <Route path='/fail' element={<FailPage />} /> */}

        {/* TOSS 개별 API 결제 페이지 */}
        <Route path='/payment' element={<PaymentCheckoutPage />} />
        <Route path='/payment/billing' element={<PaymentBillingPage />} />

        {/* TOSS Success, Fail 페이지 */}
        <Route path='/payment/success' element={<SuccessPage />} />
        <Route path='/fail' element={<FailPage />} />
      </Routes>
    </LoginStatusChecker>
  );
}

export default App;

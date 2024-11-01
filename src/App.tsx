import './global.css';
import { Route, Routes } from 'react-router-dom';
import VitaPrivateRoute from './routes/VitaPrivateRoute';
import LoginStatusChecker from './components/Common/LoginStatusChecker';
import { SuccessPage } from './pages/payments/SuccessPage';
import { FailPage } from './pages/payments/FailPage';
import { PaymentCheckoutPage } from './pages/payments/PaymentCheckout';
import PaymentBillingPage from './pages/payments/PaymentBilling';
import CommonLayout from './layouts/CommonLayout';
import EventPage from './pages/EventPage';
import EditInfoPage from '@/pages/user/EditInfoPage';
import OrdersPage from '@/pages/user/OrdersPage';
import GameMatePage from '@/pages/user/GameMatePage';
import PaymentsPage from '@/pages/user/PaymentsPage';
import CategoryPage from '@/pages/CategoryPage';
import UserDetailPage from '@/pages/user/UserDetailPage';
import CoinPage from '@/pages/user/CoinPage';
import KakaoCallback from '@/pages/KakaoCallback';
import HomePage from '@/pages/HomePage';
import ErrorPage from '@/pages/ErrorPage';

function App() {
  return (
    <LoginStatusChecker>
      <Routes>
        <Route element={<CommonLayout />}>
          {/* Private Routes */}
          <Route element={<VitaPrivateRoute />}>
            <Route path='/user/edit-info' element={<EditInfoPage />} />
            <Route path='/user/orders' element={<OrdersPage />} />
            <Route path='/user/gamemate' element={<GameMatePage />} />
            <Route path='/user/payments' element={<PaymentsPage />} />
          </Route>

          {/* Public Routes */}
          <Route path='/category/:gameId' element={<CategoryPage />} />
          <Route path='/user/:userId' element={<UserDetailPage />} />
          <Route path='/user/coin' element={<CoinPage />} />
          <Route path='/auth/kakao/callback' element={<KakaoCallback />} />
          <Route path='/event/:gameId' element={<EventPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>

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

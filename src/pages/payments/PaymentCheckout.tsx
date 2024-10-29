import { CoinPackage } from '@/config/const';
import { useUserStore } from '@/config/store';
import '@/toss.css';
import { loadTossPayments, TossPaymentsPayment } from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// ------  SDK 초기화 ------
// TODO: clientKey는 개발자센터의 API 개별 연동 키 > 결제창 연동에 사용하려할 MID > 클라이언트 키로 바꾸세요.
// TODO: server.js 의 secretKey 또한 결제위젯 연동 키가 아닌 API 개별 연동 키의 시크릿 키로 변경해야 합니다.
// TODO: 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요. 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = import.meta.env.VITE_TOSS_CLIENTKEY;
const customerKey = generateRandomString();

type PaymentMethod =
  | 'CARD'
  | 'TRANSFER'
  | 'VIRTUAL_ACCOUNT'
  | 'MOBILE_PHONE'
  | 'CULTURE_GIFT_CERTIFICATE'
  | 'FOREIGN_EASY_PAY'
  | null;

export function PaymentCheckoutPage() {
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const user = useUserStore((state) => state.user);

  const location = useLocation();
  const { coinData }: { coinData: CoinPackage } = location.state || {};
  console.log('결제: ', coinData);

  function selectPaymentMethod(method: PaymentMethod) {
    setSelectedPaymentMethod(method);
  }

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);

        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentspayment
        const payment = tossPayments.payment({
          customerKey,
        });

        setPayment(payment);
      } catch (error) {
        console.error('Error fetching payment:', error);
      }
    }

    fetchPayment();
  }, [clientKey, customerKey]);

  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
  // @docs https://docs.tosspayments.com/sdk/v2/js#paymentrequestpayment
  async function requestPayment() {
    if (!payment || !selectedPaymentMethod) {
      console.error('결제 방식이 선택되지 않았습니다.');
      return;
    }

    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    try {
      switch (selectedPaymentMethod) {
        case 'CARD':
          await payment.requestPayment({
            method: 'CARD', // 카드 및 간편결제
            amount: {
              currency: 'KRW',
              value: coinData.discountPrice,
            },
            orderId: generateRandomString(), // 고유 주문번호
            orderName: `비타 코인 ${coinData.coin}`,
            successUrl: `${window.location.origin}/payment/success?${window.location.search}&coin=${coinData.coin}`,
            failUrl: window.location.origin + '/fail',
            customerEmail: `${user.email}`,
            customerName: `${user.nickname}`,
            customerMobilePhone: '01012341234',
            card: {
              useEscrow: false,
              flowMode: 'DEFAULT',
              useCardPoint: false,
              useAppCardOnly: false,
            },
          });
          break;
        case 'TRANSFER':
          await payment.requestPayment({
            method: 'TRANSFER', // 계좌이체 결제
            amount: {
              currency: 'KRW',
              value: coinData.discountPrice,
            },
            orderId: generateRandomString(),
            orderName: `비타 코인 ${coinData.coin}`,
            successUrl: `${window.location.origin}/payment/success?${window.location.search}&coin=${coinData.coin}`,
            failUrl: window.location.origin + '/fail',
            customerEmail: `${user.email}`,
            customerName: `${user.nickname}`,
            customerMobilePhone: '01012341234',
            transfer: {
              cashReceipt: {
                type: '소득공제',
              },
              useEscrow: false,
            },
          });
          break;
        case 'VIRTUAL_ACCOUNT':
          await payment.requestPayment({
            method: 'VIRTUAL_ACCOUNT', // 가상계좌 결제
            amount: {
              currency: 'KRW',
              value: coinData.discountPrice,
            },
            orderId: generateRandomString(),
            orderName: `비타 코인 ${coinData.coin}`,
            successUrl: `${window.location.origin}/payment/success?${window.location.search}&coin=${coinData.coin}`,
            failUrl: window.location.origin + '/fail',
            customerEmail: `${user.email}`,
            customerName: `${user.nickname}`,
            customerMobilePhone: '01012341234',
            virtualAccount: {
              cashReceipt: {
                type: '소득공제',
              },
              useEscrow: false,
              validHours: 24,
            },
          });
          break;
        case 'MOBILE_PHONE':
          await payment.requestPayment({
            method: 'MOBILE_PHONE', // 휴대폰 결제
            amount: {
              currency: 'KRW',
              value: coinData.discountPrice,
            },
            orderId: generateRandomString(),
            orderName: `비타 코인 ${coinData.coin}`,
            successUrl: `${window.location.origin}/payment/success?${window.location.search}&coin=${coinData.coin}`,
            failUrl: window.location.origin + '/fail',
            customerEmail: `${user.email}`,
            customerName: `${user.nickname}`,
            customerMobilePhone: '01012341234',
          });
          break;
        case 'CULTURE_GIFT_CERTIFICATE':
          await payment.requestPayment({
            method: 'CULTURE_GIFT_CERTIFICATE', // 문화상품권 결제
            amount: {
              currency: 'KRW',
              value: coinData.discountPrice,
            },
            orderId: generateRandomString(),
            orderName: `비타 코인 ${coinData.coin}`,
            successUrl: `${window.location.origin}/payment/success?${window.location.search}&coin=${coinData.coin}`,
            failUrl: window.location.origin + '/fail',
            customerEmail: `${user.email}`,
            customerName: `${user.nickname}`,
            customerMobilePhone: '01012341234',
          });
          break;
        case 'FOREIGN_EASY_PAY':
          await payment.requestPayment({
            method: 'FOREIGN_EASY_PAY', // 해외 간편결제
            amount: {
              currency: 'USD',
              value: 100,
            },
            orderId: generateRandomString(),
            orderName: `비타 코인 ${coinData.coin}`,
            successUrl: `${window.location.origin}/payment/success?${window.location.search}&coin=${coinData.coin}`,
            failUrl: window.location.origin + '/fail',
            customerEmail: `${user.email}`,
            customerName: `${user.nickname}`,
            customerMobilePhone: '01012341234',
            foreignEasyPay: {
              provider: 'PAYPAL', // PayPal 결제
              country: 'KR',
            },
          });
          break;
        default:
          console.error('찾을 수 없는 결제 방식');
          break;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function requestBillingAuth() {
    await payment?.requestBillingAuth({
      method: 'CARD', // 자동결제(빌링)은 카드만 지원합니다
      successUrl: window.location.origin + '/payment/billing', // 요청이 성공하면 리다이렉트되는 URL
      failUrl: window.location.origin + '/fail', // 요청이 실패하면 리다이렉트되는 URL
      customerEmail: `${user.email}`,
      customerName: `${user.nickname}`,
    });
  }

  return (
    <div className='wrapper'>
      <div className='box_section'>
        <h1 className='text-4xl font-semibold'>일반 결제</h1>
        <div id='payment-method' style={{ display: 'flex' }}>
          <button
            id='CARD'
            className={`button2 ${selectedPaymentMethod === 'CARD' ? 'active' : ''}`}
            onClick={() => selectPaymentMethod('CARD')}
          >
            카드
          </button>
          <button
            id='TRANSFER'
            className={`button2 ${selectedPaymentMethod === 'TRANSFER' ? 'active' : ''}`}
            onClick={() => selectPaymentMethod('TRANSFER')}
          >
            계좌이체
          </button>
          <button
            id='VIRTUAL_ACCOUNT'
            className={`button2 ${selectedPaymentMethod === 'VIRTUAL_ACCOUNT' ? 'active' : ''}`}
            onClick={() => selectPaymentMethod('VIRTUAL_ACCOUNT')}
          >
            가상계좌
          </button>
          <button
            id='MOBILE_PHONE'
            className={`button2 ${selectedPaymentMethod === 'MOBILE_PHONE' ? 'active' : ''}`}
            onClick={() => selectPaymentMethod('MOBILE_PHONE')}
          >
            휴대폰
          </button>
          <button
            id='CULTURE_GIFT_CERTIFICATE'
            className={`button2 ${selectedPaymentMethod === 'CULTURE_GIFT_CERTIFICATE' ? 'active' : ''}`}
            onClick={() => selectPaymentMethod('CULTURE_GIFT_CERTIFICATE')}
          >
            문화상품권
          </button>
          <button
            id='FOREIGN_EASY_PAY'
            className={`button2 ${selectedPaymentMethod === 'FOREIGN_EASY_PAY' ? 'active' : ''}`}
            onClick={() => selectPaymentMethod('FOREIGN_EASY_PAY')}
          >
            해외간편결제
          </button>
        </div>
        <button className='button' onClick={() => requestPayment()}>
          결제하기
        </button>
      </div>
      <div className='box_section'>
        <h1 className='text-4xl font-semibold'>정기 결제</h1>
        <button className='button' onClick={() => requestBillingAuth()}>
          빌링키 발급하기
        </button>
      </div>
    </div>
  );
}

function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}

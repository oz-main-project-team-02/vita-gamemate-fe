import { CoinPackage } from '@/config/const';
import { useUserStore } from '@/config/store';
import { loadTossPayments, TossPaymentsPayment } from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';
import { BiCreditCard, BiGlobe, BiWallet } from 'react-icons/bi';
import { CgSmartphone } from 'react-icons/cg';
import { GiBanknote, GiFoxTail } from 'react-icons/gi';
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

  const paymentMethods = [
    { id: 'CARD', name: '카드', icon: BiCreditCard },
    { id: 'TRANSFER', name: '계좌이체', icon: GiBanknote },
    { id: 'VIRTUAL_ACCOUNT', name: '가상계좌', icon: BiWallet },
    { id: 'MOBILE_PHONE', name: '휴대폰', icon: CgSmartphone },
    { id: 'CULTURE_GIFT_CERTIFICATE', name: '문화상품권', icon: GiFoxTail },
    { id: 'FOREIGN_EASY_PAY', name: '해외간편결제', icon: BiGlobe },
  ];

  return (
    <div className='mx-auto px-4 py-8'>
      <div className='mx-auto w-full max-w-2xl rounded-lg border bg-white p-6 shadow-lg'>
        <div className='mb-6'>
          <h2 className='mb-2 text-2xl font-bold'>결제 선택</h2>
          <p className='text-gray-600'>원하시는 결제 방법을 선택해주세요.</p>
        </div>
        <div className='mb-6 grid grid-cols-2 gap-4 md:grid-cols-3'>
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              className={`flex h-24 flex-col items-center justify-center rounded-lg border p-4 transition hover:bg-gray-100 ${
                selectedPaymentMethod === method.id ? 'bg-gray-200' : 'bg-white'
              }`}
              onClick={() => setSelectedPaymentMethod(method.id as PaymentMethod)}
            >
              <method.icon className='mb-2 h-6 w-6' />
              <span>{method.name}</span>
            </button>
          ))}
        </div>
        <div className='mb-6 text-center'>
          <p className='text-2xl font-bold'>{coinData.discountPrice.toLocaleString()}원</p>
          <p className='text-sm text-gray-500'>{coinData.coin} 코인</p>
        </div>
        <button
          className='w-full rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700'
          onClick={requestPayment}
          disabled={!selectedPaymentMethod}
        >
          결제하기
        </button>
        <div className='mt-4 flex justify-center'>
          <button className='rounded-lg border px-4 py-2 transition hover:bg-gray-100' onClick={requestBillingAuth}>
            정기 결제 설정
          </button>
        </div>
      </div>
    </div>
  );
}

function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}

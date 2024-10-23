import { useEffect, useState } from 'react';
import { loadTossPayments, ANONYMOUS, TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk';
import { useLocation, useNavigate } from 'react-router-dom';
import { CoinPackage } from '@/config/const';
import { useUserStore } from '@/config/store';

const generateRandomString = (): string => window.btoa(Math.random().toString()).slice(0, 20);
const clientKey = import.meta.env.VITE_TOSS_TEST_CLIENTKEY;

export function CheckoutPage() {
  const { user } = useUserStore();
  const [ready, setReady] = useState<boolean>(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const location = useLocation();
  const { coinData }: { coinData: CoinPackage } = location.state || {};
  console.log(coinData);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, [clientKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }

      /**
       * 위젯의 결제금액을 결제하려는 금액으로 초기화하세요.
       * renderPaymentMethods, renderAgreement, requestPayment 보다 반드시 선행되어야 합니다.
       * @docs https://docs.tosspayments.com/sdk/v2/js#widgetssetamount
       */
      await widgets.setAmount({ currency: 'KRW', value: coinData.discountPrice });

      await Promise.all([
        /**
         * 결제창을 렌더링합니다.
         * @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderpaymentmethods
         */
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          // 렌더링하고 싶은 결제 UI의 variantKey
          // 결제 수단 및 스타일이 다른 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
          // @docs https://docs.tosspayments.com/guides/v2/payment-widget/admin#새로운-결제-ui-추가하기
          variantKey: 'DEFAULT',
        }),
        /**
         * 약관을 렌더링합니다.
         * @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
         */
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  return (
    <div className='wrapper w-100'>
      <div className='max-w-540 w-100'>
        <div id='payment-method' className='w-100' />
        <div id='agreement' className='w-100' />
        <div className='btn-wrapper w-100'>
          {ready && (
            <button
              className='btn primary w-100'
              onClick={async () => {
                try {
                  /**
                   * 결제 요청
                   * 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                   * 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                   * @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrequestpayment
                   */
                  await widgets?.requestPayment({
                    orderId: `${user.id}-${generateRandomString()}`,
                    orderName: `비타코인 ${coinData.coin}개 구매`,
                    customerName: `${user.nickname}님`,
                    customerEmail: `${user.email}`,
                    successUrl: `${window.location.origin}/payment/success?${window.location.search}&coin=${coinData.coin}`,
                    failUrl: window.location.origin + '/payment/fail' + window.location.search,
                  });
                } catch (error) {
                  // TODO: 에러 처리
                  console.error(error);
                  navigate('/', { replace: true });
                  alert('결제 요청 중 오류가 발생했습니다.');
                }
              }}
            >
              결제하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

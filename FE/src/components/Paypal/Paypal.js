"use client";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import _ from "lodash";

const style = { layout: "vertical" };

const ButtonWrapper = ({ items, currency, showSpinner, paymentSuccess }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  const [amount, setAmount] = useState(0);
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  useEffect(() => {
    let newItems = _.cloneDeep(items);

    let newAmount = 0;

    newItems.forEach((item) => {
      item.unit_amount.value = Math.round(item.unit_amount.value / 25000);
      newAmount += item.unit_amount.value * item.quantity;
    });

    setAmount(newAmount);
    setOrderDetail(newItems);
  }, [items]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner"></div>}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={undefined}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                    breakdown: {
                      item_total: {
                        currency_code: currency,
                        value: amount,
                      },
                    },
                  },
                  items: orderDetail,
                },
              ],
            })
            .then((orderId) => orderId)
        }
        onApprove={(data, actions) =>
          actions.order.capture().then(async (response) => {
            if (response.status === "COMPLETED") {
              paymentSuccess(response);
            }
          })
        }
      ></PayPalButtons>
    </>
  );
};

const Paypal = ({ items, currency, paymentSuccess }) => {
  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          components: "buttons",
          currency: currency,
        }}
      >
        <ButtonWrapper
          showSpinner={false}
          currency={currency}
          items={items}
          paymentSuccess={paymentSuccess}
        ></ButtonWrapper>
      </PayPalScriptProvider>
    </div>
  );
};

export default Paypal;

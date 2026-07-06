import CheckoutSteps from "@/components/CheckoutSteps";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { savePaymentMethod } from "@/redux/slices/cartSlice";
import type { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cart = useSelector((state: RootState) => state.cart);

  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submaitHandler = () => {
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };

  return (
    <div className="flex flex-col items-center justify-center my-4">
      <CheckoutSteps step1 step2 step3 />
      <Card className="max-w-sm w-full my-4">
        <CardHeader>
          <h1 className="text-2xl font-medium">Payment Metgod</h1>
          <CardTitle className="opacity-60">Select Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one" className="opacity-70">
                Option One
              </Label>
            </div>
          </RadioGroup>
          <Button>Continue</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentScreen;

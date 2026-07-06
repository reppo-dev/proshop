import { Link } from "react-router-dom";

type CheckoutStepsProps = {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
};

const CheckoutSteps = ({ step1, step2, step3, step4 }: CheckoutStepsProps) => {
  return (
    <nav className="flex text-sm my-2 gap-4">
      <div>
        {step1 ? (
          <Link to="/login">Sign In</Link>
        ) : (
          <span className="opacity-55">Sign In</span>
        )}
      </div>
      <div>
        {step2 ? (
          <Link to="/shipping">
            <p>Shipping</p>
          </Link>
        ) : (
          <span className="opacity-55">Shipping</span>
        )}
      </div>
      <div>
        {step3 ? (
          <Link to="/payment">
            <p>Payment</p>
          </Link>
        ) : (
          <span className="opacity-55">Payment</span>
        )}
      </div>
      <div>
        {step4 ? (
          <Link to="/placeorder">
            <p>Place Order</p>
          </Link>
        ) : (
          <span className="opacity-55">Place Order</span>
        )}
      </div>
    </nav>
  );
};

export default CheckoutSteps;

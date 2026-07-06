import { useLogoutMutation } from "@/redux/slices/userApiSlice";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "sonner";

const ButtonLogout = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [logoutApi] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return <Button onClick={() => logoutHandler}>ButtonLogout</Button>;
};

export default ButtonLogout;

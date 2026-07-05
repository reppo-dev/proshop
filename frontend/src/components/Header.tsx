import { BaggageClaim, CircleUser, User } from "lucide-react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

const Header = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  return (
    <>
      <header>
        <nav className=" bg-gray-300 rounded-b-lg">
          <div className="flex items-center h-16 justify-between mx-4 ">
            <div className="flex items-center justify-center m-0 p-0 gap-0">
              <img src="../public/proshop.png" className="w-12 h-12" alt="" />
              <p className="font-bold">ProShop</p>
            </div>
            <div className="hidden md:flex gap-4">
              <Link to="/cart">
                <Button className="flex">
                  <BaggageClaim />
                  Cart
                  {items.length > 0 && (
                    <Badge variant="default" className="">
                      {items.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Button className="flex">
                <CircleUser />
                sign in
              </Button>
              <Button className="flex" variant={"outline"}>
                <User />
                sign up
              </Button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

import { BaggageClaim, CircleUser, PersonStanding, User } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <>
      <header>
        <nav className=" bg-gray-300 rounded-b-lg">
          <div className="flex items-center h-16 justify-between mx-4 ">
            <div className="flex items-center justify-center m-0 p-0 gap-0">
              <img src="../public/proshop.png" className="w-12 h-12" alt="" />
              <p className="font-bold">ProShop</p>
            </div>
            <div className="flex gap-4">
              <Button className="flex">
                <BaggageClaim />
                Cart
              </Button>
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

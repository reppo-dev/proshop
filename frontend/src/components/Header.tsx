import { BaggageClaim, CircleUser, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ButtonLogout from "./ButtonLogout";

const Header = () => {
  const { items } = useSelector((state: RootState) => state.cart);

  const { userInfo } = useSelector((state: RootState) => state.auth);

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
              {userInfo ? (
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Link to="/">Home</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <ButtonLogout />
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="hidden md:flex gap-4">
                  <Link to="/login">
                    <Button className="flex">
                      <CircleUser />
                      sign in
                    </Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button
                      className="flex"
                      onClick={() => localStorage.clear()}
                      variant={"outline"}
                    >
                      <User />
                      sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "./shared/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/types";
import { logoutUser } from "../store/user.slice";
import { logout } from "../http/auth";
import { clearCart } from "../store/cart.slice";
import { LogOut, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state?.auth.user);
  const isUserLoggedIn = Boolean(user != null && user != undefined);
  const cart = useSelector((state: RootState) => state.cart.cart);

  const handleLogoutClick = async () => {
    try {
      await logout();
      dispatch(logoutUser());
      dispatch(clearCart());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-amber-200 min-h-[70px] flex items-center">
      <div className="flex flex-row w-full justify-between px-4 items-center">
        <div className="left">
          <div className="app-logo text-2xl text-gray-800 font-bold font-sans">
            <Link to="/">Quick Commerce</Link>
          </div>
        </div>
        <div className="right flex items-center gap-4">
          {location.pathname === "/login" && (
            <Link to="/signup" tabIndex={-1}>
              <Button className="cursor-pointer" variant="primary">
                Signup
              </Button>
            </Link>
          )}
          {location.pathname === "/signup" && (
            <Link to="/login" tabIndex={-1}>
              <Button className="cursor-pointer" variant="primary">
                Login
              </Button>
            </Link>
          )}
          {isUserLoggedIn && (
            <div className="flex items-center gap-4">
              {user && user.role != "ROLE_ADMIN" &&  <Link to="/cart" className="relative">
                <Button variant="outline" icon={<ShoppingCart size={20} />}>
                  {cart && cart?.cartItems?.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cart.cartItems.length}
                    </span>
                  )}
                </Button>
              </Link>}
              <Button variant="outline" icon={ <LogOut size={20} />} onClick={handleLogoutClick}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

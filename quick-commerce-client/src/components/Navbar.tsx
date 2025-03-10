import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "./shared/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/types";
import { logoutUser } from "../store/user.slice"
import { logout } from "../http/auth";
import { clearCart } from "../store/cart.slice";
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
      dispatch(clearCart())
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <nav className="bg-amber-200 min-h-[70px] flex items-center">
      <div className="flex flex-row w-full justify-between px-4 items-center">
        <div className="left">
          <div className="app-logo text-2xl text-gray-800 font-bold font-sans">
            <Link to="/">Quick Commerce</Link>
          </div>
        </div>
        <div className="right">
          <div>
            {location.pathname === "/login" && (
              <Link to="/signup" tabIndex={-1}>
                <Button className="cursor-pointer" variant="primary" >
                  Signup
                </Button>
              </Link>
            )}
            {location.pathname === "/signup" && (
              <Link to="/login" tabIndex={-1}>
                <Button className="cursor-pointer" variant="primary" >
                  Login
                </Button>
              </Link>
            )}

            {isUserLoggedIn &&
              <div className="flex flex-row gap-2 items-center justify-between">
                <Button variant="outline" onClick={handleLogoutClick}>
                  Logout
                </Button>
                <div>Cart : {cart === null ? 0 : cart?.cartItems?.length}</div>
              </div>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

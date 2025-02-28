import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "./shared/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/types";
import { logoutUser } from "../store/user.slice"
import { logout } from "../http/auth";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state?.auth.user);
  const isUserLoggedIn = Boolean(user != null && user != undefined);
  console.log("user", user, isUserLoggedIn);

  const handleLogoutClick = async () => {
    try {
      await logout();
      dispatch(logoutUser());
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

            {isUserLoggedIn && <Button variant="outline" onClick={handleLogoutClick}>
              Logout
            </Button>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

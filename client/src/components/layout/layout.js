import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { Link, Outlet } from "react-router-dom";
import Button from "../ui/button";

function Layout() {

  const isAuth = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const Logout = () => {
      localStorage.removeItem("token");
      dispatch(authActions.logout());
  };
    return (
        <div className="bg-blue-400 m-0 h-screen w-screen">
            <div className="flex justify-between bg-blue-950 p-4 px-12 items-center">
                <Link to="/">
                    <div className="text-white text-4xl">XENONSTACK</div>
                </Link>
                <div>
                    {!isAuth && (
                        <div>
                            <Link to="login">
                                <Button text="Login" />
                            </Link>
                            <Link to="signup">
                                <Button text="Signup" />
                            </Link>
                        </div>
                    )}
                    {isAuth && (
                        <div>
                            <Link to="contact">
                                <Button text="Contact" />
                            </Link>
                            <Button text="Logout" onClickHandler={Logout} />
                        </div>
                    )}
                </div>
            </div>
            <div className="px-12 mt-6 flex flex-col justify-center items-center">
              <Outlet />
            </div>
        </div>
    );
}

export default Layout;

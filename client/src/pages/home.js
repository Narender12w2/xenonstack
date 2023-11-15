import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../components/ui/button";
function Home() {
    const isAuth = useSelector(
        (state) => state.auth.isAuthenticated
    );
    const [user, setUser] = useState();
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        } else if (token === null || token === undefined) {
            setToken(localStorage.getItem("token"));
        } else {
            const getUser = async () => {
                try {
                    const res = (await axios.get(`${process.env.REACT_APP_SERVER_URL}/user`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }));
                    const userData = {
                        email: res.data.user.email,
                        name: res.data.user.name,
                        id: res.data.user._id,
                    };
                    setUser(() => userData);
                } catch (error) {
                    console.log(error);
                }
            };
            getUser();
        }
    }, [isAuth, navigate, token, user]);
    return (
        <>
            {user && (
                <div className="text-center">
                    <p className="text-3xl">
                        Hello {user.name}! <br /> Welcome to XENONSTACK
                    </p>
                    <p className="text-2xl mt-6">Want to register a request?</p>
                    <Link to="/contact" className="w-full">
                        <Button className="w-full bg-blue-800" text="Click here to fill the form" />
                    </Link>
                </div>
            )}
        </>
    );
}

export default Home;

import React, { useEffect, useReducer, useState } from "react";
import Input from "../components/ui/inputs/input";
import { z } from "zod";
import { initialValue, inputReducer } from "../reducers/InputReducer";
import Button from "../components/ui/button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
function Login() {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const [email, dispatchEmail] = useReducer(inputReducer, initialValue);
    const [password, dispatchPassword] = useReducer(inputReducer, initialValue);
    const [token, setToken] = useState();
    const [error, setErrorMessage] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            navigate("/");
        } else if (token!==undefined) {
            localStorage.setItem("token", token);
            dispatch(authActions.login());
        }
    }, [isAuth, navigate, token, dispatch]);
    const onClickHandler = async () => {
        if (email && password) {
            try {
                const user = await axios.post(
                    `${process.env.REACT_APP_SERVER_URL}/auth/login`,
                    {
                        email: email.value,
                        password: password.value,
                    }
                );
                setErrorMessage(undefined)
                if(user)
                    setToken(user.data);
                else {
                    setErrorMessage("There was some error fetching your request! Please try after some time")
                }
            } catch (err) {
                setErrorMessage((err).response.data);
            }
        }
    };
    return (
        <form
            className="max-w-md flex flex-col items-center"
            onClick={(event) => event.preventDefault()}
        >
            <div className="text-3xl">Login to enter XENONSTACK</div>
            <Input
                placeholder="Email"
                type="email"
                id="email"
                isValid={email.isValid || !email.isTouched}
                value={email.value}
                className="bg-transparent"
                dispatchInput={dispatchEmail}
                validationChecker={z.string().email().safeParse}
            />
            <Input
                placeholder="Password"
                type="password"
                id="password"
                isValid={password.isValid || !password.isTouched}
                value={password.value}
                className="bg-transparent"
                dispatchInput={dispatchPassword}
                validationChecker={z.string().min(8).safeParse}
            />
            <Button
                className="w-full"
                text="Login"
                onClickHandler={onClickHandler}
            />
            {error && <p className="capitalize text-red-500">{error}</p>}
            <p className="text-xl mt-4">Don't have an account?</p>
            <Link to="/signup" className="w-full">
                <Button
                    className="w-full bg-blue-800"
                    text="Signup"
                />
            </Link>
        </form>
    );
}

export default Login;

import React, { useEffect, useReducer, useState } from "react";
import Input from "../components/ui/inputs/input";
import { z } from "zod";
import { initialValue, inputReducer } from "../reducers/InputReducer";
import Button from "../components/ui/button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";

function Signup() {
    const isAuth = useSelector((state) => state.isAuthenticated);
    const dispatch = useDispatch();
    const [email, dispatchEmail] = useReducer(inputReducer, initialValue);
    const [name, dispatchName] = useReducer(inputReducer, initialValue);
    const [password, dispatchPassword] = useReducer(inputReducer, initialValue);
    const [token, setToken] = useState();
    const [error, setErrorMessage] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            navigate("/");
        } else if (token !== undefined) {
            localStorage.setItem("token", token);
            dispatch(authActions.login());
            navigate("/");
        }
    }, [isAuth, navigate, token, dispatch]);
    const onClickHandler = async () => {
        try {
            if (email && password) {
                const user = await axios.post(
                    `${process.env.REACT_APP_SERVER_URL}/auth/signup`,
                    {
                        email: email.value,
                        password: password.value,
                        name: name.value,
                    }
                );
                setToken(user.data);
            }
        } catch (err) {
            setErrorMessage((err).response.data);
        }
    };
    return (
        <form
            className="max-w-md flex flex-col items-center"
            onClick={(event) => event.preventDefault()}
        >
            <div className="text-3xl">Signup to enter XENONSTACK</div>

            <Input
                placeholder="Name"
                type="name"
                isValid={name.isValid || !name.isTouched}
                value={name.value}
                className="bg-transparent"
                dispatchInput={dispatchName}
                validationChecker={z.string().min(1).safeParse}
            />
            <Input
                placeholder="Email"
                type="email"
                isValid={email.isValid || !email.isTouched}
                value={email.value}
                className="bg-transparent"
                dispatchInput={dispatchEmail}
                validationChecker={z.string().email().safeParse}
            />

            <Input
                placeholder="Password"
                type="password"
                isValid={password.isValid || !password.isTouched}
                value={password.value}
                className="bg-transparent"
                dispatchInput={dispatchPassword}
                validationChecker={z.string().min(8).safeParse}
            />
            <Button text="Signup" className="w-full" onClickHandler={onClickHandler} />
            {error && <p className="capitalize text-red-500">{error}</p>}
            <p className="text-xl mt-4">Already have an account?</p>
            <Link to="/login" className="w-full">
                <Button
                    className="w-full bg-blue-800"
                    text="Login"
                />
            </Link>
        </form>
    );
}

export default Signup;

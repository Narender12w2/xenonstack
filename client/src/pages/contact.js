import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../components/ui/button";
import Input from "../components/ui/inputs/input";
import TextArea from "../components/ui/inputs/textarea";
import { initialValue, inputReducer } from "../reducers/InputReducer";
import axios from "axios";
function Contact() {
    const isAuth = useSelector(
        (state) => state.auth.isAuthenticated
    );
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        } else if (token === null || token === undefined) {
          setToken(localStorage.getItem("token"));
      } 
    }, [isAuth,navigate,token]);
    const [subject, dispatchSubject] = useReducer(inputReducer, initialValue);
    const [message, setMessage] = useState(null);
    const onClickHandler = async () => {
      if (message && subject && token) {
          const resp = await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/user/message`,
              {
                  subject: subject.value,
                  message: message,
              },
              {
                  headers: { Authorization: `Bearer ${token}` },
              }
          );
          console.log(resp);
      }
  };
    return (
        <>
            <form
                className="max-w-md flex flex-col items-center w-full"
                onClick={(event) => event.preventDefault()}
            >
                <Input
                    placeholder="Subject"
                    type="text"
                    id="subject"
                    value={subject.value}
                    isValid={true}
                    dispatchInput={dispatchSubject}
                    className="bg-transparent"
                />
                <TextArea
                    placeholder="Message"
                    id="message"
                    value={message??""}
                    onChangeHandler={(event)=>setMessage(event.target.value)}
                    className="bg-transparent h-60"
                />
                <Button
                    className="w-full"
                    text="Submit Form"
                    onClickHandler={onClickHandler}
                />
            </form>
        </>
    );
}

export default Contact;

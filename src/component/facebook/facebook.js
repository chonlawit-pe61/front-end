import React from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import './style.css'
const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleClick = () => {
        axios.post("http://localhost:9000/api/signin/facebook")
            .then((response) => {
                // console.log(response.data);
                dispatch({
                    type: "FACEBOOK_LOGIN",
                    payload: response.data
                })
                localStorage.setItem('userFacebook', JSON.stringify(response.data));
                history.push("/ShowData");
            }).catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className="container">
            <div className="center">
                <FacebookLogin
                    appId="254903286384913"
                    fields="name,email,picture"
                    callback={handleClick}
                />
            </div>
        </div>
    )
}

export default App

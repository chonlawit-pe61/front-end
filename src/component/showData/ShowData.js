import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect, Route } from 'react-router';
import { useHistory } from 'react-router-dom';
import ComponentCrud from '../crud/curd'
var dataFacebook = {
    id: '',
    email: '',
    first_name: '',
    last_name: '',
    picture: {
        data: { url: '' }
    },
    token: '',
}
function ShowData(posts) {
    const history = useHistory();
    const [isLogin, setIsLogin] = useState(true);
    if (localStorage.getItem('userFacebook') != null) {
        dataFacebook = JSON.parse(localStorage.getItem('userFacebook'));
    }

    const vertify = async () => {
        if (localStorage.getItem('userFacebook') != null) {
            const token = JSON.parse(localStorage.getItem('userFacebook')).token;
            const resault = await axios.get('http://localhost:9000/api/vertify',
                {
                    headers:
                    {
                        "authorization": `Bearer ${token}`
                    }
                })
            return resault.data.success;
        }
    }
    const deleteData = () => {
        localStorage.removeItem('userFacebook');
        history.push('/');
    }
    useEffect(() => {
        async function fetchMyAPI() {
            var result = await vertify();
            setIsLogin(result);
        }
        fetchMyAPI()
    }, [])

    return (
        <Route>
            {!isLogin ? <Redirect to="/" />
                :
                (
                    <div className="container">
                        <img src={dataFacebook.picture.data.url} className="rounded mx-auto d-block mt-5" alt="imageFacebookID" /><br />
                        <p className="text-center">ID = {dataFacebook.id}</p>
                        <p className="text-center">Email = {dataFacebook.email}</p>
                        <p className="text-center">Name = {dataFacebook.first_name} {dataFacebook.last_name}</p>
                        <div className="col text-center">
                            <button onClick={deleteData} type="button" className="btn btn-danger ">ออกจากระบบ</button>
                        </div>
                        <ComponentCrud />
                    </div>
                )
            }
        </Route>
    )
}
const mapStateToProps = (state) => {
    return {
        posts: state
    }
}
export default connect(mapStateToProps)(ShowData)
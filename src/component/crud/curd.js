import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'
var initialstate = {
    firstname: '',
    lastname: '',
}
export default function Curd() {

    const [user, setUser] = useState(initialstate);
    const [dataUserList, setDataUserList] = useState([]);
    const [newUser, setNewUser] = useState(initialstate);

    const GetData = async () => {
        await axios.get('http://localhost:9000/api/user')
            .then(res => {
                console.log(res.data);
                setDataUserList(res.data);
            })
    }
    const addUser = async (e) => {
        e.preventDefault();
        if (user.name !== "" & user.lastname !== "") {
            await axios.post("http://localhost:9000/api/create", {
                first_name: user.firstname,
                last_name: user.lastname,
            })
                .then((response) => {
                    setUser(initialstate);
                    GetData();
                });
        }
    };
    const updateUser = (_id) => {
        if (newUser.name !== "" & newUser.lastname !== "") {
            axios.put(`http://localhost:9000/api/update/${_id}`, {
                first_name: newUser.firstname,
                last_name: newUser.lastname,
            })
                .then((response) => {
                    setNewUser(initialstate);
                    GetData();
                });
        }
    };
    const deleteUser = (_id) => {
        axios.delete(`http://localhost:9000/api/delete/${_id}`)
            .then((response) => {
                setDataUserList(
                    dataUserList.filter((val) => {
                        return val._id !== _id;
                    })
                );
            });
    };
    useEffect(() => {
          GetData();
    },[])
    return (
        <div className="App container">
            <div className="mt-5" align="center ">
            </div>
            <h1 className="text-center mt-5">Welcome to React</h1>
            <div align="center">
            </div>
            <div className="information">
                <form action="">
                    <label className="text-start form-label" htmlFor="name">
                        Name:
                    </label>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Frist name"
                            value={user.firstname}
                            onChange={(event) => {
                                setUser({ ...user, firstname: event.target.value });
                            }}
                            required />
                    </div>
                    <div className="mt-3">
                        <label className="text-start form-label" htmlFor="name">
                            Last name:
                        </label>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                                value={user.lastname}
                                onChange={(event) => {
                                    setUser({ ...user, lastname: event.target.value });
                                }}
                                required />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary" onClick={addUser}>
                                กรอกข้อมูล
                            </button>
                            <div className="">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Firstname</th>
                                            <th scope="col">Lastname</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataUserList.map((val, key) => (

                                            <tr key={key.toString()}>
                                                <td>{key + 1}</td>
                                                <td>{val.first_name}</td>
                                                <td>{val.last_name}</td>
                                                <td>
                                                    <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={"#exampleModal" + val._id}>เเก้ไข</button>
                                                    <button type="button" className="btn btn-danger" onClick={() => { deleteUser(val._id) }}>ลบ</button>

                                                    <div className="modal fade" id={"exampleModal" + val._id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id="exampleModalLabel">ID:{key + 1}</h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <label className="text-start form-label" htmlFor="name">
                                                                        Name
                                                                    </label>
                                                                    <div className="mb-3">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Name"
                                                                            value={newUser.firstname}
                                                                            onChange={(event) => {
                                                                                setNewUser({ ...newUser, firstname: event.target.value });
                                                                            }}
                                                                            required />
                                                                    </div>
                                                                    <label className="text-start form-label" htmlFor="name">
                                                                        Lastname
                                                                    </label>
                                                                    <div className="mb-3">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Lastname"
                                                                            value={newUser.lastname}
                                                                            onChange={(event) => {
                                                                                setNewUser({ ...newUser, lastname: event.target.value });
                                                                            }}
                                                                            required />
                                                                    </div>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { updateUser(val._id) }}>บันทึก</button>
                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </td>
                                            </tr>


                                        ))}

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

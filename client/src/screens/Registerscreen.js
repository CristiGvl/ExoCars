import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Succes from "../components/Succes";

function Registersceen() {

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');
    const [success, setsucces] = useState('');

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();



    async function register() {
        if (password === cpassword) {
            const user = {
                name,
                email,
                password,
                cpassword
            }
            try {
                setloading(true);
                const result = (await axios.post('api/users/register', user)).data
                setloading(false);
                setsucces(true)

                setname('')
                setemail('')
                setpassword('')
                setcpassword('')
                window.location.href = '/login'

            } catch (error) {
                console.log(error);
                setloading(false);
                seterror(true)


            }
        }
        else
            alert('Password does not match')
    }


    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error />)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                {success && (<Succes message='Registration succes' />)}
                    <div className="box-shadow">
                        <h2>Register</h2>
                        <input type="text" className="form-control" placeholder="name"
                            value={name} onChange={(e) => { setname(e.target.value) }} />
                        <input type="text" className="form-control" placeholder="email"
                            value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="text" className="form-control" placeholder="password"
                            value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        <input type="text" className="form-control" placeholder="confirm password"
                            value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />

                        <button className="btn btn-primary mt-3" onClick={register}>Register</button>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Registersceen
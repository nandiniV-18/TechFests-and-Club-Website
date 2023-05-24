import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Loader from '../components/Loader';
import Error from '../components/Error';

function Loginscreen() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [loading, setloading] = useState();
    const [error, seterror] = useState();
  
    async function Login() {

        const user = {
            email,
            password
        }
        try {
            setloading(true);
            const result=(await axios.post('./api/users/login',user)).data
            setloading(false);

            localStorage.setItem('currentUser',JSON.stringify(result));
            window.location.href='/'


          } catch (error) {
            console.log(error.response.data)
            setloading(false);
            seterror(true);
          }

    }
    return (


        <div>
            {loading && (<Loader/>)}

            <div className='row justify-content-center mt-5'>
                <div className='col-md-5 mt-5'>

                    {error && (<Error message='Invalid Credentials' />)}


                    <div className='bs'>
                        <h2>Login</h2>
                        <input type="text" className='form-control m-2' placeholder="email"
                            value={email}
                            onChange={
                                (e) => {
                                    setemail(e.target.value)
                                }
                            }/>
                        <input type="text" className='form-control m-2' placeholder="password"
                            value={password}
                            onChange={
                                (e) => {
                                    setpassword(e.target.value)
                                }
                            }/>
                        <button className='btn btn-primary mt-3'
                            onClick={Login}>Login</button>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Loginscreen

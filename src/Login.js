import React, { useState } from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBIcon
}
from 'mdb-react-ui-kit';
import './Login.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [state, setState] = useState({})
 const navigate=useNavigate()
    const inputChange = (event) => {
        const { name, value } = event.target
        setState({ ...state, [name]: value })
    }
     const submit = ()=>{
        console.log(state);
        axios.post('http://127.0.0.1:8000/api/LoginUserAPIView',state).then((response)=>{
            console.log(response.data.message);
      localStorage.setItem('log_id', response.data.data.login_id)
      localStorage.setItem('reg_id', response.data.data.user_id)
            
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              setTimeout(nav, 500)
      function nav() {
        navigate('userprofile')
        window.location.reload()
      }
        }).catch((error)=>{
            console.log(error);
            toast.error(error.response.data.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
        })
     }

function loginform(){
  document.getElementById('logDiv').className='loginDiv';
}

    return (
        <div className='main'>
            <ToastContainer/>

            <MDBContainer fluid className='p-4 minDiv background-radial-gradient overflow-hidden'>

                <MDBRow>

                    <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                        <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
                            The best g <br />
                            <span style={{ color: 'hsl(218, 81%, 75%)' }}>for your Profile</span>
                        </h1>

                        <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                            quibusdam tempora at cupiditate quis eum maiores libero
                            veritatis? Dicta facilis sint aliquid ipsum atque?
                        </p>
                        <button className='btn-kogin m-3 btn btn-light' onClick={loginform}>LOGIN</button>

                    </MDBCol>
                    

                    <MDBCol md='6' className='position-relative'>

                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                         <div className='log-hide-Div' id='logDiv'>
                        <MDBCard className='my-5 bg-glass'>
                            <MDBCardBody className='p-5'>

                                <MDBRow>
                                    <h3 className='text-center mb-4'>LOGIN </h3>
                                    {/* <MDBCol col='6'>
                                        <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text' />
                                    </MDBCol>

                                    <MDBCol col='6'>
                                        <MDBInput wrapperClass='mb-4' label='Last name' id='form2' type='text' />
                                    </MDBCol> */}
                                </MDBRow>

                                <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' name='email' onChange={inputChange} />
                                <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' name='password' onChange={inputChange} />

                                <div className='d-flex justify-content-center mb-4'>
                                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                                </div>

                                <MDBBtn className='btn-width  mb-4' size='md' onClick={submit}>LOGIN</MDBBtn>
                                <MDBBtn className='btn-width ml-2 mb-4' size='md' href='reg'>SIGN UP</MDBBtn>

                            </MDBCardBody>
                        </MDBCard>
                        </div>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>

        </div>
    )
}

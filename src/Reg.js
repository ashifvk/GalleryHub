import React, { useState } from 'react'
import './Register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Reg() {
    const navigate = useNavigate()

    const [state, setState] = useState({})

    const inputChange = (event) => {
        const { name, value } = event.target
        setState({ ...state, [name]: value })
    }
    const imageGet = (event) => {
        const image = event.target.files[0]
        setState({ ...state, 'image': image })
    }

    const validateEmail = (email) => {
        // Regular expression for email validation
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        console.log(validRegex.test(email));
        return validRegex.test(email);
    };

    const validateName = (name) => {
        // Regular expression for email validation
        const validRegex = /^([A-Za-z]+)$/;
        console.log(validRegex.test(name));
        return validRegex.test(name);
    };   
    
    const validateContact = (contact) => {
        // Regular expression for email validation
        const validRegex = /^\d{10}$/;
        console.log(validRegex.test(contact));
        return validRegex.test(contact);
    }; 
    const validatePassword = (password) => {
        // Regular expression for email validation
        const validRegex = /^(.{8,})$/;
        console.log(validRegex.test(password));
        return validRegex.test(password);
    }; 



    const submit = (event) => {
        event.preventDefault()

          // Check for empty fields
          if (!state.name || !state.email || !state.contact || !state.password || !state.image ){
            toast.error('Empty field!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }


        if (!validateName(state.name)) {
            toast.error('Invalid or error Name!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }

        if (!validateContact(state.contact)) {
            toast.error('Invalid Number contain  min 10 numbers!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }


        if (!validateEmail(state.email)) {
            toast.error('Invalid email ,contain  example@gmail.com format!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }


        if (!validatePassword(state.password)) {
            toast.error('Invalid ! ,Password contain min 8 length!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }

        toast.dismiss();

      



        console.log(state);
        const data = new FormData()
        data.append('image', state.image)
        data.append('name', state.name)
        data.append('contact', state.contact)
        data.append('email', state.email)
        data.append('password', state.password)
        console.log(data);
        axios.post('http://127.0.0.1:8000/api/registerApi', data).then((response) => {
            console.log(response.data);
            window.alert('suuccess')
            navigate('/')
            // setTimeout(nav,1000)
            //     function nav() {
            // navigate('/')

            //     }

        }).catch((error) => {
            console.log(error);
            toast.error(error.response.data.message, {
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

    return (
        <div>
            <div>
                <ToastContainer />
                <div className='mai'>
                    <div className='bor'>
                        <h2 class="heading text-white text-center me">SIGN <span>UP!</span></h2>

                        <div className='dis'>
                            <label className='text-white' >DISPLAY PICTURE</label>
                            <input type='file' name='image' onChange={imageGet}  ></input>
                            <label className='text-white' >YOUR NAME</label>
                            <input type='text' name='name' onChange={inputChange}  ></input>
                            <label className='text-white' >CONTACT</label>
                            <input type='tel' name='contact' onChange={inputChange}  ></input>
                            <label className='text-white'>EMAIL</label>
                            <input type='text' name='email' onChange={inputChange}  ></input>
                            <label className='text-white'>PASSWORD</label>
                            <input type='password' name='password' onChange={inputChange} ></input>
                            <a href='/' ><i class="bi bi-box-arrow-up-right mr-2" ></i>Back to home</a>
                            <button className='bv' onClick={submit} >SEND</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

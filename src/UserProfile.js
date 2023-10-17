import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBFile, MDBInput } from 'mdb-react-ui-kit';
import './UserProfile.css'
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
    const log_id = localStorage.getItem('log_id')
    // const reg_id = localStorage.getItem('reg_id')
    const [state, setState] = useState({})
    const [len, setLen] = useState({})
    const [GetImage, setGetImage] = useState([])
    const [pic, setPic] = useState({
        'id': log_id,

    })
    const [user_id, setuser_id] = useState()
    const [state2, setState2] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/GetalluserDetails').then((response) => {
            setLen(response.data.data.length);

        }).catch((error) => {
            console.log(error);
        })
    }, [])
    console.log(len)




    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/getsingleuserview/${log_id}`).then((response) => {
            console.log(response);
            console.log(response.data.data[0].log_id_id);
            setuser_id(response.data.data[0].log_id_id)
            setState(response.data.data[0])
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/getloginuserview/${log_id}`).then((response) => {
            console.log(response.data.data);
            setState2(response.data.data[0])
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/getallalbum/${log_id}`).then((response) => {
            console.log(response.data.data);
            setGetImage(response.data.data)
        }).catch((error) => {
            console.log(error);
        })
    }, [])



    function editProfile() {
        document.getElementById('editDiv').className = 'viewDiv'
    }
    function addPhoto() {
        document.getElementById('album').className = 'view-album'
    }

    const inputChange = (event) => {
        const { name, value } = event.target
        setState({ ...state, [name]: value })
        console.log(state);


    }
    const imageGet = (event) => {
        const image = event.target.files[0]
        setState({ ...state, 'image': image })
    }

    const albumGet = (event) => {
        const image = event.target.files[0]
        setPic({ ...pic, 'picture': image })
    }



    const uploadAlbum = () => {
        if (pic.picture) {
            console.log(pic);
            const data = new FormData()
            data.append('picture', pic.picture)
            data.append('id', pic.id)
            console.log(data);
            axios.post('http://127.0.0.1:8000/api/addalbumApi', data).then((response) => {
                console.log(response);
                axios.post('http://127.0.0.1:8000/api/mail', data).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                })


            }).catch((error) => {
                console.log(error);
            })

        }


    }

    const inputChange2 = (event) => {
        const { name, value } = event.target
        setState2({ ...state2, [name]: value })

    }
    const submit = () => {
        console.log(state);
        console.log(state2);
        const data = new FormData()
        data.append('image', state.image)
        data.append('name', state.name)
        data.append('contact', state.contact)
        data.append('email', state2.email)
        data.append('password', state2.password)
        console.log(data);
        axios.put(`http://127.0.0.1:8000/api/updateprofile/${log_id}`, data).then((response) => {
            console.log(response.data);

        }).catch((error) => { console.log(error); })

    }
    function closeDiv() {
        document.getElementById('editDiv').className = 'hideDiv'


    }
    function logout() {
        localStorage.clear();
        window.location.href = '/';
    }



    return (
        <div>
            <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="9" xl="7">
                            <MDBCard>
                                <div className=" mb-5 rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                        <MDBCardImage src={`backend/media/${state.image}`}
                                            alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />

                                    </div>
                                    <div className='user'>
                                        <a className="mb-1 h5 a-color" href='userpage' ><i class="bi bi-person-circle"></i> {len - 1}</a>
                                        {/* <MDBCardText className="small text-muted mb-0">users</MDBCardText> */}
                                    </div>
                                    <div className="ms-3" style={{ marginTop: '130px' }}>
                                        <MDBTypography tag="h5">{state.name}</MDBTypography>

                                        {log_id == user_id ?
                                            <MDBBtn className='btn-bootom bt' outline color="light" style={{ height: '36px', overflow: 'visible' }} onClick={editProfile}>
                                                Edit profile
                                            </MDBBtn>
                                            :
                                            <none></none>
                                        }

                                    </div>

                                </div>



                                <div className="p-4 text-black hideDiv" id='editDiv' style={{ backgroundColor: '#f8f9fa' }}>
                                    <div>
                                        <MDBCard className="mb-4">
                                            <MDBCardBody>
                                                <MDBRow>
                                                    <MDBCol sm="3">
                                                        <MDBCardText>Profile Image</MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol sm="9">
                                                        <MDBFile className='file-outline' size='lg' id='ProfileImage' name='image' onChange={imageGet} />
                                                    </MDBCol>
                                                </MDBRow>
                                                <hr />
                                                <MDBRow>
                                                    <MDBCol sm="3">
                                                        <MDBCardText>Full Name</MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol sm="9">
                                                        <input type='text' name='name' className="text-muted input-outline" defaultValue={state.name} onChange={inputChange}></input>
                                                    </MDBCol>
                                                </MDBRow>
                                                <hr />
                                                <MDBRow>
                                                    <MDBCol sm="3">
                                                        <MDBCardText>Phone</MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol sm="9">
                                                        <input type='text' name='contact' className="text-muted input-outline" defaultValue={state.contact} onChange={inputChange}></input>
                                                    </MDBCol>
                                                </MDBRow>
                                                <hr />
                                                <MDBRow>
                                                    <MDBCol sm="3">
                                                        <MDBCardText>Email</MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol sm="9">
                                                        <input type='text' name='email' className="text-muted input-outline" defaultValue={state2.email} onChange={inputChange2}></input>
                                                    </MDBCol>
                                                </MDBRow>
                                                <hr />


                                                <MDBRow>
                                                    <MDBCol sm="3">
                                                        <MDBCardText>Password</MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol sm="9">
                                                        <input type='text' name='password' className="text-muted input-outline" defaultValue={state2.password} onChange={inputChange2}></input>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                        <MDBBtn className='btn-save' outline color="dark" style={{ height: '36px', overflow: 'visible' }} onClick={submit}>
                                            SUBMIT
                                        </MDBBtn>
                                        <MDBBtn className='btn-cancel' outline color="dark" style={{ height: '36px', overflow: 'visible' }} onClick={closeDiv}>
                                            CANCEL
                                        </MDBBtn>
                                    </div>

                                </div>
                                <MDBCardBody className="text-black p-4 mt-5">

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>

                                        <MDBBtn className='btn-bootom ' outline color="dark" style={{ height: '36px', overflow: 'visible' }} onClick={addPhoto}>
                                            Add Photo
                                        </MDBBtn>

                                    </div>
                                    <div className='album-div' id='album'>


                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText> Image Gallery</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBFile className='file-outline' size='lg' id='ProfileImage' name='image' onChange={albumGet} />
                                            </MDBCol>

                                        </MDBRow>

                                        <hr />
                                        <MDBRow>

                                            <MDBCol sm="3">
                                                <MDBBtn className='' outline color="dark" style={{ height: '36px', overflow: 'visible' }} onClick={uploadAlbum}>
                                                    UPLOAD
                                                </MDBBtn>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />


                                    </div>
                                    <MDBRow>
                                        {GetImage?.map((value, key) => (
                                            <div className="col-lg-4 mb-3">
                                                <MDBCardImage src={`backend/media/${value.picture}`}
                                                    alt="image 1" className="w-100 rounded-3" />
                                            </div>

                                        ))}


                                    </MDBRow>


                                    <MDBCardText className="small  mt-2" onClick={logout}> <i class="bi bi-box-arrow-left"></i>  LOGOUT</MDBCardText>

                                </MDBCardBody>

                            </MDBCard>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
            </div>

        </div>


    )
}

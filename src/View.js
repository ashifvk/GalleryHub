import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBFile, MDBInput } from 'mdb-react-ui-kit';
import './View.css'


export default function View() {
    const { log_id } = useParams()
    console.log(log_id);
    const [state, setState] = useState({})
    const [GetImage, setGetImage] = useState([])


    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/getsingleuserview/${log_id}`).then((response) => {
            console.log(response);
            setState(response.data.data[0])
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
    console.log(state);
    return (
        <div>
            <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="9" xl="7">
                            <MDBCard>
                                <div className=" mb-5 rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                        <MDBCardImage src={`../backend/media/${state.image}`}
                                            alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />

                                    </div>

                                    <div className="ms-3" style={{ marginTop: '130px' }}>
                                        <MDBTypography tag="h5">{state.name}</MDBTypography>



                                    </div>

                                </div>



                                <MDBCardBody className="text-black p-4 mt-5">



                                    <MDBRow>
                                        {GetImage?.map((value, key) => (
                                            <div className="col-lg-4 mb-2">
                                                <MDBCardImage src={`../backend/media/${value.picture}`}
                                                    alt="image 1" className="w-100 rounded-3" />
                                            </div>

                                        ))}


                                    </MDBRow>
                                    <div className=''>
                                    <MDBBtn className='btn-cancel' outline color="dark" style={{ height: '36px', overflow: 'visible' }} href='/userpage'>
                                        BACK
                                    </MDBBtn>
                                </div>


                                </MDBCardBody>
                                
                            </MDBCard>

                        </MDBCol>

                    </MDBRow>

                </MDBContainer>
            </div>




        </div>
    )
}

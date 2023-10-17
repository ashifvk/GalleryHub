import React, { useEffect, useState } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './UserPage.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserPage() {
  const local_id = localStorage.getItem('log_id')

  const navigate = useNavigate()

  const [state, setState] = useState([])
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/GetalluserDetails').then((response) => {
      setState(response.data.data);
    }).catch((error) => {
      console.log(error);
    })
  }, [])
  console.log(state);


  const view = (val) => {
    const log_id = val
    console.log(log_id);
    navigate(`/view/${log_id}`)
  }

  return (
    <div className="gradient-custom-2 min-div" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer className="py-5 h-100">

        {state?.map((value, key) => (
          <>
          {local_id!= value.log_id ?
            <div className="d-flex align-items-center mb-4 div-center">
            <div className="flex-shrink-0">
              <MDBCardImage
                style={{ width: '70px' }}
                className="img-fluid rounded-circle border border border-3"
                src={`backend/${value.image}`}
                alt='Generic placeholder image'
                fluid />
            </div>
            <div className="flex-grow-1 ms-3">
              <div className="d-flex flex-row align-items-center mb-2 cut-div">
                <h4 className="mb-0 me-2" style={{ display: 'inline-block' }}>{value.name}</h4>
                <MDBBtn outline color="dark" rounded size="sm" className="mx-1" onClick={() => { view(value.log_id) }}>See profile</MDBBtn>

              </div>
              <div>
              </div>
            </div>
          </div>
          :
          <none></none>
        }
        </>
          

        ))}
        <div className='div-center'>
        <MDBBtn className='btn-cancel' outline color="dark" style={{ height: '36px', overflow: 'visible' }} href='/userprofile'>
          BACK
        </MDBBtn>
        </div>
       
      </MDBContainer>
    </div>
  )
}

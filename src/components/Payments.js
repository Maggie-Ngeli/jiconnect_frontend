import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import APIService from '../APIService';

function Payments() {
    const [applications, setApplications] = useState([]);
    const [appstatus, setAppStatus] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:8004/api/applications/applications/', {
          'method':'GET',
          headers: {
            'Content-Type':'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}` 
          }
        })
        .then(resp => resp.json())
        .then(resp => setApplications(resp))
        .catch(error => console.log(error))
    
    }, [appstatus]);


    function getBase64(file, applicationid) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            APIService.UpdateApplication(applicationid, {
            "id": applicationid,
            "payment": reader.result,
            "app_status": "Payment Settled",
            })
            .then(() => setAppStatus("Payment Settled"))
            .catch(error => console.log(error))
            
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    

    return (
        <div>
            <PaymentsContainer>
                <Payment>
                   <h5>Qoutations &amp; Payment</h5>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Ref Number</th>
                                <th>Status</th>
                                <th>Qoutation</th>
                                <th>Payment Proof</th>
                            </tr>
                        </thead>
                        <tbody>
                        { applications.map(application => {
                            return (
                            <tr key = {application.id}>
                                <td scope="row">{application.ref_number}</td>
                                <td>{application.app_status}</td>
                                <td>
                                <Link to={`/payments/qoute/${application.id}`}>
                                    <a className="docs_btn">View Qoute</a>
                                </Link>
                                </td>
                                <td>
                                {(application.payment == 'null') ? 
                                    <a className="upload_btn" >
                                        Upload
                                        <input type="file" className="form-control file_input" name="qoute" onChange={e => getBase64(e.target.files[0], application.id)}/>
                                    </a>
                                : <span className="uploaded">Uploaded</span>
                                
                                }
                                </td>
                            </tr>
                            );
                        }) }
                        </tbody>
                    </table>
                </Payment>
            </PaymentsContainer>
        </div>
    )
}

export default Payments

const PaymentsContainer = styled.div`
    display: flex;
    justify-content: center;
    background: #f6f6f9;
    z-index: -1;
    height: 100vh;
`;


const Payment = styled.div`
    padding: 20px;
    border-radius: 10px;
    background: #ffffff;
    margin: 20px;
    height: fit-content;
    margin-top: 120px;

    h5 {
        text-align: -webkit-left;
    }

    .file_input {
        z-index: 9;
        position: absolute;
        margin-top: -27px;
        opacity: 0;
        width: 121px;
    }



    th, td {
        text-align: -webkit-left;
        color: #20303c;
        padding: 10px;

    }

    td {
        font-size: 14px;
    }

    th {
        font-size: 15px;
        font-weight: 500;
    }

    tbody {
        border-top: 1px solid rgba(32, 48, 60, 0.9)!important;
    }

    img {
        width: 20px;
        padding: 3px;
    }

    a {
        color: #299E98!important;
        cursor: pointer;
        text-decoration: none;
    }

    .delete_btn {
        background: rgba(239, 71, 58, 0.1);
        text-decoration: none;
        color: rgba(239, 71, 58,1)!important;
        padding: 9px 13px 9px 13px;
        border-radius: 5px;
        font-size: 13px;

        &:hover {
            background: rgba(239, 71, 58, 0.3);
        }

        img {
            margin-right: 5px;
            width: 15px;
            padding: 2px 3px 4px 3px;
        }
    }

    .edit_btn {
        background: rgba(32, 48, 60, 0.1);
        text-decoration: none;
        color: rgba(32, 48, 60,1)!important;
        padding: 9px 13px 9px 13px;
        border-radius: 5px;
        font-size: 13px;

        &:hover {
            background: rgba(32, 48, 60, 0.3);
        }
    }
`;

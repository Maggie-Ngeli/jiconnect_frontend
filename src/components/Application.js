import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './Form';
import APIService from '../APIService';


function Application() {

    const [applications, setApplications] = useState([]);
    const [appliances, setAppliances] = useState([]);
    const [createapplication, setCreateApplication] = useState(null);
    


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
    
      }, []);

      useEffect(() => {
        fetch('http://127.0.0.1:8004/api/applications/appliances/', {
          'method':'GET',
          headers: {
            'Content-Type':'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}` 
          }
        })
        .then(resp => resp.json())
        .then(resp => setAppliances(resp))
        .catch(error => console.log(error))
    
      }, []);







    const deleteBtn = (application) => {
        APIService.DeleteApplication(application.id)
        .then(() => deletedApplication(application))
        .catch(error => console.log(error))
    }

    const deletedApplication = (application) => {
        const new_applications = applications.filter(myapplication => {
            if(myapplication.id === application.id) {
              return false
            }
            return true;
          })
      
          setApplications(new_applications)

    }



      const applicationForm = () => {
        setCreateApplication({customer:'', location:''});
      }


    return (
        <div>
            <ApplicationsContainer>
                <ApplicationForm>
                    {createapplication ? <Form application = {createapplication}/> 
                    : <CreateApplication>
                        <button onClick = {applicationForm}>Create New Application</button>
                      </CreateApplication>}
                </ApplicationForm>
                <Applications>
                <h5>Applications</h5>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Plan</th>
                            <th>Ref No.</th>
                            <th>Status</th>
                            <th>Supply</th>
                            <th>Wayleave</th>
                            <th>Appliances</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { applications.map((application, index) => {
                            return (
                            <tr key = {application.id}>
                                <td scope="row">{application.app_type}</td>
                                <td>{application.date_created}</td>
                                <td>{application.plan}</td>
                                <td>{application.ref_number}</td>
                                <td>{application.app_status}</td>
                                <td>{(application.agree_supply == "No I don't Agree") ? <img src="/images/noicon.svg"/> : <img src="/images/agreedicon.svg"/>}</td>
                                <td>{(application.agree_wayleave == "No I don't Agree") ? <img src="/images/noicon.svg"/> : <img src="/images/agreedicon.svg"/>}</td>
                                <td>{appliances.map(app => {
                                    return (
                                        <>{(app.application==application.id) ? 
                                            <p>{app.appliance} - {app.total} kWh <br /> </p> 
                                            
                                        : 
                                        <p></p>}</>
                                    );
                                })}</td>
                                <td><a onClick = {() => deleteBtn(application)} className="delete_btn"><img src="/images/deleteicon.svg"/>Delete</a></td>
                            </tr>
                            );
                        }) }
                    </tbody>
                </table>
                </Applications>
            </ApplicationsContainer>
        </div>
    )
}

export default Application


const ApplicationsContainer = styled.div`
    display: flex;
    background: #f6f6f9;
    z-index: -1;
    
`;

const ApplicationForm = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    background: #ffffff;
    margin: 0px 5px 0px 0px;
    margin-top: 66px;

    h3 {
        margin-bottom: 10px;
        align-self: flex-start;
        text-align: left;
    }

    hr {
        opacity: 0.1;
    }

    P {
        color: #20303c;
        font-size: 12px;
        align-self: flex-start;
    }

    .applicances_btn {
        font-size: 10px;
    }

    button {
        background: transparent;
        border: none;
        padding: 0px;
        margin: 0px;
    
    }

`;

const Applications = styled.div`
    padding: 20px;
    border-radius: 10px;
    background: #ffffff;
    margin: 20px;
    height: fit-content;
    margin-top: 80px;
    position: fixed;
    margin-left: 330px;

    h5 {
        text-align: -webkit-left;
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

const CreateApplication = styled.div`
    padding: 10px;
    height: 94vh;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
        padding: 10px 25px 10px 25px;
        background: #ffffff;
        border-radius: 30px;
        font-size: 15px;
        color: rgba(41, 158, 152, 1);
        border: 2px solid rgba(41, 158, 152, 0.1);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

        &:hover {
            border: 2px solid rgba(41, 158, 152, 0.7);
        }
    }
`;
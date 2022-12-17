import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import APIService from '../APIService';


function Note() {
    const location = useLocation();
    var locpath = String(location.pathname).split('/');
    var application_id = parseInt(locpath.pop());
    const [application, setApplication] = useState([]);
    const [install_note, setInstallnote] = useState('');


    useEffect(() => {
        fetch(`http://127.0.0.1:8004/api/applications/applications/${application_id}`, {
          'method':'GET',
          headers: {
            'Content-Type':'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}` 
          }
        })
        .then(resp => resp.json())
        .then(resp => setApplication(resp))
        .catch(error => console.log(error))
    
    }, []);

    function TechDetails(applicationid) {
        APIService.UpdateApplication(applicationid, {
            "id": applicationid,
            "install_note": install_note,
        });
        handleProposalClose();
     };


    // Proposal Doc
    const [proposalshow, setProposalShow] = useState(false);

    const handleProposalClose = () => setProposalShow(false);
    const handleProposalShow = () => setProposalShow(true);

    function goBack() {
        window.history.back();
    }

    return (
        <div>
            <Row>
                <Col xs={12} md={6} lg={6}>
                    <InfoContainer>
                        <h4>Back to Applications List</h4>
                        <hr />
                    <a className="deatilsbtn" onClick={goBack}>Back</a>
                    </InfoContainer>
                </Col>
                <Col xs={12} md={6} lg={6}>
                    <InfoContainer>
                            <span><p>{application.ref_number} Tech Details</p></span>
                            <br/>
                            <a onClick={handleProposalShow}>View</a>
                            <Modal show={proposalshow} onHide={handleProposalClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Tech Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <FilterContainer>
                                        <span>{application.install_note}</span>
                                        <div className="tags_div">
                                            <input type="text" className="form-control note_input" onChange={e => setInstallnote(e.target.value)}/>
                                        </div>
                                    </FilterContainer>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Discard onClick={handleProposalClose}>
                                        Close
                                    </Discard>
                                    <Link to="/applications/designer" className="save_changes">
                                        <SubmitForm onClick={() => TechDetails(application.id)} >
                                            Save Changes
                                        </SubmitForm>
                                    </Link>
                                </Modal.Footer>
                            </Modal>
                    </InfoContainer>
                </Col>
            </Row>
        </div>
    )
}

export default Note

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px;
    border-radius: 15px;
    background: #ffffff;
    align-items: flex-start;
    margin: 10px 0px;

    a {
        padding: 0px;
        margin: 0px;
        color: rgba(41, 158, 152,1)!important;
        border-radius: 0px;
        font-size: 16px;
        cursor: pointer;
        text-decoration: none;
    }

    .save_changes {
        text-decoration: none!important;
    }

    .deatilsbtn {
        padding: 12px;
        margin: 70px;
        background: rgba(41, 158, 152,1);
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;
        text-decoration: none!important;
        color: #fff!important;
        margin-top: 19px;
    }

    span {
        font-weight: bold;
    }


    hr {
        margin: 1rem 0;
        color: inherit;
        background-color: rgba(32, 48, 60, 0.4);
        border: 1;
        opacity: 1;
        width: 100%;
    }

    div {
        text-align-last: start;
    }

    .modal-content {
        width: fit-content!important;
    }

    .modal-footer {
        a {
            text-decoration: none!important;
        }
    }


`;
const FilterContainer = styled.div`
    margin-top: 90px;
    margin-bottom: 10px;

    h6 {
        color: #20303c;
        text-align: -webkit-auto;
        
    }

    .applicances_btn {
        font-size: 13px;
        cursor: pointer;
        color: #299E98!important;
        background: transparent;
        text-align: -webkit-auto;
        text-decoration: underline;
    }

    


    div {
        width: 100%;

        input {
            width: 100%;
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.03);
            border: 1px solid rgba(0, 0, 0, 0);
            align-items: center;
            color: #20303c;
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    
            &:hover {
                background: #fff;
                border: 1px solid rgba(0, 0, 0, 0.08);
                -webkit-box-shadow: 0 0 0 4px rgb(41 158 152 / 10%);
                box-shadow: 0 0 0 4px rgb(41 158 152 / 10%);
            }

            &:active {
                background: transparent;
                color: #20303c;
                border: 1px solid rgba(41, 158, 152, 0.4);
                -webkit-box-shadow: 0 0 0 4px rgb(41 158 152 / 10%);
                box-shadow: 0 0 0 4px rgb(41 158 152 / 10%);
            }
    
    
            &:focus {
                background: transparent;
                color: #20303c;
                border: 1px solid rgba(41, 158, 152, 0.4);
                -webkit-box-shadow: 0 0 0 4px rgb(41 158 152 / 10%);
                box-shadow: 0 0 0 4px rgb(41 158 152 / 10%);
                
            }
        }

        input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
            color: rgba(32, 48, 60, 0.5);
            font-size: 14px;
            font-weight: 250;
            text-align: center;
            text-indent: 0px;
            text-transform: none;

        }

        input::-moz-placeholder { /* Firefox 19+ */
            color: rgba(32, 48, 60, 0.5);
            font-size: 14px;
            font-weight: 250;
            text-align: center;
            text-indent: 0px;
            text-transform: none;
        }

        input:-ms-input-placeholder { /* IE 10+ */
            color: rgba(32, 48, 60, 0.5);
            font-size: 14px;
            font-weight: 250;
            text-align: center;
            text-indent: 0px;
            text-transform: none;
        }

        input:-moz-placeholder { /* Firefox 18- */
            color: rgba(32, 48, 60, 0.5);
            font-size: 14px;
            font-weight: 250;
            text-align: center;
            text-indent: 0px;
            text-transform: none;
        }

        .tags_div {
            position: relative;

            .tags_input {
                text-indent: 5%;
                font-weight: 300;
                font-size: 14px;
                height: 40px;
            }

            .tags_searchicon {
                margin: 7px 8px 8px 13px;
                position: absolute;
                z-index: 1;
                top: 0; 
                left: 0; 
                bottom: 0; 
                right: 0;
                width: 25px;
            }
        }

        .color_input {
            justify-content: center;
        }

    }

    .tags_label, .colors_label {
        width: 80%;
    }

    .tags_label h6, .colors_label h6 {
        display: flex;
        flex: 1;
        justify-content: flex-start;
    }

    .tags_label a, .colors_label a {
        font-size: 12px;
        margin: 0px;
        padding: 0;
        cursor: pointer;
        color: rgba(41, 158, 152, 0.8);
        display: none;

        &:hover {
            color: rgba(41, 158, 152, 0.6);
        }
    }

    .timeframe_filter, .apps_filter {
        width: 100%;
    }



    .dropdown_btn {
        width: 100%;
        text-align: inherit;
        display: flex;
        align-items: center;
        p {
            display: flex;
            flex: 1;
            justify-content: flex-start;
            margin: 0px;
        }
        
    }

    .UrlInput { 
        position: relative; 
    }
    .UrlInput label { 
        position: absolute; left: 0px; top: 0px; color: #000; 
        z-index:1;
        padding: 8px 0px 8px 25px;
        display: none;
        
    }
    .UrlInput input { 
        position: absolute;
        text-indent: 24px;
        font-weight: 300;
        font-size: 14px;
        height: 40px;
        text-transform: uppercase;

    }


    

`;

const SubmitForm = styled.div`
    background: #299E98;
    border-color: #299E98;
    color: #ffffff;
    border-radius: 7px;
    font-size: 14px;
    padding: 8px 18px 8px 18px;
    cursor: pointer;

    button {
        color: #ffffff;

        &:hover {
            color: #ffffff;
        }
    }

    &:hover {
        opacity: 0.8;
    }
`;

const Discard = styled.div`
    background: rgba(32, 48, 60, 0.1);
    border-color: rgba(32, 48, 60, 0.1);
    color: rgba(32, 48, 60, 1);
    border-radius: 7px;
    font-size: 14px;
    padding: 8px 18px 8px 18px;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
        opacity: 0.8;
    }

`;





import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';


function Proposal() {
    const location = useLocation();
    var locpath = String(location.pathname).split('/');
    var application_id = parseInt(locpath.pop());
    const [application, setApplication] = useState([]);


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
                            <span><p>{application.ref_number} Proposal Doc</p></span>
                            <br/>
                            <a onClick={handleProposalShow}>View</a>
                            <Modal show={proposalshow} onHide={handleProposalClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Proposal</Modal.Title>
                                </Modal.Header>
                                <Modal.Body><img src={application.proposal} width="470px"/></Modal.Body>
                                <Modal.Footer>
                                    <Discard onClick={handleProposalClose}>
                                        Close
                                    </Discard>
                                </Modal.Footer>
                            </Modal>
                    </InfoContainer>
                </Col>
            </Row>
        </div>
    )
}

export default Proposal

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
        text-decoration: underline;
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

    h1 {

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




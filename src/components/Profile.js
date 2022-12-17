import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Modal } from 'react-bootstrap';

function Profile() {
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8004/api/applications/customer/', {
          'method':'GET',
          headers: {
            'Content-Type':'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}` 
          }
        })
        .then(resp => resp.json())
        .then(resp => setCustomer(resp))
        .catch(error => console.log(error))
    
    }, []);


    useEffect(() => {
        console.log(customer);
    }, [customer]);


    // ID Doc
    const [iddocumentshow, setIddocumentShow] = useState(false);

    const handleIddocumentClose = () => setIddocumentShow(false);
    const handleIddocumentShow = () => setIddocumentShow(true);


    // Pin 
    const [pinshow, setPinShow] = useState(false);

    const handlePinClose = () => setPinShow(false);
    const handlePinShow = () => setPinShow(true);



    // Title Deed
    const [titledeedshow, setTitledeedShow] = useState(false);

    const handleTitledeedClose = () => setTitledeedShow(false);
    const handleTitledeedShow = () => setTitledeedShow(true);


    // WC
    const [wcshow, setWcShow] = useState(false);

    const handleWcClose = () => setWcShow(false);
    const handleWcShow = () => setWcShow(true);


    // Site Plan
    const [siteplanshow, setSiteplanShow] = useState(false);

    const handleSiteplanClose = () => setSiteplanShow(false);
    const handleSiteplanShow = () => setSiteplanShow(true);


    return (
        <div>
            <ProfileContainer>
            <Row>
                <Col xs={12} md={4} lg={4}>
                    <InfoContainer>
                        <h4>Fill Form</h4>
                        <hr />
                        <Link to="/detailsform">
                            <a className="deatilsbtn">Add Details and Documents</a>
                        </Link>
                    </InfoContainer>
                </Col>
                <Col xs={12} md={4} lg={4}>
                    <InfoContainer>
                        <h4>Personal Info</h4>
                        <hr />
                        <p><span>name: </span>{customer ? customer.name : "no name"}</p>
                        <p><span>middle name: </span>{customer ? customer.name : "none"}</p>
                        <p><span>last name: </span>{customer ? customer.last_name : "none"}</p>
                        <p><span>id type: </span>{customer ? customer.id_type : "none"}</p>
                        <p><span>id/certificate registration no: </span>{customer ? customer.id_number : "none"}</p>
                    </InfoContainer>
                </Col>
                <Col xs={12} md={4} lg={4}>
                    <InfoContainer>
                        <h4>Contact Info</h4>
                        <hr />
                        <p><span>Email: </span>{customer ? customer.email : "none"}</p>
                        <p><span>Phone: </span>{customer ? customer.phone : "none"}</p>
                    </InfoContainer>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={4} lg={4}>
                    <InfoContainer>
                        <h4>Demographics</h4>
                        <hr />
                        <p><span>county: </span>{customer ? customer.county : "no county"}</p>
                        <p><span>po box: </span>{customer ? customer.po_box : "none"}</p>
                        <p><span>town: </span>{customer ? customer.town : "none"}</p>
                        <p><span>constituency: </span>{customer ? customer.constituency : "no constituency"}</p>
                        <p><span>ward: </span>{customer ? customer.ward : "none"}</p>
                        <p><span>lr no: </span>{customer ? customer.lr_number : "none"}</p>
                        <p><span>estate/village: </span>{customer ? customer.estate_village : "none"}</p>
                        <p><span>area code: </span>{customer ? customer.area_code : "no area code"}</p>
                        <p><span>customer contact person: </span>{customer ? customer.ccp : "none"}</p>
                    </InfoContainer>
                </Col>
                <Col xs={12} md={4} lg={4}>
                    <InfoContainer>
                        <h4>Supply Info</h4>
                        <hr />
                        <p><span>voltage: </span>{customer ? customer.voltage : "none"}</p>
                        <p><span>connection type: </span>{customer ? customer.connect_type : "none"}</p>
                        <p><span>number of meters: </span>{customer ? customer.amd : "none"}</p>
                    </InfoContainer>
                </Col>
                <Col xs={12} md={4} lg={4}>
                    <InfoContainer>
                        <h4>Documents</h4>
                        <hr />
                        <div>
                            <span>site plan </span>
                            <br/>
                            <a onClick={handleSiteplanShow}>View</a>
                            <Modal show={siteplanshow} onHide={handleSiteplanClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Site Plan</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>{(customer == null) ? <p>No Site Plan Doc Uploaded</p> : (customer.site_plan == null) ? <p>No Site Plan Doc Uploaded</p> : <img src={customer.site_plan} width="470px"/>}</Modal.Body>
                                <Modal.Footer>
                                    <Discard onClick={handleSiteplanClose}>
                                        Close
                                    </Discard>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <br/>
                        <div>
                            <span>id copy/certificate of registration </span>
                            <br/>
                            <a onClick={handleIddocumentShow}>View</a>
                            <Modal show={iddocumentshow} onHide={handleIddocumentClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>ID Document</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>{(customer == null) ? <p>No ID Doc Uploaded</p> : (customer.id_document == null) ? <p>No ID Doc Uploaded</p> : <img src={customer.id_document} width="470px"/>}</Modal.Body>
                                <Modal.Footer>
                                    <Discard onClick={handleIddocumentClose}>
                                        Close
                                    </Discard>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <br/>
                        <div>
                            <span>pin certificate copy </span>
                            <br/>
                            <a onClick={handlePinShow}>View</a>
                            <Modal show={pinshow} onHide={handlePinClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Pin Certificate Copy</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>{(customer == null) ? <p>No Pin Doc Uploaded</p> : (customer.pin == null) ? <p>No Pin Doc Uploaded</p> : <img src={customer.pin} width="470px"/>}</Modal.Body>
                                <Modal.Footer>
                                    <Discard onClick={handlePinClose}>
                                        Close
                                    </Discard>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <br/>
                        <div>
                            <span>deed title copy </span>
                            <br/>
                            <a onClick={handleTitledeedShow}>View</a>
                            <Modal show={titledeedshow} onHide={handleTitledeedClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Title Deed</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>{(customer == null) ? <p>No Title Deed Doc Uploaded</p> : (customer.title_deed == null) ? <p>No Title Deed Doc Uploaded</p> : <img src={customer.title_deed} width="470px"/>}</Modal.Body>
                                <Modal.Footer>
                                    <Discard onClick={handleTitledeedClose}>
                                        Close
                                    </Discard>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <br/>
                        <div>
                            <span>Wiring certificate </span>
                            <br/>
                            <a onClick={handleWcShow}>View</a>
                            <Modal show={wcshow} onHide={handleWcClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Wiring Certificate</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>{(customer == null) ? <p>No Wiring Certificate Doc Uploaded</p> : (customer.wiring_certificate == null) ? <p>No Wiring Certificate Doc Uploaded</p> : <img src={customer.wiring_certificate} width="470px"/>}</Modal.Body>
                                <Modal.Footer>
                                    <Discard onClick={handleWcClose}>
                                        Close
                                    </Discard>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </InfoContainer>
                </Col>
            </Row>
            </ProfileContainer>

        </div>
    )
}

export default Profile




const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: #f6f6f9;
    padding: 80px 50px;
    z-index: -1;

    a {
        text-decoration: none;
    }
    
`;
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


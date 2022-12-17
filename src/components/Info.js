import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Info() {
    return (
        <div>
            <InfoContainer>
                <Row>
                    <h1 className="text-center p-5">How we Work</h1>
                <Col xs={12} md={4} lg={4}>
                        <Shot className="d-block">
                            <h3>01</h3>
                            <hr></hr>
                            <h4>Apply Online</h4>
                            <p>Create your account account, start application process and upload all relevant documents.</p>
                        </Shot>
                    </Col>
                    <Col xs={12} md={4} lg={4}>
                        <Shot className="d-block">
                            <h3>02</h3>
                            <hr></hr>
                            <h4>Site Visit</h4>
                            <p>We will visit your site and to assess what is needed for installation.</p>
                        </Shot>
                    </Col>
                    <Col xs={12} md={4} lg={4}>
                        <Shot className="d-block">
                            <h3>03</h3>
                            <hr></hr>
                            <h4>Installation</h4>
                            <p>We will do installation on your site after the design has been finilised.</p>
                        </Shot>
                    </Col>
                </Row>
            </InfoContainer>
        </div>
    )
}

export default Info

const InfoContainer = styled.div`
    padding: 0px 67px;
    margin-bottom: 80px;
    position: relative;

    h1 {
        font-weight: bold;
    }

`;

const Shot = styled.div`
    position: relative;
    cursor: pointer;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    text-align: initial;
    padding: 20px;
`;
const Thumbnail = styled.div`
    border-radius: 10px;
    img {
        border-radius: 10px;
        width: 100%;
    }
`;


const LoginButtons = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;

    .buttons_div {
        margin-top: 40px;

        button {
            background: #299E98;
            border-color: #299E98;
            font-size: 15px;
            padding: 8px 55px 8px 55px;
            border-radius: 8px;
            margin-right: 30px;

            &:hover {
                opacity: 0.8;
            }
        }

        a {
            color: #299E98;
            font-size: 14px;
            cursor: pointer;

            &:hover {
                opacity: 0.8;
                color: #299E98;
            }
        }
    }
`;

export {InfoContainer, Shot, Thumbnail, LoginButtons}

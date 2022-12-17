import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
    return (
        <div>
            <FooterContainer>
                <TopFooter>
                    <Row>
                        <Col xs={6} md={3} lg={3} className="footer_brand">
                            <img src="/images/logo.svg"/>
                            <p className="logo_descr">An easy way to make your supply applications</p>
                            <div className="d-flex socials">
                                <img src="/images/twittersocial.svg"/>
                                <img src="/images/facebooksocial.svg"/>
                                <img src="/images/instagramsocial.svg"/>
                                <img src="/images/pinterestsocial.svg"/>
                            </div>
                        </Col>
                        <Col xs={6} md={2} lg={2}>
                            <div className="d-grid">
                                <h6>Quick Links</h6>
                                <a className="browse_category">Apply Now</a>
                                <a className="browse_category">Application Status</a>
                                <a className="browse_category">Qoutations</a>
                                <a className="browse_category">Payments</a>
                            </div>
                        </Col>
                        <Col xs={6} md={2} lg={2}>
                            <div className="d-grid">
                                <h6>Contact Us</h6>
                                <a className="browse_category">jlutere123@gmail.com</a>
                                <a className="browse_category">+254 2032 01000</a>
                            </div>
                        </Col>
                        <Col xs={6} md={2} lg={2}>
                            <div className="d-grid">
                                <h6>Company</h6>
                                <a className="browse_category">About</a>
                                <a className="browse_category">Support</a>
                                <a className="browse_category">Testimonials</a>
                                <a className="browse_category">Terms of service</a>
                                <a className="browse_category">Privacy policy</a>
                            </div>
                        </Col>
                        <Col xs={6} md={2} lg={2}>
                            <div className="d-grid">
                                <h6>FAQs</h6>
                                <a className="browse_category">How to Apply ?</a>
                                <a className="browse_category">How much it costs ?</a>
                                <a className="browse_category">How long does it take ?</a>
                                <a className="browse_category">What documents are needed ?</a>
                            </div>
                        </Col>
                    </Row>
                </TopFooter>
                <hr/>
                <ButtomFooter>
                    <CopyRight>
                        © 2020 Jiconnect. All right reserved.
                    </CopyRight>
                    <ShotsStats>
                        <span>Developed to make difference.</span>
                        email: jlutere123@gmail.com
                    </ShotsStats>
                </ButtomFooter>
            </FooterContainer>
        </div>
    )
}

export default Footer

const FooterContainer = styled.div`
    padding: 67px;
    background: rgba(0, 0, 0, 0.03);
    text-align: initial;

    hr {
        opacity: 0.09;
    }
`;

const TopFooter = styled.div`

    .logo_descr {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.8);
        font-weight: 400;
        padding: 15px 30px 10px 0px;
    }

    .socials {
        img {
            width: 18px;
            margin-right: 20px;
            cursor: pointer;
        }
    }
    div h6 {
        color: rgba(0, 0, 0, 1);
        padding-bottom: 10px;
    }

    div a {
        text-decoration: none;
        color: rgba(0, 0, 0, 0.8);
        font-weight: 300;
        padding-bottom: 10px;
        font-size: 15px;
        cursor: pointer;

        &:hover {
            color: rgba(0, 0, 0, 1);
        }
    }

    .footer_brand {
        text-align: initial;
    }
`;

const ButtomFooter = styled.div`
    display: flex;
    margin-top: 40px;
`;

const CopyRight = styled.div`
    font-size: 13px;
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-start;
    color: rgba(0, 0, 0, 0.6);
`;

const ShotsStats = styled.div`
    display: flex;
    align-items: center;
    font-size: 13px;
    margin: 0px;

    img {
        margin: 0px;
        width: 20px;
        margin-left: 10px;

    }

    span {
        margin: 0px;
        padding: 0px;
        margin-right: 10px;
        color: #000;
        font-weight: 700;
    }
`;

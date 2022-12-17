import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

function Landing() {
    return (
        <div>
            <Intro className="d-flex">
                <Welcome>
                    <h2>Helping you get Electricity to your home the easiest way possible.</h2>
                    <p>An easy way to make your supply applications</p>
                    <SignUp>
                        Apply Now
                    </SignUp>
                </Welcome>
                <Art className="d-block">
                    <img src="/images/hpleftpic.svg"/>
                </Art>
            </Intro>
        </div>
    )
}

export default Landing

const Intro = styled.div`
    height: 70vh;
    background: #F9F8FD;
    position: relative;
`;

const Welcome = styled.div`
   padding: 70px 60px 70px 60px;
   width: 70%;
   float: left;
   color: rgba(0, 0, 0, 1);
   align-items: center;
   justify-content: center;
   margin-top: 30px;
   text-align: initial;

   h2 {
       font-size: 50px;
       font-weight: bold;
   }
`;

const SignUp = styled.div`
    background: #299E98;
    border-color: #299E98;
    color: #fff;
    border-radius: 7px;
    font-size: 14px;
    padding: 8px 18px 8px 18px;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
    width: max-content;
`;

const Art = styled.div`
    width: 50%;
    float: right;
    padding: 40px 30px 40px 80px;
    img {
        width: 100%;
    }

    div {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        margin-right: 35px;
    }
    div p {
        color: rgba(0, 0, 0, 0.4);
        padding: 25px 5px 25px 25px;
        font-size: 13px;
    }

    div .artist {
        color: rgba(0, 0, 0, 0.4);
        padding: 25px 25px 25px 0px;
        font-size: 13px;
        text-decoration: underline;
        cursor: pointer;
    }

`;

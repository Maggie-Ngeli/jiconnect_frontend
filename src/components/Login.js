import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-bootstrap';
import $ from 'jquery';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import axios from 'axios';

function Login({ login, isAuthenticated }) {

    const [formData, setFormData] = useState({
        email: '',
        password: '' 
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    const continueWithFacebook = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    if (isAuthenticated) {
        if(email=="noahmckenzie267@gmail.com") {
            return <Redirect to='/applications/all' />
        }else if(email=="simadevtest@gmail.com") {
            return <Redirect to='/applications/designer'/>
        }else if(email=="thecscdudee@gmail.com") {
            return <Redirect to='/applications/engineer' />
        }else{
            return <Redirect to='/' />
        }
    }

    function ShowEmailLabel(e) {
        $(".email_label").css("display", "flex");
        $(".email_label").css("margin-top", "50px");
        $(".email_label").css("margin-left", "15px");
        $(".email_label").css("font-size", "12px");
    }

    function HideEmailLabel(e) {
        if(String(e.target.value).length==0){
            $(".email_label").css("display", "none"); 
        }
    }

    function ShowPasswordLabel(e) {
        $(".password_label").css("display", "flex");
        $(".password_label").css("margin-top", "155px");
        $(".password_label").css("margin-left", "15px");
        $(".password_label").css("font-size", "12px");
    }

    function HidePasswordLabel(e) {
        if(String(e.target.value).length==0){
            $(".password_label").css("display", "none"); 
        }
    }

    return (
        <div className='auth'>
            <Helmet>
                <title>Jiconnect - Login</title>
                <meta
                    name='description'
                    content='login page'
                />
            </Helmet>
            <Nav className="d-flex">
                <Logo>
                    <img src="/images/logo.svg"/>
                </Logo>
                <NavMenu className="d-flex">
                </NavMenu>
                <AccNav className="d-flex">
                    <NavLink className="nav-link">
                        <Link to="/" className="linkbtn">
                            <img src="/images/closeicon.svg"/>
                        </Link>
                    </NavLink>
                </AccNav>
            </Nav>
            <LoginPage>
                <Sign className="d-block">
                    <div className="d-block">
                        <h1>Sign In</h1>
                        <NavSign>
                            <p>Don't have an account ?</p>
                            <Link to="/signup" className="linkbtn">
                                <a>Sign up</a>
                            </Link>
                        </NavSign>
                    </div>
                </Sign>
                <LoginOpts>
                    <LoginForms>
                    <form className='auth__form' onSubmit={e => onSubmit(e)}>
                        <label className="email_label">Email</label>
                        <input className='auth__form__input' type='email' placeholder='Email' name='email' value={email} onChange={e => onChange(e)} required onFocus={ShowEmailLabel} onBlur={HideEmailLabel}/>
                        <label className="password_label">Password</label>
                        <input className='auth__form__input' type='password' placeholder='Password' name='password' value={password} onChange={e => onChange(e)} minLength='6' onFocus={ShowPasswordLabel} onBlur={HidePasswordLabel}/>
                        <span>Forgot password or email</span>
                        <button>Sign in</button>
                    </form>
                    </LoginForms>
                    <Line>
                        <div class = "vertical"></div>
                    </Line>
                    <LoginSocials>
                        <SocialButton>
                            <img src="/images/facebookloginicon.svg" className="fbicon"/>
                            <a>Sign in with Facebook</a>
                        </SocialButton>
                        <SocialButton className="google_sb">
                            <img src="/images/googleloginicon.svg"/>
                            <a className="googletext">Sign in with Google</a>
                        </SocialButton>
                    </LoginSocials>
                </LoginOpts>
            </LoginPage>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);


const Nav = styled.nav`
    align-items: center;
    padding: 0px 25px 0px 25px;
`;
const Logo = styled.div`
    margin-right: 15px;

    img {
        width: 130px;
    }
`;
const NavMenu = styled.div`
    .nav-link {
        font-size: 14px;
        font-weight: 500;
        color: #6e6d7a;
        position: relative;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        padding: 20px;

        .nav-box {
            display: none;
        }

        &:hover {
            color: #299E98;

            .nav-box {
                display: flex;
            }
        }
    }
`;
const AccNav = styled.div`
    align-items: center;
    flex: 1;
    justify-content: flex-end;

    .left_nav {
        display: none;
    }

    .nav-link {
        font-size: 16px;
        color: #6e6d7a;
        margin-right: 6px;
        padding: 20px;

        &:hover {
            color: #299E98;

            .nav-box {
                display: flex;
            }
        }
    }

    img {
        width: 22px;
        margin-right: 5px;
    }

`;

const LoginPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Sign = styled.div`
    justify-content: center;
    margin-bottom: 20px;

    h1 {
        font-size: 60px;
        font-weight: bold;
        margin-bottom: 12px;
    }
`;

const NavSign = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        margin-bottom: 0;
        font-size: 18px;
        
    }

    a {
        font-size: 18px;
        color: #299E98!important;
        cursor: pointer;
        margin-left: 8px;
        text-decoration: none;
    }
`;

const LoginOpts = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 20px 80px 20px 80px;
`;

const LoginForms = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 70px;

    .auth__form {
        display: flex;
        flex-direction: column;
    }

    label {
        position: absolute;
        margin-top: 65px;
        font-size: 20px;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        font-family: 'Roboto', sans-serif;
        margin-left: 15px;
        color: #20303c;
        display: none;

    }

    span {
        font-size: 13px;
        font-weight: 300;
        margin-top: 10px;
        text-align: end;
        cursor: pointer;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

        &:hover {
            color: #299E98;
        }
    }

    input {
        border: 0px;
        border-bottom: 1px solid #DEE2E6;
        border-style: inset;
        border-radius: 0px;
        width: 400px;
        font-size: 20px;
        font-weight: 300;
        text-indent: 8px;
        color: #20303c;
        padding: 25px 10px 10px 10px;
        margin-top: 40px;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        

        &:hover {
            border-bottom: 1px solid rgba(32, 48, 60, 1);
        }

        &:active {
            border: 0px;
            border-bottom: 1px solid #299E98;
        }

        &:focus-visible {
            outline-width: 0px;
            border-bottom: 1px solid #299E98;
            ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
                color: #20303c;
                opacity: 0; /* Firefox */
              }
        }

        ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: #20303c;
            opacity: 1; /* Firefox */
          }
          
    }



    button {
        margin-top: 30px;
        padding: 10px 30px 10px 30px;
        border: none;
        background: #299E98;
        color: #ffffff!important;
        cursor: pointer;
        border-radius: 5px;
        font-size: 16px;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

        &:hover {
            opacity: 0.8;
        }
    }


`;

const LoginSocials = styled.div`
    display: block;
    margin-left: 70px;
    
`;

const SocialButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    padding: 0px;
    color: #ffffff!important;
    border: 1px solid #1877f2;
    cursor: pointer;
    margin-top: 30px;
    

    a {
        background: #1877f2;
        margin: 0px;
        padding: 10px 25px 10px 25px;
        text-align: center;
        width: -webkit-fill-available;
    }

    img {
        width: 30px;
        padding: 5px;
        margin-right: 8px;
        cursor: pointer;
        border-radius: 5px;
        font-size: 16px;
        background: #fffffff;
        margin: 0px 7px 0px 7px;
        padding: 3px;

    }

    .fbicon {
        width: 25px;
        padding: 6px;
    }

    .google_sb {
        border: 1px solid #4285F4;
    }

    .googletext {
        background: #4285F4;
        color: #ffffff!important;
        text-decoration: none;
    }
`;


const Line = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    .vertical {
        border-left: 1px solid rgba(32, 48, 60, 0.7);
        height: 350px;
        left: auto;
        right: auto;
    }
`;

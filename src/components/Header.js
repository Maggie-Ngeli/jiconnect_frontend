import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useState, useEffect } from 'react';
import { Link, NavLink , Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { useLocation } from 'react-router-dom'; 
import $ from 'jquery';


function Header({ logout, isAuthenticated }) {

    const [redirect, setRedirect] = useState(false);
    const [accountcard, setCard] = useState(false);
    const location = useLocation();
    const nonav_arr = '/login/signup/documents/docview/proposal/note';

    const logout_user = () => {
        logout();
        setRedirect(true);
    };


    function ChangeCard() {
        if(accountcard==true){
            $("#account_card").css("display", "none");
            setCard(false);
        }else{
            $("#account_card").css("display", "block");
            setCard(true);
        }
    }

    const authLinks = () => (
        <AccNavLogged className="d-flex">
            <NavLink className="nav-link" exact to='/'>
                Home
            </NavLink>
            <NavLink className="nav-link" exact to='/payments'>
                Qoutations &amp; Payments
            </NavLink>
            <NavLink className="nav-link" exact to='/application'>
                Applications
            </NavLink>
            <NavLink className="nav-link" exact to='/profile'>
                Profile
            </NavLink>
            <ProfilePic onClick={() => ChangeCard(setCard(true))}>
                C
            </ProfilePic>
            <AccountCard id="account_card" >
                <div class="d-block">
                    <Link to="/profile" className="linkbtn">
                        <div class="mb-2"><a class="account_link" role="button">support</a></div>
                    </Link>
                    <hr/>
                    <a class="account_link" role="button" onClick={logout_user} href="/">Sign out</a>
                </div>
            </AccountCard>
        </AccNavLogged>

    );

    const busdevLinks = () => (
        <AccNavLogged className="d-flex">
            <NavLink className="nav-link" exact to='/'>
               Applications
            </NavLink>
            <NavLink className="nav-link" exact to='/analytics'>
                Analytics
            </NavLink>
            <ProfilePic onClick={() => ChangeCard(setCard(true))}>
                B C
            </ProfilePic>
            <AccountCard id="account_card" >
                <div class="d-block">
                    <Link to="/profile" className="linkbtn">
                        <div class="mb-2"><a class="account_link" role="button">support</a></div>
                    </Link>
                    <hr/>
                    <a class="account_link" role="button" onClick={logout_user} href="/">Sign out</a>
                </div>
            </AccountCard>
        </AccNavLogged>
    );


    const analyticsLinks = () => (
        <AccNavLogged className="d-flex">
            <NavLink className="nav-link" exact to='/applications/all'>
               Applications
            </NavLink>
            <NavLink className="nav-link" exact to='/analytics'>
                Analytics
            </NavLink>
            <ProfilePic onClick={() => ChangeCard(setCard(true))}>
                B C
            </ProfilePic>
            <AccountCard id="account_card" >
                <div class="d-block">
                    <Link to="/profile" className="linkbtn">
                        <div class="mb-2"><a class="account_link" role="button">support</a></div>
                    </Link>
                    <hr/>
                    <a class="account_link" role="button" onClick={logout_user} href="/">Sign out</a>
                </div>
            </AccountCard>
        </AccNavLogged>
    );

    const designerLinks = () => (
        <AccNavLogged className="d-flex">
            <NavLink className="nav-link" exact to='/'>
               Applications
            </NavLink>
            <ProfilePic onClick={() => ChangeCard(setCard(true))}>
                D
            </ProfilePic>
            <AccountCard id="account_card" >
                <div class="d-block">
                    <Link to="/profile" className="linkbtn">
                        <div class="mb-2"><a class="account_link" role="button">support</a></div>
                    </Link>
                    <hr/>
                    <a class="account_link" role="button" onClick={logout_user} href="/">Sign out</a>
                </div>
            </AccountCard>
        </AccNavLogged>
    );

    const engineerLinks = () => (
        <AccNavLogged className="d-flex">
            <NavLink className="nav-link" exact to='/'>
               Applications
            </NavLink>
            <NavLink className="nav-link" exact to='/profile'>
                Analytics
            </NavLink>
            <ProfilePic onClick={() => ChangeCard(setCard(true))}>
                E
            </ProfilePic>
            <AccountCard id="account_card" >
                <div class="d-block">
                    <Link to="/profile" className="linkbtn">
                        <div class="mb-2"><a class="account_link" role="button">support</a></div>
                    </Link>
                    <hr/>
                    <a class="account_link" role="button" onClick={logout_user} href="/">Sign out</a>
                </div>
            </AccountCard>
        </AccNavLogged>
    );

    const guestLinks = () => (
        <Fragment>
            <NavLink className="nav-link" exact to='/login'>
                <Link to="/login" className="linkbtn">
                    Sign in
                </Link>
            </NavLink>
            <Link to="/signup" className="linksignupbtn">
                <SignUp>
                    Signup
                </SignUp>
            </Link>
        </Fragment>
    );

    function checkLocation(loc_path) {
        if(String(loc_path).includes("/applications/all")) {
            return busdevLinks();
        }else if(String(loc_path).includes("/applications/designer")) {
            return designerLinks();
        }else if(String(loc_path).includes("/applications/engineer")) {
            return engineerLinks();
        }else if(String(loc_path).includes("/analytics")){
            return analyticsLinks();
        }else if(String(loc_path).includes("/")) {
            return authLinks();
        }
    }

    function logRedirect(loc_path) {
        if(String(loc_path).includes("/applications/all")) {
            return <Redirect to='/applications/all' />;
        }else if(String(loc_path).includes("/applications/designer")) {
            return <Redirect to='/applications/designer' />;
        }else if(String(loc_path).includes("/applications/engineer")) {
            return <Redirect to='/applications/engineer' />;
        }else if(String(loc_path).includes("/analytics")) {
            return <Redirect to='/analytics' />;
        }else if(String(loc_path).includes("/")) {
            return <Redirect to='/' />;
        }
    }

    var url_check = String(location.pathname).split("/");
    var url_val = url_check[2]
    if(String(location.pathname).includes("/login") || String(location.pathname).includes("/signup")) {
        url_val = url_check[1]
    }
    if(nonav_arr.includes(url_val)) {
        return null
    }else{
        return (
            
            <Fragment>
                <Nav className="d-flex">
                    <Logo>
                        <img src="/images/logo.svg"/>
                    </Logo>
                    <NavMenu className="d-flex">
                    </NavMenu>
                    <AccNav className="d-flex">
                    {(isAuthenticated) ? checkLocation(location.pathname) : guestLinks()}
                    </AccNav>
                </Nav>
                {redirect ? logRedirect(location.pathname) : <Fragment></Fragment>}
            </Fragment>
        );
    }
    

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Header);



const Nav = styled.nav`
    align-items: center;
    padding: 0px 25px 0px 25px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
    position: fixed;
    width: -webkit-fill-available;
    background: #ffffff;
    z-index: 5;
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

    a {
        text-decoration: none;
    }

    .left_nav {
        display: none;
    }

    .nav-link {
        font-size: 16px;
        color: #6e6d7a;
        margin-right: 6px;
        padding: 20px;
        text-decoration: none;

        &:hover {
            color: #299E98;

            .nav-box {
                display: flex;
            }
        }
        .linkbtn {
            text-decoration: none;
            color: #6e6d7a;
            &:hover {
                color: #299E98;
    
                .nav-box {
                    display: flex;
                }
            }
        }


    }

    img {
        width: 22px;
        margin-right: 5px;
    }

`;

const AccNavLogged = styled.div`
    align-items: center;
    flex: 1;
    justify-content: flex-end;

    a {
        text-decoration: none;
    }

    .left_nav {
        display: none;
    }

    .nav-link {
        font-size: 16px;
        color: #6e6d7a;
        margin-right: 6px;
        padding: 20px;
        text-decoration: none;

        &:hover {
            color: #299E98;

            .nav-box {
                display: flex;
            }
        }
        .linkbtn {
            text-decoration: none;
            color: #6e6d7a;
            &:hover {
                color: #299E98;

                .nav-box {
                    display: flex;
                }
            }
        }


    }

    img {
        width: 22px;
        margin-right: 5px;
    }

    .active_navlink {
        color: #299E98;
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
    text-decoration: none;

    &:hover {
        opacity: 0.8;
    }

    .linksignupbtn {
        text-decoration: none;
        color: #ffffff;
    }

`;

const ProfilePic = styled.div`
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 88px;
    background: #299E98;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 13px;
    font-weight: bold;

    img {
        width: -webkit-fill-available;
        width: 40px;
        height: 40px;
        border-radius: 88px;
    }

    &:hover {
        opacity: 0.8;
    }
`;


const AccountCard = styled.div`
    background: #fff;
    border-radius: 13px;
    position: absolute;
    margin-top: 11%;
    z-index: 12;
    margin-left: 1%;
    padding: 15px 45px 15px 23px;
    box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);
    text-align: justify;
    display: none;


    .account_link {
        color: #0A0918;
        font-size: 14px;
        font-weight: 200;
    }
    
    .account_link:hover {
        color: #299E98;
        font-size: 14px;
        font-weight: 200;
        text-decoration: none;
    }
`;

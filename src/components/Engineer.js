import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button, Collapse } from 'react-bootstrap';
import $ from 'jquery';
import { NavLink } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Modal } from 'react-bootstrap';
import APIService from '../APIService';


function Engineer() {
    const [data, setData] = useState(null);
    const [total, setTotal] = useState('0');
    const [paymentsettled, setPaymentSettled] = useState('0');
    const [installed, setInstalled] = useState('0');
    const [applications, setApplications] = useState([]);
    const [order, setOrder] = useState(1);
    const [counties, setCounties] = useState('all');
    const [oriapplications, setOriApplications] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [applicationtype, setApptype] = useState('All types');
    const [appstatus, setAppStatus] = useState('Payment Settled');
    


    useEffect(() => {
        fetch('http://127.0.0.1:8004/api/applications/applications/engineer/', {
            'method':'GET',
            headers: {
            'Content-Type':'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}` 
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            setApplications(resp);
            setOriApplications(resp);
        })
        .catch(error => console.log(error))
    
    }, [appstatus]);

    useEffect(() => {
        fetch('http://127.0.0.1:8004/api/applications/customers/', {
            'method':'GET',
            headers: {
            'Content-Type':'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}` 
            }
        })
        .then(resp => resp.json())
        .then(resp => setCustomers(resp))
        .catch(error => console.log(error))
    
    }, []);

    useEffect(() => {
    fetch('http://127.0.0.1:8004/api/applications/applications/data/', {
        'method':'GET',
        headers: {
        'Content-Type':'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}` 
        }
    })
    .then(resp => resp.json())
    .then(resp => setData(resp))
    .catch(error => console.log(error))


    }, []);


    useEffect(() => {
        if(data==null) {
            console.log("yes");
        }else {
            setTotal(data.total_applications)
            setPaymentSettled(data.payment_settled)
            setInstalled(data.installed)
            setOriApplications(applications)

            if(order==0) {
                const sortedbynewest = applications.sort(function(a, b) {
                    var c = new Date(a.date_created);
                    var d = new Date(b.date_created);
                    return d-c;
                });

                setApplications(sortedbynewest);
            }else{
                const sortedbyoldest = applications.sort(function(a, b) {
                    var c = new Date(a.date_created);
                    var d = new Date(b.date_created);
                    return c-d;
                });

                setApplications(sortedbyoldest);
            }
            
        }
        
    }, [data, order]);


    function filterCustomerCounty(county) {
        var aa = customers.filter(function (customer) {
            return customer.county == county;
        });

        var customerids = [];
        { aa.map(a => {

            return (
                customerids.push(a.customer_id)
            );

        }) }

        return customerids;
    }

    function filterApplicationCounty(filtered_customers) {
        var filt = oriapplications.filter(function (application) {
            console.log(application.app_status);
            return filtered_customers.includes(application.customer);
        });

        return filt;
    }

    function changeActive(clicked_cat) {
        var ele = $(".active_category")[0];
        $(ele).removeClass("active_category");

        if(clicked_cat=="cat_tanariver"){
            $(".cat_tanariver").addClass("active_category");
        }else if(clicked_cat=="cat_mombasa") {
            $(".cat_mombasa").addClass("active_category");
        }else if(clicked_cat=="cat_kwale") {
            $(".cat_kwale").addClass("active_category");
        }else if(clicked_cat=="cat_kalifi") {
            $(".cat_kalifi").addClass("active_category");
        }else if(clicked_cat=="cat_taitataveta") {
            $(".cat_taitataveta").addClass("active_category");
        }else{
            $(".cat_all").addClass("active_category");
        }

    }


    function searchApplicant(value) {

        var aa = customers.filter(function (customer) {
            return String(customer.id_number).includes(value);
        });

        var customerids = [];
        { aa.map(a => {

            return (
                customerids.push(a.customer_id)
            );

        }) }

        var filt = oriapplications.filter(function (application) {
            return customerids.includes(application.customer);
        });

        setApplications(filt);
    }

    function searchReference(value) {

        var filt = oriapplications.filter(function (application) {
            return String(application.ref_number).includes(value);
        });

        setApplications(filt);
    }


    useEffect(() => {
        if(counties=='mombasa') {
            changeActive("cat_mombasa");
            var filtered_customers = filterCustomerCounty('Mombasa');
            var filtered_applications = filterApplicationCounty(filtered_customers);
            setApplications(filtered_applications);
        }else if(counties=='kwale') {
            changeActive("cat_kwale");
            var filtered_customers = filterCustomerCounty('Kwale');
            var filtered_applications = filterApplicationCounty(filtered_customers);

            setApplications(filtered_applications);
        }else if(counties=='tanariver') {
            changeActive("cat_tanariver");
            var filtered_customers = filterCustomerCounty('Tana River');
            var filtered_applications = filterApplicationCounty(filtered_customers);

            setApplications(filtered_applications);
        }else if(counties=='kalifi') {
            changeActive("cat_kalifi");
            var filtered_customers = filterCustomerCounty('Kalifi');
            var filtered_applications = filterApplicationCounty(filtered_customers);

            setApplications(filtered_applications);
        }else if(counties=='taitataveta') {
            changeActive("cat_taitataveta");
            var filtered_customers = filterCustomerCounty('Taita Taveta');
            var filtered_applications = filterApplicationCounty(filtered_customers);

            setApplications(filtered_applications);
        }else {
            changeActive("cat_all");
            setApplications(oriapplications);
        }
        
    }, [counties]);

    function filterType(apptype) {
        var filt = oriapplications.filter(function (application) {
            return String(application.app_type)==apptype;
        });

        setApplications(filt);
    }


    useEffect(() => {
        if(applicationtype=='New') {
            filterType('New');
        }else if(applicationtype=='Temporary') {
            filterType('Temporary');
        }else if(applicationtype=='Routing') {
            filterType('Routing');
        }else if(applicationtype=='Additional load') {
            filterType('Additional load');
        }else if(applicationtype=='Group Application') {
            filterType('Group Application');
        }else if(applicationtype=='Meter Seperation'){
            filterType('Meter Seperation');
        }else {
            setApplications(oriapplications);
        }
        
    }, [applicationtype]);


    useEffect(() => {
        var filter_status = String(appstatus).replace(/ /g, '_');
        fetch(`http://127.0.0.1:8004/api/applications/applications/filter/${filter_status}`, {
            'method':'GET',
            headers: {
            'Content-Type':'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}` 
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            setApplications(resp);
            setOriApplications(resp);
        })
        .catch(error => console.log(error))
        
    }, [appstatus]);


     function changeStatus(applicationid) {
        APIService.UpdateApplication(applicationid, {
            "id": applicationid,
            "app_status": "Installed",
        });
        setAppStatus("Installed")
     };


    // Interaction Methods

    const [open, setOpen] = useState(false);

    function ShowClear(e) {
        if(String(e.target.value).length>1){
            $(".tags_label a").css("display", "flex");
        }else{
            $(".tags_label a").css("display", "none");
        }

        searchApplicant(e.target.value);
    }

    function ShowClearColor(e) {
        if(String(e.target.value).length>1){
            $(".colors_label a").css("display", "flex");
        }else{
            $(".colors_label a").css("display", "none");
        }

        searchReference(e.target.value)
    }

    function ClearInput(e){
        $(".tags_input").val("");
        $(".tags_label a").css("display", "none");
        setApplications(oriapplications);
        
    }

    function ClearInputColor(e){
        $(".UrlInput input").val("");
        $(".colors_label a").css("display", "none");
        $(".UrlInput label").css("display", "none");
        setApplications(oriapplications);
    }

    function ShowPrefix(e) {
        $(".UrlInput label").css("display", "flex");
    }

    function HidePrefix(e) {
        if(String(e.target.value).length==0){
            $(".UrlInput label").css("display", "none");
        }
        
    }


    return (
        <div>
        <Nav className="d-flex">
            <Logo>
                <img src="/images/logo.svg"/>
            </Logo>
            <NavMenu className="d-flex">
            </NavMenu>
            <AccNav className="d-flex">
                <NavLink className="nav-link left_nav">
                    Qoutations
                </NavLink>
                <NavLink className="nav-link left_nav">
                    Payments
                </NavLink>
                <NavLink className="nav-link left_nav">
                    Applications
                </NavLink>
                <NavLink className="nav-link">
                    Home
                </NavLink>
                <NavLink className="nav-link">
                    Applications
                </NavLink>
                <NavLink className="nav-link">
                    Customers
                </NavLink>
                <NavLink className="nav-link">
                    Analytics
                </NavLink>
                <SignUp>
                   <img src="/images/busdevclerk.jpg"/>
                </SignUp>
            </AccNav>
        </Nav>
        <MainContainer>
        <MainStats>
            <StatsContainer>
                <h5>Total Applications</h5>
                <hr />
                <h4>{total}</h4>
            </StatsContainer>
            <StatsContainer>
                <h5>Payment Settled</h5>
                <hr />
                <h4>{paymentsettled}</h4>
            </StatsContainer>
            <StatsContainer>
                <h5>Installed</h5>
                <hr />
                <h4>{installed}</h4>
            </StatsContainer>
        </MainStats>
        <TableContainer>
        <h4>All Applications</h4>
        <FilterContainers className="d-block">
                <FilterNav className="d-flex"> 
                    <FilterRank>
                        <Dropdown>
                            <Dropdown.Toggle className="dropdown_btn d-flex rank_dropdown" id="dropdown-basic">
                                {(order == 1) ? <>Oldest</> : <>Newest</>}
                                <img src="/images/sorticon.svg"/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <TypeItem onClick={() => setOrder(1)}>
                                    <Dropdown.Item>Oldest</Dropdown.Item>
                                </TypeItem>
                                <TypeItem onClick={() => setOrder(0)}>
                                    <Dropdown.Item>Newest</Dropdown.Item>
                                </TypeItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </FilterRank>
                    <FilterCategories>
                    <div className="d-flex">
                            <Link to="/applications/engineer" onClick={() => setCounties('all')}><a className="browse_category active_category cat_all">All</a></Link>
                            <Link to="/applications/engineer/mombasa" onClick={() => setCounties('mombasa')}><a className="browse_category cat_mombasa">Mombasa</a></Link>
                            <Link to="/applications/engineer/kwale" onClick={() => setCounties('kwale')}><a className="browse_category cat_kwale">Kwale</a></Link>
                            <Link to="/applications/engineer/kalifi" onClick={() => setCounties('kalifi')}> <a className="browse_category cat_kalifi">Kalifi</a></Link>
                            <Link to="/applications/engineer/tanariver" onClick={() => setCounties('tanariver')}><a className="browse_category cat_tanariver">Tana River</a></Link>
                            <Link to="/applications/engineer/taitataveta" onClick={() => setCounties('taitataveta')}><a className="browse_category cat_taitataveta">Taita Taveta</a></Link>
                        </div>
                    </FilterCategories>
                    <FilterFilter className="d-flex">
                        <Button className="d-flex filters" onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
                            <img src="/images/filtericon.svg"/>
                            Filters
                        </Button>
                    </FilterFilter>
                </FilterNav>
                <Collapse in={open}>
                    <div id="example-collapse-text" className="">
                        <FiltersContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                       <h6>Search Applicant</h6>
                                       <a onClick={ClearInput}>Clear</a>
                                    </div>
                                    <div className="tags_div">
                                        <input type="text" className="form-control tags_input" maxlength="20" onChange={ShowClear}/>
                                        <img src="/images/searchicon.svg" className="tags_searchicon"/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                   <div className="d-flex colors_label">
                                       <h6>Reference</h6>
                                       <a onClick={ClearInputColor}>Clear</a>
                                    </div>
                                    <div class="UrlInput">
                                    <label>#</label>
                                    <input type="text" className="form-control color_input" placeholder="Enter ref number" onChange={ShowClearColor} onFocus={ShowPrefix} onBlur={HidePrefix}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div className="apps_filter">
                                    <h6>Type</h6>
                                    <FilterRank>
                                    <Dropdown>
                                        <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic" >
                                            <p>{applicationtype}</p>
                                            <img src="/images/dropdown.svg"/>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                        <TypeItem onClick={() => setApptype("All types")}>
                                                <Dropdown.Item>All types</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setApptype("New")}>
                                                <Dropdown.Item>New</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setApptype("Temporary")}>
                                                <Dropdown.Item>Temporary</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setApptype("Routing")}>
                                                <Dropdown.Item>Routing</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setApptype("Additional Load")}>
                                                <Dropdown.Item>Additional load</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setApptype("Group Application")}>
                                                <Dropdown.Item>Group Application</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setApptype("Meter Seperation")}>
                                                <Dropdown.Item>Meter Seperation</Dropdown.Item>
                                            </TypeItem>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </FilterRank>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div className="downloads_filter">
                                    <h6>Status</h6>
                                    <FilterRank className="filter_dropdown">
                                    <Dropdown>
                                        <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic" >
                                            <p>{appstatus}</p>
                                            <img src="/images/dropdown.svg"/>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <TypeItem onClick={() => setAppStatus("Payment Settled")}>
                                                <Dropdown.Item>Payment Settled</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setAppStatus("Installed")}>
                                                <Dropdown.Item>Installed</Dropdown.Item>
                                            </TypeItem>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </FilterRank>
                                </div>
                            </FilterContainer>
                        </FiltersContainer>

                    </div>
                </Collapse>
            </FilterContainers>
            <table class="table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Plan</th>
                        <th>Ref No.</th>
                        <th>Status</th>
                        <th>Tech Details</th>
                        <th></th>
                        <th>Proposal</th>
                    </tr>
                </thead>
                <tbody>
                    
                { applications.map(application => {
                    return (
                    <tr key = {application.id}>
                        <td scope="row">{application.app_type}</td>
                        <td>{application.date_created}</td>
                        <td>{application.plan}</td>
                        <td>{application.ref_number}</td>
                        <td>{application.app_status}</td>
                        <td>{application.install_note}</td>
                        <td>
                            <Link to={`/applications/note/${application.id}`}>
                              <a className="docs_btn">Edit Tech Details</a>
                            </Link>
                        </td>
                        <td>
                            <Link to={`/applications/proposal/${application.id}`}>
                              <a className="docs_btn">Open Proposal</a>
                            </Link>
                        </td>
                        <td>
                            <a className="sendjob_btn" onClick={() => changeStatus(application.id)}>
                                Confirm Installation
                            </a>
                        </td>
                    </tr>
                    );
                 }) }
                </tbody>
            </table>
        </TableContainer>
        </MainContainer>
        </div>
    )
}

export default Engineer


const Nav = styled.nav`
    align-items: center;
    padding: 0px 25px 0px 25px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
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

const SignUp = styled.div`
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 88px;

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




const MainStats = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 15px 20px 0px 20px;
    left: auto;
    right: auto;
`;

const StatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 15px 50px 15px 20px;
    background: #299E98;
    align-text: center;
    border-radius: 8px;
    

    h5 {
        color: rgba(32, 48, 60, 0.7);
        font-size: 15px;
        font-weight: 400;
        margin:0;
        padding: 0;
        color: #ffffff;
    }
    h4 {
        font-size: 30px;
        font-weight: 500;
        color: #ffffff;
    }

    h4 {
        align-text: center;
        margin:0;
        padding: 0;
        color: #ffffff;
    }


    hr {
        margin: 1rem 0;
        color: inherit;
        background-color:  #ffffff;
        border: 1;
        opacity: 1;
        width: 100%;
    }
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: #f6f6f9;

`;

const TableContainer = styled.div`
    padding: 20px;
    border-radius: 10px;
    background: #ffffff;
    margin: 20px;

    .file_input {
        z-index: 9;
        position: absolute;
        margin-top: -27px;
        opacity: 0;
        width: 121px;
    }

    h4 {
        text-align: -webkit-left;
    }

    .uploaded {
        font-size: 11px;
        background: rgba(0, 163, 0, 0.1);
        color: rgba(0, 163, 0, 1);
        font-weight: regular;
        margin-top: -6px;
        
        padding: 9px 13px 9px 13px;
        border-radius: 5px;
        font-size: 13px;
    }

    .notuploaded {
        font-size: 11px;
        background: rgba(255, 165, 0, 0.1);
        color: rgba(255, 165, 0, 1);
        padding: 8px;
        font-weight: regular;
        margin-top: -6px;
        margin-left: 4px;
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

    .sendjob_btn {
        background: rgba(32, 48, 60, 0.1);
        text-decoration: none;
        color: #20303c!important;
        padding: 9px 13px 9px 13px;
      
        border-radius: 5px;
        font-size: 13px;

        &:hover {
            background: rgba(32, 48, 60, 0.3);
        }

        img {
            margin-right: 5px;
            width: 17px;
        }
    }

    .upload_btn {
        background: rgba(32, 48, 60, 0.1);
        text-decoration: none;
        color: #20303c!important;
        padding: 9px 13px 9px 13px;
        border-radius: 5px;
        font-size: 13px;

        &:hover {
            background: rgba(32, 48, 60, 0.3);
        }

        img {
            margin-right: 5px;
        }
    }
`;

const FilterContainers = styled.div`
    padding: 30px 0px 30px 0px;
`;

const FilterNav = styled.div`
    align-items: center;

    #example-collapse-text {
        border: none;
        display: flex;
    }
`;

const FilterCollection = styled.div``;

const FilterRank = styled.div`
    display: flex;
    flex: 1;
    
    .dropdown_btn {
        background: transparent!important;
        border-radius: 7px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        color: #20303c;
        font-size: 14px;
        font-weight: 400;
        padding: 8px 15px 8px 18px;

        &:hover {
            color: #20303c;
            border-color: rgba(41, 158, 152, 0);
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
            color: #20303c;
            background: transparent;
            border: 1px solid rgba(41, 158, 152, 0);
            -webkit-box-shadow: 0 0 0 4px rgb(41 158 152 / 10%);
            box-shadow: 0 0 0 4px rgb(41 158 152 / 10%);
            
        }

    }

    .btn-check:active+.btn-primary:focus, .btn-check:checked+.btn-primary:focus, .btn-primary.active:focus, .btn-primary:active:focus, .show>.btn-primary.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.25rem rgb(41 158 152 / 10%);
    }

    .dropdown-toggle::after {
        margin-left: 1.75em;
    }

    #dropdown-basic::after{
        display: none; 
    }

    img {
        width: 20px;
        margin-left: 20px;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    }

    .dropdown-menu {
        margin-top: 9px!important;
        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.06);
        -webkit-box-shadow: 0px 3px 5px rgb(0 0 0 / 4%);
        box-shadow: 0px 3px 5px rgb(0 0 0 / 4%);
        color: rgba(41, 158, 152, 0.6);
    }

    .dropdown-item:focus {
        .dropdown_btn {
            background: transparent;
            color: rgba(41, 158, 152, 0.6);
            border-color: rgba(41, 158, 152,0.1);
            -webkit-box-shadow: 0 0 0 4px rgb(41 158 152 / 10%);
            box-shadow: 0 0 0 4px rgb(41 158 152 / 10%);

        }
        background: #e9ecef;
        
    }

    hr {
        margin: 0.5rem 0;
        opacity: 0.08;
    }

    .show {
        img {
            transform: rotate(180deg);
        }
    }

    a {
        color: #20303c!important;
        font-size: 13px;
        font-weight: 350;
        padding: 8px 40px 8px 18px;

        &:hover {
            color: #20303c;
        }
    }

    .popular_item {
        color: rgba(41, 158, 152, 1)!important;
        font-size: 14px;
        font-weight: 600;
        padding-bottom: 10px;

        &:hover {
            color: rgba(41, 158, 152, 1);
        }
    }

`;

const FilterCategories = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    a {
        text-decoration: none;
        color: #20303c!important;
        font-weight: 350;
        padding: 10px;
        font-size: 15px;
        cursor: pointer;

        &:hover {
            color: rgba(41, 158, 152, 1);
        }
    }

    .active_category {
        border-radius: 10px;
        color: #ffffff!important;
        background: #299E98;
        padding: 8px 13px;
        font-weight: 390;
    }


`;

const FilterFilter = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;

    img {
        width: 20px;
        margin-right: 9px;
    }

    .filters {
        font-size: 15px;
        align-items: center;
        color: #20303c;
        padding: 8px 14px 8px 14px;
        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.04);
        background: transparent;

        &:active {
            background: transparent;
            color: #20303c;
            border-color: rgba(41, 158, 152,0);
            -webkit-box-shadow: 0 0 0 4px rgb(41 158 152 / 10%);
            box-shadow: 0 0 0 4px rgb(41 158 152 / 10%);
        }


        &:focus {
            background: transparent;
            color: #20303c;
            border-color: rgba(41, 158, 152,0);
            -webkit-box-shadow: 0 0 0 4px rgb(41 158 152 / 10%);
            box-shadow: 0 0 0 4px rgb(41 158 152 / 10%);
            
        }

        &:hover {
            border-color: rgba(41, 158, 152,0.1);
            -webkit-box-shadow: 0 0 0 4px rgb(41 158 152 / 10%);
            box-shadow: 0 0 0 4px rgb(41 158 152 / 10%);
        }

    }
`;

const FiltersContainer = styled.div`
    display: flex;
    margin-top: 30px;


`;

const FilterContainer = styled.div`
    flex: 1;

    h6 {
        color: #20303c;
        text-align: -webkit-auto;
        
    }




    div {
        width: 100%;



        input {
            width: 80%;
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
                text-indent: 16%;
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
        width: 80%;
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

    .app_img {
        transform: rotate(0deg)!important;
        width: 15px;
        margin-left: 2px;
        margin-right: 10px;

    }

`;

const TypeItem = styled.div``;



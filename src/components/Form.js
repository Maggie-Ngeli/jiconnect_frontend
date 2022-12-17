import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink, Modal, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import APIService from '../APIService';
import LatLon from '../scripts/latlon-spherical';
import $ from 'jquery';
import {UTMConv} from "../scripts/utmconv";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Collapse from 'react-bootstrap/Collapse'

function Form(props) {

    // Data Functions

    const [location, setLocation] = useState('');
    const [maplatlon, setLatlon] = useState('');
    const [applicationtype, setApptype] = useState('New');
    const [plan, setPlan] = useState('Standard');
    const [refnumber, setRefnumber] = useState('');
    const [appliances, setAppliances] = useState("No Appliances");
    const [supply, setSupply] = useState("No I don't Agree");
    const [wayleave, setWayleave] = useState("No I don't Agree");

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
        if(customer==null) {
            getLocation();
        }else {
            setRefnumber(makeref(customer.area_code));
        }
        
    }, [customer]);

    useEffect(() => {
        if(customer!=null) {
            setRefnumber(makeref(customer.area_code));
        }
      }, [applicationtype]);

    const createApplication = () => {
        APIService.CreateApplication({
            "customer": 1,
            "app_type": applicationtype,
            "plan": plan,
            "location": location,
            "app_status": "Under Review",
            "ref_number": refnumber,
            "site_info": "null",
            "agree_supply": supply,
            "agree_wayleave": wayleave,
            "qoutation": "null",
            "appcontrol": "null",
            "install_note": "null",
            "proposal": "null",
            "maplatlon": maplatlon,
            "payment": "null",
            "numapps": "null",
            "allappliances": allappliances,
        })
    }

    // Location and Ref Number 


    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
          console.log("Geolocation is not supported by this browser.");
        }
    }
     
     
     function makeref(code){
         var apptype = String({applicationtype}.applicationtype).substring(0,1);
         //var areacode = $("#customervcode").text();
         if(!isNaN(parseInt(code))) {
            var areacode = code;
         }else{
             return "Update Area code in profile first"
         }
         
         var d = new Date();
         var appyear = d.getFullYear();
         
         //Months Formarting
         var premonth = d.getMonth();
         if(String(premonth).length>=2){
             var appmonth = String(premonth);
         }else{
             var str1 = "0";
             var appmonth = str1.concat(String(premonth));
         }
         
         //Job sequence number formatting
         var prejobseq = Math.floor(Math.random() * 1000) + 1;
         if(String(prejobseq).length==1){
             var str1 = "000";
             var jobseqnum = str1.concat(String(prejobseq));
         }
         else if(String(prejobseq).length==2){
             var str1 = "00";
             var jobseqnum = str1.concat(String(prejobseq));
         }
         else if(String(prejobseq).length==3){
             var str1 = "0";
             var jobseqnum = str1.concat(String(prejobseq));
         }
         else{
             var jobseqnum = String(prejobseq);
         }
         
         
         var refnum = apptype+String(areacode)+String(appyear)+appmonth+String(jobseqnum);
         return refnum;
     };

    function truncate(n) {
        return n > 0 ? Math.floor(n) : Math.ceil(n);
    };

    let getDMS = function (dd, longOrLat) {
        let hemisphere = /^[WE]|(?:lon)/i.test(longOrLat)
        ? dd < 0
          ? "W"
          : "E"
        : dd < 0
          ? "S"
          : "N";

        const absDD = Math.abs(dd);
        const degrees = truncate(absDD);
        const minutes = truncate((absDD - degrees) * 60);
        const seconds = ((absDD - degrees - minutes / 60) * Math.pow(60, 2)).toFixed(2);

        let dmsArray = [degrees, minutes, seconds, hemisphere];
        return `${dmsArray[0]},${dmsArray[1]},${dmsArray[2]}, ${dmsArray[3]}`;
    };
    
    function showPosition(position) {
      console.log("here");
      var utmObj = require('utm-latlng');
      var utm = new utmObj(); //Default Ellipsoid is 'WGS 84'
      var utmz_results = utm.convertLatLngToUtm(position.coords.latitude, position.coords.longitude,5);
      setLatlon(String(position.coords.latitude+","+position.coords.longitude))
        
      var utmzone = "UTM Zone = " + String(utmz_results.ZoneLetter)+" "+String(utmz_results.ZoneNumber) + " Easting = " + String(utmz_results.Easting) + " Northing = " + String(utmz_results.Northing);
      setLocation(utmzone);
      console.log(location);

    };

    // Get Appliances

    function getAppliances() {
        return [["a1"], ["a2"]]
    }


    // App Fields Functions

    const [wayleaveshow, setWayleaveShow] = useState(false);

    const handleWayleaveClose = () => setWayleaveShow(false);
    const handleWayleaveShow = () => setWayleaveShow(true);

    const [supplyshow, setSupplyShow] = useState(false);

    const handleSupplyClose = () => setSupplyShow(false);
    const handleSupplyShow = () => setSupplyShow(true);


    const [applianceshow, setApplianceShow] = useState(false);

    const handleApplianceClose = () => setApplianceShow(false);
    const handleApplianceShow = () => setApplianceShow(true);



    // Appliances Tables

    const [open, setOpen] = useState(false);
    const [home, setHome] = useState('---------'); //Home APplicances
    const [consumption, setConsumption] = useState(0);
    const [qty, setQty] = useState(0);
    const [allappliances, setAllappliances] = useState([]);


    function createData(appliance, consumption, units, qty, total) {
        return { appliance, consumption, units, qty, total };
    }
    
    const rows = [];

    // createData('Stove', 159, 'kWh', 24, 4.0),
    

    const CreateAppliance = (row) => {
        rows.push(row);
    }

    const resetAppliances = () => {
        setHome('---------');
        setConsumption(0);
        setQty(0);
    }

    const clearAppliances = () => {
        resetAppliances();
        setAllappliances([]);
        rows.length = 0;
    }
      


    return (
        <div>
           { props.application ? (
            <form className='applicationform'>
                <h3>Start New <br/>Application</h3>
                <hr/>
                <FilterContainer>
                    <div className="apps_filter">
                        <h6>Application Type</h6>
                        <FilterRank>
                        <Dropdown>
                            <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic" >
                                <p>{applicationtype}</p>
                                <img src="/images/dropdown.svg"/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
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
                    <div className="apps_filter">
                        <h6>Plan</h6>
                        <FilterRank>
                        <Dropdown>
                            <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                                <p>{plan}</p>
                                <img src="/images/dropdown.svg"/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <TypeItem onClick={() => setPlan("Standard")}>
                                    <Dropdown.Item>Standard</Dropdown.Item>
                                </TypeItem>
                                <TypeItem onClick={() => setPlan("Premium")}>
                                    <Dropdown.Item>Premium</Dropdown.Item>
                                </TypeItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </FilterRank>
                    </div>
                </FilterContainer>
                <FilterContainer>
                    <div>
                        <div className="d-flex tags_label">
                            <h6>Location</h6>
                        </div>
                        <div className="tags_div">
                            <input type="text" className="form-control tags_input" name="location" value = {location} disabled/>
                        </div>
                    </div>
                </FilterContainer>
                <FilterContainer>
                    <div>
                        <div className="d-flex tags_label">
                            <h6>Ref Number</h6>
                        </div>
                        <div className="tags_div">
                            <input type="text" className="form-control tags_input" maxlength="20" value = {refnumber} disabled/>
                        </div>
                    </div>
                </FilterContainer>
                <FilterContainer>
                    <div className="apps_filter">
                        <h6>Home Applicances</h6>
                        <a onClick={handleApplianceShow}><p className="applicances_btn">Add Applicances</p></a>
                        <FilterRank>
                        <Dropdown>
                            <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                                {(appliances == "No Appliances") ? <p>No Appliances</p> : <p>Added Appliances</p>}
                                <img src="/images/dropdown.svg"/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <TypeItem onClick={() => setAppliances("No Applicance")}>
                                    <Dropdown.Item>No Applicances</Dropdown.Item>
                                </TypeItem>
                                <TypeItem onClick={() => setAppliances(getAppliances())}>
                                    <Dropdown.Item>Added Appliances</Dropdown.Item>
                                </TypeItem>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Modal show={applianceshow} onHide={handleApplianceClose} size="lg" aria-labelledby="contained-modal-title-vcenter" sx={{height: 700,}}>
                            <Modal.Header closeButton>
                            <Modal.Title>Appliance Agreement</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <TableContainer>
                                <ApplianceForm>
                                    <SubmitForm style={{textAlign: 'center', background: 'rgba(32,48,60,0.1)', color: 'rgba(32,48,60,1)'}} onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
                                        Add Appliance
                                    </SubmitForm>
                                    <div >
                                        <Collapse in={open}>
                                        <div id="example-collapse-text">
                                            <Card body style={{width: '100%'}}>
                                                <FieldsContainer>
                                                <Table sx={{ minWidth: 650,}} aria-label="simple table">
                                                            <TableHead>
                                                            <TableRow>
                                                                <TableCell>Appliances</TableCell>
                                                                <TableCell align="right">Consumption</TableCell>
                                                                <TableCell align="right">Units</TableCell>
                                                                <TableCell align="right">Quantity</TableCell>
                                                                <TableCell align="right">Total</TableCell>
                                                            </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                            <TableRow
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                <TableCell component="th" scope="row">
                                                                <FilterRank>
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic" >
                                                                            <p className="appliance_name">{home}</p>
                                                                            <img src="/images/dropdown.svg"/>
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu>
                                                                            
                                                                            <TypeItem onClick={() => setHome('Light Bulb')}>
                                                                                <Dropdown.Item>Light Bulb</Dropdown.Item>
                                                                            </TypeItem>
                                                                            <TypeItem onClick={() => setHome('Socket')}>
                                                                                <Dropdown.Item>Socket</Dropdown.Item>
                                                                            </TypeItem>
                                                                            <TypeItem onClick={() => setHome('Cooker')}>
                                                                                <Dropdown.Item>Cooker</Dropdown.Item>
                                                                            </TypeItem>
                                                                            <TypeItem onClick={() => setHome('Water Heater')}>
                                                                                <Dropdown.Item>Water Heater</Dropdown.Item>
                                                                            </TypeItem>
                                                                            <TypeItem onClick={() => setHome('Oven')}>
                                                                                <Dropdown.Item>Oven</Dropdown.Item>
                                                                            </TypeItem>
                                                                            <TypeItem onClick={() => setHome('Single Phase Motor')}>
                                                                                <Dropdown.Item>Single Phase Motor</Dropdown.Item>
                                                                            </TypeItem>
                                                                            <TypeItem onClick={() => setHome('Three Phase Motor')}>
                                                                                <Dropdown.Item>Three Phase Motor</Dropdown.Item>
                                                                            </TypeItem>
                                                                            <TypeItem onClick={() => setHome('Air Conditioner')}>
                                                                                <Dropdown.Item>Air Conditioner</Dropdown.Item>
                                                                            </TypeItem>
                                                                            <TypeItem onClick={() => setHome('Furnace')}>
                                                                                <Dropdown.Item>Furnace</Dropdown.Item>
                                                                            </TypeItem>
                                                                            <TypeItem onClick={() => setHome('Other')}>
                                                                                <Dropdown.Item>Other</Dropdown.Item>
                                                                            </TypeItem>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </FilterRank>
                                                                </TableCell>
                                                                <TableCell align="right"><input type="number" placeholder="0" min="0" width="30px" value={consumption} onChange={(e) => setConsumption(e.target.value)}/></TableCell>
                                                                <TableCell align="right">kWh</TableCell>
                                                                <TableCell align="right"><input type="number" placeholder="0" min="0" width="30px" value={qty} onChange={(e) => setQty(e.target.value)}/></TableCell>
                                                                <TableCell align="right">{consumption*qty}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                    <ButtonContainer>
                                                        <Discard onClick={() => {
                                                            setOpen(!open);
                                                            resetAppliances();
                                                        }} >
                                                            Cancel
                                                        </Discard>
                                                        {(consumption*qty>0 && home!='---------') ? 
                                                        <SubmitForm onClick={() => {
                                                            setOpen(!open);
                                                            resetAppliances();
                                                            CreateAppliance(createData(home, consumption, "kWh", qty, consumption*qty));
                                                            setAllappliances([...allappliances, ...rows]);
                                                        }}>
                                                            Save Changes
                                                        </SubmitForm>
                                                        : 
                                                        <SubmitForm onClick={() => setOpen(!open)} style={{ background: 'rgba(32,48,60,0.2)', color: 'white' }}>
                                                            Save Changes
                                                        </SubmitForm>
                                                        }
                                                    </ButtonContainer>
                                                </FieldsContainer>
                                            </Card>
                                        </div>
                                        </Collapse>
                                    </div>
                                </ApplianceForm>

                                <Table sx={{ minWidth: 650,}} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Appliances</TableCell>
                                        <TableCell align="right">Consumption</TableCell>
                                        <TableCell align="right">Units</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {allappliances.map((row) => (
                                            <TableRow
                                            key={row.appliance}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <TableCell align="right">{row.appliance}</TableCell>
                                            <TableCell align="right">{row.consumption}</TableCell>
                                            <TableCell align="right">{row.units}</TableCell>
                                            <TableCell align="right">{row.qty}</TableCell>
                                            <TableCell align="right">{row.total}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            </Modal.Body>
                            <Modal.Footer>
                            <p onClick={() => clearAppliances()} style={{margin: '0px', fontSize: '14px', textDecoration: 'underline', marginRight: '10px', cursor: 'pointer', "&:hover": { color: "rgba(41, 158, 152, 1)"}}}>Clear All</p>
                            <Discard onClick={handleApplianceClose}>
                                Done
                            </Discard>
                            </Modal.Footer>
                        </Modal>
                    </FilterRank>
                    </div>
                </FilterContainer>
                <FilterContainer>
                    <div className="apps_filter">
                        <h6>Supply Agreement</h6>
                        <a onClick={handleSupplyShow}><p className="applicances_btn btn-warning">Read Supply Ts&amp;Cs before accepting</p></a>
                        <FilterRank>
                        <Dropdown>
                            <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                                {(supply == "No I don't Agree") ? <p>No I don't Agree</p> : <p>Yes I Agree</p>}
                                <img src="/images/dropdown.svg"/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <TypeItem onClick={() => setSupply("No I don't Agree")}>
                                    <Dropdown.Item>No I don't Agree</Dropdown.Item>
                                </TypeItem>
                                <TypeItem onClick={() => setSupply("Yes I Agree")}>
                                    <Dropdown.Item>Yes I Agree</Dropdown.Item>
                                </TypeItem>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Modal show={supplyshow} onHide={handleSupplyClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Supply Agreement</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>1/We the undersigned owner/tenant/occupier of the premises stated under the title of supply data agree with the company to take a supply of Electrical energy at the mentioned premises to all the lamps, apparatus and motors installed not exceeding the KVA stated in the item And (KVA) and in respect of any variation I/We agree to notify the company under the Methods of Charge contained in the Methods of Charge (Kenya Power) Byelaws 19............. as amended from time to time or in any Byelaws substituted therefore and as specified below'and!

                            We herehy agree: .

                            a) To pay the charges for such supply from time to time as published by the Company pursuit to Section 73 of the Electric Power Act.

                            b) That the provisions of and conditions contained in the supply Contract and Conditions (EAP&amp;L) Byelaws 1953 as ammended from time to time shall be the basis of and form part of my/our contract with the Company

                            c) To allow authourised Kenya Power personnel entry into the premises of supply for purposes of reading the meter, and inspecting the installation to ascertain that the same is in a good working order.

                            d) To avoid any kind of meter damage and/or meter tampering so as to avoid unauthorised/fraudulent use of electricity. The maximum demand of this supply will not exceed the KVA stated in the item AMD (KVA)withouth the written consent of the company.

                            The methods of charge are specified in Methods of Charge (Kenya Power) Byelaws 19............. as amended from time to time

                            or in any Byelaws substituted therefore, and the prices are published in the Company's Schedule of “Prices for - Electrical Suppliés in Kenya”.

                            For and on behalf of the customer. We undertake to supply above subject to the provisions of Electric Power At and all Rules and Byelaws from time to time to in force thereunder. For and on behalf of KENYA POWER

                            Choose "Yes I agree" below to confirm and Submit.
                            </Modal.Body>
                            <Modal.Footer>
                            <Discard onClick={handleSupplyClose}>
                                Close
                            </Discard>
                            </Modal.Footer>
                        </Modal>
                    </FilterRank>
                    </div>
                </FilterContainer>
                <FilterContainer>
                    <div className="apps_filter">
                        <h6>Wayleave Agreement</h6>
                        <a onClick={handleWayleaveShow}><p className="applicances_btn">Read Wayleave Ts&amp;Cs before accepting</p></a>
                        <FilterRank>
                        <Dropdown>
                        <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                                {(wayleave == "No I don't Agree") ? <p>No I don't Agree</p> : <p>Yes I Agree</p>}
                                <img src="/images/dropdown.svg"/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                 <TypeItem onClick={() => setWayleave("No I don't Agree")}>
                                    <Dropdown.Item>No I don't Agree</Dropdown.Item>
                                </TypeItem>
                                <TypeItem onClick={() => setWayleave("Yes I Agree")}>
                                    <Dropdown.Item>Yes I Agree</Dropdown.Item>
                                </TypeItem>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Modal show={wayleaveshow} onHide={handleWayleaveClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Wayleave Agreement</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            I/We being the proprietor of parcel of land comprised in Title No hereby consent to The Kenya Power laying or erecting an electric supply line on my side of land and from time to time entering upon and having access to my said piece of land for the purposes of constructing, laying, maintaining, using, removing and replacing the electric supply line.

                            I undertake not to interfere or permit any interference with the electric supply line nor to construct buildings, plant trees or dump waste materials beneath the electric supply line. I also undertake that this consent shall be irrevocable.

                            I have supplied copies of Title deed and Land search documents as proof of ownership.

                            Choose "Yes I agree" below to confirm and Submit.
                            </Modal.Body>
                            <Modal.Footer>
                            <Discard onClick={handleWayleaveClose}>
                                Close
                            </Discard>
                            </Modal.Footer>
                        </Modal>
                    </FilterRank>
                    </div>
                </FilterContainer>
                <hr/>
                <ApplicationButtons>
                    <Discard>
                        <button className = "btn">Discard</button>
                    </Discard>
                    <SubmitForm>
                        <button onClick = {createApplication} className = "btn">Submit Application</button>
                    </SubmitForm>
                </ApplicationButtons>
            </form>

            ) : null}


        </div>
    )
}
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

export default Form


const FilterRank = styled.div`
    display: flex;
    .dropdown_btn {
        background: transparent!important;
        border-radius: 7px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        color: #20303c;
        font-size: 14px;
        font-weight: 400;
        padding: 8px 15px 8px 18px;
        display: flex;
        align-items: center;
        flex-direction: row;

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
        width: 13px;
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

    .appliance_name {
        margin: 0px;
        margin-right: 10px;
        font-size: 14px;
    }



`;

const FilterContainer = styled.div`
    margin-top: 20px;
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


const ApplicationButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
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

const ApplianceForm = styled.div`
`;

const FieldsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 10px;
`;
const TypeItem = styled.div``;



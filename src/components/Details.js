import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import APIService from '../APIService';
import { Link } from "react-router-dom";

function Details() {

    const [customer, setCustomer] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [middle_name, setMiddlename] = useState(null);
    const [last_name, setLastname] = useState(null);
    const [id_type, setIdtype] = useState(null);
    const [id_number, setIdnumber] = useState(null);
    const [pin, setPin] = useState(null);
    const [county, setCounty] = useState(null);
    const [po_box, setPobox] = useState(null);
    const [town, setTown] = useState(null);
    const [constituency, setContituency] = useState(null);
    const [ward, setWard] = useState(null);
    const [lr_number, setLrnumber] = useState(null);
    const [estate_village, setEstate] = useState(null);
    const [area_code, setAreacode] = useState(null);
    const [ccp, setCcp] = useState(null);
    const [voltage, setVoltage] = useState(null);
    const [connect_type, setConnecttype] = useState(null);
    const [amd, setAmd] = useState(null);
    const [id_document, setIddocument] = useState(null);
    const [pin_certificate, setPincertificate] = useState(null);
    const [title_deed, setTitledeed] = useState(null);
    const [wiring_certificate, setWiringcertificate] = useState(null);
    const [site_plan, setSiteplan] = useState(null);

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
            console.log("yes");
        }else {
            setName(customer.name)
            setEmail(customer.email)
            setPhone(customer.phone)
            setMiddlename(customer.middle_name)
            setLastname(customer.last_name)
            setIdtype(customer.id_type)
            setIdnumber(customer.id_number)
            setPin(customer.pin)
            setCounty(customer.county)
            setPobox(customer.po_box)
            setTown(customer.town)
            setWard(customer.ward)
            setLrnumber(customer.lr_number)
            setEstate(customer.estate_village)
            setAreacode(customer.area_code)
            setCcp(customer.ccp)
            setVoltage(customer.voltage)
            setConnecttype(customer.connect_type)
            setIddocument(customer.id_document)
            setPincertificate(customer.pin)
            setTitledeed(customer.title_deed)
            setWiringcertificate(customer.wiring_certificate)
            setSiteplan(customer.site_plan)
            setCounty(customer.county)
            setContituency(customer.constituency)
            console.log(customer.ward)

        }
        
    }, [customer]);

    



    function getBase64(file, btn) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          if(btn=="id_document"){
            setIddocument(reader.result);
          }else if(btn=="pin") {
            setPincertificate(reader.result);
          }else if(btn=="title_deed"){
            setTitledeed(reader.result);
          }
          else if(btn=="wc"){
            setWiringcertificate(reader.result);
          }else{
            setSiteplan(reader.result);
          }
          
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }
    

    const createProfile = () => {
        APIService.CreateProfile({
            "name": name,
            "phone": phone,
            "email": email,
            "middle_name": middle_name,
            "last_name": last_name,
            "id_type": id_type,
            "id_number": id_number,
            "pin": pin,
            "county": county,
            "po_box": po_box,
            "town": town,
            "constituency": constituency,
            "ward": ward,
            "lr_number": lr_number,
            "estate_village": estate_village,
            "area_code": area_code,
            "ccp": ccp,
            "voltage": voltage,
            "connect_type": connect_type,
            "amd": amd,
            "id_document": id_document,
            "pin_certificate": pin_certificate,
            "title_deed": title_deed,
            "wiring_certificate": wiring_certificate,
            "site_plan": site_plan,
        });
    }

    return (
        <div>
            <FormsContainer>
                <Row>
                    <Col xs={12} md={4} lg={4}>
                        <InfoContainer>
                            <h4>Personal Info</h4>
                            <hr />
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>Name</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="text" className="form-control tags_input" name="name" value = {(customer == null) ? name : (customer.name == null) ? name : customer.name} onChange={e => setName(e.target.value)}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>Email</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="text" className="form-control tags_input" name="email" value = {(customer == null) ? email : (customer.email == null) ? email : customer.email} onChange={e => setEmail(e.target.value)}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>Cell Number</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="text" className="form-control tags_input" name="cellnumber" value = {(customer == null) ? phone : (customer.phone == null) ? phone : customer.phone} onChange={e => setPhone(e.target.value)}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>Middle Name</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="text" className="form-control tags_input" name="middlename" value = {(customer == null) ? middle_name : (customer.middle_name == null) ? middle_name : customer.middle_name} onChange={e => setMiddlename(e.target.value)}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>Lastname</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="text" className="form-control tags_input" name="lastname" value = {(customer == null) ? last_name : (customer.last_name == null) ? last_name : customer.last_name} onChange={e => setLastname(e.target.value)}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>ID Type</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="text" className="form-control tags_input" name="idtype" value = {(customer == null) ? id_type : (customer.id_type == null) ? id_type : customer.id_type} onChange={e => setIdtype(e.target.value)}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>ID /Certificate Registration No.</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="text" className="form-control tags_input" name="idnum" value = {(customer == null) ? id_number : (customer.id_number == null) ? id_number : customer.id_number} onChange={e => setIdnumber(e.target.value)}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <h4>Demographics</h4>
                            <hr />
                            <FilterContainer>
                                <div className="apps_filter">
                                    <h6>County</h6>
                                    <FilterRank>
                                    <Dropdown>
                                        <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                                            {(customer == null) ? <p>- - - - - - - - - - - - - - - - -</p> : (county == null) ? <p>- - - - - - - - - - - - - - - - -</p> : <p>{county}</p>}
                                            <img src="/images/dropdown.svg"/>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                           <TypeItem onClick={() => setCounty("Mombasa")}>
                                                <Dropdown.Item>Mombasa</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setCounty("Kwale")}>
                                                <Dropdown.Item>Kwale</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setCounty("Kilifi")}>
                                                <Dropdown.Item>Kilifi</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setCounty("Tana River")}>
                                                <Dropdown.Item>Tana River</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setCounty("Taita Taveta")}>
                                                <Dropdown.Item>Taita Taveta</Dropdown.Item>
                                            </TypeItem>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </FilterRank>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>PO Box</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="text" className="form-control tags_input" name="pobox" value = {(customer == null) ? po_box : (customer.po_box == null) ? po_box : customer.po_box} onChange={e => setPobox(e.target.value)}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>Town</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="text" className="form-control tags_input" name="town" value = {(customer == null) ? town : (customer.town == null) ? town : customer.town} onChange={e => setTown(e.target.value)}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div className="apps_filter">
                                    <h6>Constituency</h6>
                                    <FilterRank>
                                    <Dropdown>
                                        <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                                        {(customer == null) ? <p>- - - - - - - - - - - - - - - - -</p> : (constituency == null) ? <p>- - - - - - - - - - - - - - - - -</p> : <p>{constituency}</p>}
                                            <img src="/images/dropdown.svg"/>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                           <TypeItem onClick={() => setContituency("Changamwe")}>
                                                <Dropdown.Item>Changamwe</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Jomvu")}>
                                                <Dropdown.Item>Jomvu</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Kisauni")}>
                                                <Dropdown.Item>Kisauni</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Nyali")}>
                                                <Dropdown.Item>Nyali</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Likoni")}>
                                                <Dropdown.Item>Likoni</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Mvita")}>
                                                <Dropdown.Item>Mvita</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Msambweni")}>
                                                <Dropdown.Item>Msambweni</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Lunga Lunga")}>
                                                <Dropdown.Item>Lunga Lunga</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Matuga")}>
                                                <Dropdown.Item>Matuga</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Kinango")}>
                                                <Dropdown.Item>Kinango</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Kilifi North")}>
                                                <Dropdown.Item>Kilifi North</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Kilifi South")}>
                                                <Dropdown.Item>Kilifi South</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Kaloleni")}>
                                                <Dropdown.Item>Kaloleni</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Rabai")}>
                                                <Dropdown.Item>Rabai</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Ganze")}>
                                                <Dropdown.Item>Ganze</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Malindi")}>
                                                <Dropdown.Item>Malindi</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Magarini")}>
                                                <Dropdown.Item>Magarini</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Garsen")}>
                                                <Dropdown.Item>Garsen</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Galole")}>
                                                <Dropdown.Item>Galole</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Bura")}>
                                                <Dropdown.Item>Bura</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Lamu East")}>
                                                <Dropdown.Item>Lamu East</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Lamu West")}>
                                                <Dropdown.Item>Lamu West</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Taveta")}>
                                                <Dropdown.Item>Taveta</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Wundanyi")}>
                                                <Dropdown.Item>Wundanyi</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Mwatate")}>
                                                <Dropdown.Item>Mwatate</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem onClick={() => setContituency("Voi")}>
                                                <Dropdown.Item>Voi</Dropdown.Item>
                                            </TypeItem>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </FilterRank>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div className="apps_filter">
                                    <h6>Ward</h6>
                                    <FilterRank>
                                    <Dropdown>
                                        <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                                        {(customer == null) ? <p>- - - - - - - - - - - - - - - - -</p> : (ward == null) ? <p>- - - - - - - - - - - - - - - - -</p> : <p>{ward}</p>} 
                                            <img src="/images/dropdown.svg"/>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <TypeItem onClick={() => setWard("CHAANI")}>
                                                <Dropdown.Item>CHAANI</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("AIRPORT")}>
                                                <Dropdown.Item>AIRPORT</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("PORT REITZ")}>
                                                <Dropdown.Item>PORT REITZ</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("KIPEVU")}>
                                                <Dropdown.Item>KIPEVU</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("JOMVU KUU")}>
                                                <Dropdown.Item>JOMVU KUU</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("MAGONGO")}>
                                                <Dropdown.Item>MAGONGO</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("MIKINDANI")}>
                                                <Dropdown.Item>MIKINDANI</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("SHANZU")}>
                                                <Dropdown.Item>SHANZU</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("MWAKIRUNGE")}>
                                                <Dropdown.Item>MWAKIRUNGE</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("MJAMBERE")}>
                                                <Dropdown.Item>MJAMBERE</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("MAGOGONI")}>
                                                <Dropdown.Item>MAGOGONI</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("JUNDA")}>
                                                <Dropdown.Item>JUNDA</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("MTOPANGA")}>
                                                <Dropdown.Item>MTOPANGA</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("BAMBURI")}>
                                                <Dropdown.Item>BAMBURI</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("MKOMANI")}>
                                                <Dropdown.Item>MKOMANI</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("KONGOWEA")}>
                                                <Dropdown.Item>KONGOWEA</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("KADZANDANI")}>
                                                <Dropdown.Item>KADZANDANI</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("ZIWA LA NG'OMBE")}>
                                                <Dropdown.Item>ZIWA LA NG'OMBE</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("FRERE TOWN")}>
                                                <Dropdown.Item>FRERE TOWN</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("MTONGWE")}>
                                                <Dropdown.Item>MTONGWE</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("TIMBWANI")}>
                                                <Dropdown.Item>TIMBWANI</Dropdown.Item>
                                            </TypeItem>
                                             <TypeItem onClick={() => setWard("BOFU")}>
                                                <Dropdown.Item>BOFU</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>LIKONI</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>SHIKA ADABU</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>MJI WA KALE/ MAKADARA</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>TUDOR</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>TONONOKA</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>SHIMANZI/ GANJONI</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>MAJENGO</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>RAMISI</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>GOMBATO BONGWE</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>UKUNDA</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>KINONDO</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>PONGWE KIDIMU/KIGWEDE</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>VANGA</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>MWERENI</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>DZOMBO</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>KUBO SOUTH</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>MKONGANI</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>TSIMBA GOLINI</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>TIWI</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>WAA</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>MACKINON ROAD</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>NDAVAYA</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>PUMA</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>KINANGO</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>KASEMENI</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>MWAVUMBO</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>CHENGONI/SAMBURU</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>MATSANGONI</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>MNARANI</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>SOKONI</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>TEZO</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>KIBARANI</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>WATAMU</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>DABASO</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>JUNJU</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>SHIMO LA TEWA</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>MTEPENI</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>CHASIMBA</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>MWARAKAYA</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>KAYAFUNGO</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>MARIAKANI</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>MWANAMWINGA</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>KALOLENI</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>JIBANA/KAMBE/RIBE</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>MAZERASRABAI/KISURUTINI</Dropdown.Item>
                                            </TypeItem>
                                            <TypeItem>
                                                <Dropdown.Item>MWAWESA</Dropdown.Item>
                                            </TypeItem>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </FilterRank>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>LR No</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="text" className="form-control tags_input" name="lrnum" value = {(customer == null) ? lr_number : (customer.lr_number == null) ? lr_number : customer.lr_number} onChange={e => setLrnumber(e.target.value)}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>Estate/Village</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="text" className="form-control tags_input" name="estate" value = {(customer == null) ? estate_village : (customer.estate_village == null) ? estate_village : customer.estate_village} onChange={e => setEstate(e.target.value)}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>Area Code</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="text" className="form-control tags_input" name="area_code" value = {(customer == null) ? area_code : (customer.area_code == null) ? area_code : customer.area_code} onChange={e => setAreacode(e.target.value)}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>Customer Contact Person</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="text" className="form-control tags_input" name="ccp" value = {(customer == null) ? ccp : (customer.ccp == null) ? ccp : customer.ccp} onChange={e => setCcp(e.target.value)}/>
                                    </div>
                                </div>
                            </FilterContainer>
                        </InfoContainer>
                    </Col>
                    <Col xs={12} md={4} lg={4}>
                        <InfoContainer>
                            <h4>Supply Info</h4>
                            <hr />
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>Voltage</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="text" className="form-control tags_input" name="voltage" value = {(customer == null) ? voltage : (customer.voltage == null) ? voltage : customer.voltage} onChange={e => setVoltage(e.target.value)}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>Connection Type</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="text" className="form-control tags_input" name="connection_type" value = {(customer == null) ? connect_type : (customer.connect_type == null) ? connect_type : customer.connect_type} onChange={e => setConnecttype(e.target.value)}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>Meter No.</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="text" className="form-control tags_input" name="meternum" value = {(customer == null) ? amd : (customer.amd == null) ? amd : customer.amd} onChange={e => setAmd(e.target.value)}/>
                                    </div>
                                </div>
                            </FilterContainer>
                        </InfoContainer>
                    </Col>
                    <Col xs={12} md={4} lg={4}>
                        <InfoContainer>
                            <h4>Documents</h4>
                            <hr />
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>ID Copy / Certificate Registration{(customer == null) ? <span className="notuploaded">Not Uploaded</span> : (customer.id_document == null || String(customer.id_document).length<6) ? <span className="notuploaded">Not Uploaded</span> : <span className="uploaded">Uploaded</span>}</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="file" className="form-control file_input" name="idcopy" onChange={e => getBase64(e.target.files[0], "id_document")}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>Pin Certificate Copy {(customer == null) ? <span className="notuploaded">Not Uploaded</span> : (customer.pin == null || String(customer.pin).length<6) ? <span className="notuploaded">Not Uploaded</span> : <span className="uploaded">Uploaded</span>}</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="file" className="form-control file_input" name="pincopy" onChange={e => getBase64(e.target.files[0], "pin")}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>Title Deed Copy {(customer == null) ? <span className="notuploaded">Not Uploaded</span> : (customer.title_deed == null || String(customer.title_deed).length<6) ? <span className="notuploaded">Not Uploaded</span> : <span className="uploaded">Uploaded</span>}</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="file" className="form-control file_input" name="title_deed" onChange={e => getBase64(e.target.files[0], "title_deed")}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>Wiring certificate {(customer == null) ? <span className="notuploaded">Not Uploaded</span> : (customer.wiring_certificate == null || String(customer.wiring_certificate).length<6) ? <span className="notuploaded">Not Uploaded</span> : <span className="uploaded">Uploaded</span>}</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="file" className="form-control file_input" name="wc" onChange={e => getBase64(e.target.files[0], "wc")}/>
                                    </div>
                                </div>
                            </FilterContainer>
                            <FilterContainer>
                                <div>
                                    <div className="d-flex tags_label">
                                        <h6>Site Plan {(customer == null) ? <span className="notuploaded">Not Uploaded</span> : (customer.site_plan == null || String(customer.site_plan).length<6) ? <span className="notuploaded">Not Uploaded</span> : <span className="uploaded">Uploaded</span>}</h6>
                                    </div>
                                    <div className="tags_div">
                                        <input type="file" className="form-control file_input" name="site_plan" onChange={e => getBase64(e.target.files[0], "site_plan")}/>
                                    </div>
                                </div>
                            </FilterContainer>
                        </InfoContainer>
                    </Col>
                </Row>
                <Link to="/profile" className="savebtn">
                    <a onClick = {createProfile}>Save Details</a>
                </Link>
            </FormsContainer>
        </div>
    )
}

export default Details

const FormsContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: #f6f6f9;
    padding: 80px 50px;
    z-index: -1;

    .savebtn {
        padding: 8px 13px;
        background: rgba(41, 158, 152,1);
        color: #ffffff!important;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        text-decoration: none;
        margin-top: 20px;

    }

    button {
        padding: 8px 13px;
        background: rgba(41, 158, 152,1);
        color: #ffffff!important;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        margin-top: 20px;
        border: none;
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

    h1 {

    }
`;

const FilterRank = styled.div`
    display: flex;

    button {
        justify-content: space-between;
    }
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

`;

const FilterContainer = styled.div`
    margin-top: 20px;
    margin-bottom: 10px;
    width: -webkit-fill-available;

    .uploaded {
        font-size: 11px;
        background: rgba(0, 163, 0, 0.1);
        color: rgba(0, 163, 0, 1);
        padding: 8px;
        font-weight: regular;
        margin-top: -6px;
        margin-left: 4px;
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
        width: 100%;
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
    
    .file_input {
        padding: 6px;
    }

`;

const TypeItem = styled.div``;

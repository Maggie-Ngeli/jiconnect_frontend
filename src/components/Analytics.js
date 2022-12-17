import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import { NavLink } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'chart.js/auto';
import {Pie, Doughnut, Line, Bar } from 'react-chartjs-2';


function Analytics() {

    const [analytics, setAnalytics] = useState({'total_applications': 0, 'installed':0, 'sites_visited': 0});
    const [graphs, setGraphs] = useState({'tnew':0, 'tt':0, 'tr':0, 'tga':0, 'tal':0, 'tms':0, 'bulb':0, 'socket':0, 'cooker':0, 'oven':0, 'wheater':0, 'spm':0, 'tpm':0, 'airc':0, 'furnace':0, 'other':0, 'Changamwe':0, 'Jomvu':0, 'Kisauni':0, 'Nyali':0, 'Likoni':0, 'Mvita':0, 'Msambweni':0, 'Lunga':0, 'Matuga':0, 'Kinango':0, 'Kilifi_North':0, 'Kilifi_South':0, 'Kaloleni':0, 'Rabai':0, 'Ganze':0, 'Malindi':0, 'Magarini':0, 'Garsen':0, 'Galole':0, 'Bura':0, 'Lamu_East':0, 'Lamu_West':0, 'Taveta':0, 'Wundanyi':0, 'Mwatate':0, 'Voi':0});


    useEffect(() => {
        fetch('http://127.0.0.1:8004/api/applications/applications/analytics/', {
            'method':'GET',
            headers: {
            'Content-Type':'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}` 
            }
        })
        .then(resp => resp.json())
        .then(resp => setAnalytics(resp))
        .catch(error => console.log(error))
    
    
        }, []);


        useEffect(() => {
            fetch('http://127.0.0.1:8004/api/applications/applications/graphs/', {
                'method':'GET',
                headers: {
                'Content-Type':'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}` 
                }
            })
            .then(resp => resp.json())
            .then(resp => setGraphs(resp))
            .catch(error => console.log(error))
        
        
            }, []);


    const bargraph = {
        labels: ["Changamwe", "Jomvu", "Kisauni", "Nyali", "Likoni", "Mvita", "Msambweni", "Lunga", "Matuga", "Kinango", "Kilifi_North", "Kilifi_South", "Kaloleni", "Rabai", "Ganze", "Malindi", "Garsen", "Galole", "Bura", "Lamu_East", "Lamu_West", "Taveta", "Wundanyi", "Mwatate", "Voi"],
        datasets: [
          {
            label: 'Applications Per Continuency',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [graphs["bulb"], graphs["socket"], graphs["cooker"], graphs["wheater"], graphs["oven"], graphs["spm"], graphs["tpm"], graphs["airc"], graphs["furnace"], graphs["other"]]
          }
        ]
      }


    const linegraph = {
        labels: ["Light Bulb", "Socket", "Cooker", "Water Heater", "Oven", "Single Phase Motor", "Three Phase Motor", "Air Conditioner", "Furnace", "Other"],
        datasets: [
          {
            label: 'Most Used Appliances',
            fill: false,
            lineTension: 0.5,
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#279900", "#0B0FE6", "#E66322", "#E6BD0B", "#5E3980"],
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [graphs["bulb"], graphs["socket"], graphs["cooker"], graphs["wheater"], graphs["oven"], graphs["spm"], graphs["tpm"], graphs["airc"], graphs["furnace"], graphs["other"]]
          }
        ]
      }

    const state = {
        labels: ["New", "Temporary", "Routing", "Group Application", "Additional Loal", "Meter Seperation"],
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#6B1BB3"],
            hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            '#175000',
            '#003350',
            '#35014F',
            '#4B5000'
            ],
            data: [graphs["tnew"],graphs["tt"], graphs["tr"], graphs["tga"], graphs["tal"], graphs["tms"]]
          }
        ]
      }

    return (
        <div>
            <AnalyticsContainer>
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
                </AccNav>
            </Nav>
            <MainStats>
                <StatsContainer>
                    <h5>Total Applications</h5>
                    <hr />
                    <h4>{analytics['total_applications']}</h4>
                </StatsContainer>
                <StatsContainer>
                    <h5>Sites Visited</h5>
                    <hr />
                    <h4>{analytics['sites_visited']}</h4>
                </StatsContainer>
                <StatsContainer>
                    <h5>Applications Installed</h5>
                    <hr />
                    <h4>{analytics['installed']}</h4>
                </StatsContainer>
            </MainStats>
            <GraphsContainer>
                <Row>
                    <Col xs={12} md={6} lg={6}>
                        <Shot className="d-block">
                        <Line
                        data={linegraph}
                        options={{
                            title:{
                            display:true,
                            text:'Average Rainfall per month',
                            fontSize:20
                            },
                            legend:{
                            display:true,
                            position:'right'
                            }
                        }}
                        />
                        </Shot>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                        <Shot className="d-block">
                            <Bar
                            data={bargraph}
                            options={{
                                title:{
                                display:true,
                                text:'Average Rainfall per month',
                                fontSize:20
                                },
                                legend:{
                                display:true,
                                position:'right'
                                }
                            }}
                            />
                        </Shot>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6} lg={6}>
                        <Shot className="d-block" style={{width: '60%'}}>
                            <Doughnut
                            data={state}
                            options={{
                                title:{
                                display: true,
                                text:'Application Types',
                                fontSize:20
                                },
                                plugins: {
                                    legend: {
                                      display: true,
                                      position:'right'
                                    }
                                }
                            }}
                            />
                        </Shot>
                    </Col>
                </Row>
            </GraphsContainer>
            </AnalyticsContainer>

        </div>
    )
}

export default Analytics

const AnalyticsContainer = styled.div`
    display : flex;
    flex-direction: column;
`;


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
        background-color: #ffffff;
        border: 1;
        opacity: 1;
        width: 100%;
    }
`;

const GraphsContainer = styled.div`
    padding: 0px 67px;
    margin-bottom: 80px;
    position: relative;
    margin-top: 40px;

`;

const Shot = styled.div`
    position: relative;
    cursor: pointer;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    text-align: initial;
    padding: 20px;
`;
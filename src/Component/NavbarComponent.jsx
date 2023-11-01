import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../css/Navbar.css'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBCollapse,
} from 'mdb-react-ui-kit';
import { NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

export default function Navbar() {
    const [showBasic, setShowBasic] = useState(false);
    const [userProfile, setUserProfile] = useState([])
    const [IsLoggedIn, setIsLoggedIn] = useState()

    const navigate = useNavigate()

    const fetchProfile = () => {
        fetch("https://course-serv-api-service.onrender.com/api/v1/profile", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
            .then(response => {
                setIsLoggedIn(true)
                return response.json();
            }).then(data => {
                setUserProfile(data)
            }).catch(() => {
                setIsLoggedIn(false)
            })
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    const IsLogOut = () => {
        setIsLoggedIn(false)
        localStorage.removeItem('token')
    }


    return (
        <>
            <MDBNavbar className='nav' expand='lg' color='primary'>
                <MDBContainer fluid>
                    <MDBNavbarBrand style={{ color: 'white', marginRight: '5rem', fontSize: '3rem', fontFamily: "Times New Roman" }} href='/'>Est</MDBNavbarBrand>

                    <MDBNavbarToggler
                        className='toggler'
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        color='light'
                        onClick={() => setShowBasic(!showBasic)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar show={showBasic}>
                        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='/'>

                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink style={{ color: 'white', fontSize: '25px', fontFamily: 'inherit' }} href='/Contact'>Program</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink style={{ color: 'white', fontSize: '25px', fontFamily: 'inherit' }} href='/Contact'>Contact</MDBNavbarLink>
                            </MDBNavbarItem>

                        </MDBNavbarNav>

                        <form className='d-flex input-group '>
                            <input type='search' className='form-control' placeholder='Apa yang ingin anda cari' aria-label='Search' />
                            <MDBBtn rippleDuration={0} style={{ marginRight: '3rem' }} color='primary'>Search</MDBBtn>
                        </form>
                        {
                            IsLoggedIn ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                    </svg>
                                    <NavDropdown title={userProfile.name}>
                                        <LinkContainer to='/profileSetting'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item
                                            onClick={IsLogOut}
                                        >Log Out</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <div className="Login">
                                    <MDBBtn rippleDuration={0} color='primary'
                                        onClick={() => navigate('/Login')}
                                    >Login</MDBBtn>
                                </div>
                            )
                        }
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
            <div className="custom-shape-divider-top-1698678240">
                <svg className="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                </svg>
            </div>
        </>
    );
}

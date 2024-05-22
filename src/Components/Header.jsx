import { Button } from 'react-bootstrap';
import React from 'react'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();

  return (
    <>
    <Navbar className="m-3 p-2">
        <Navbar.Brand as={Link} to={"/"} style={{color:"#429DD0"}}>Gather</Navbar.Brand>
       
        <Nav className="ms-auto d-flex flex-row justify-content-between">         
            {location.pathname !== "/sign-in" ? <Nav.Link as={Link} to={"/sign-in"}><Button className='btn-sm'>Sign in</Button></Nav.Link> : null }
            {location.pathname !== "/join" ? <Nav.Link as={Link} to={"/join"}><Button className='btn-sm' style={{width:"3.9rem"}}>Join</Button></Nav.Link> : null }
        </Nav>
        
    </Navbar>
    </>
  )
}

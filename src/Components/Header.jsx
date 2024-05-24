import { Button } from 'react-bootstrap';
import React from 'react'
import { useAuth } from '../Contexts/AuthContext'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();
    const {currentUser} = useAuth()
    
  return (
    <>
    <Navbar className="m-3">
        <Navbar.Brand variant="primary" as={Link} to={"/"} >Gather</Navbar.Brand>    
        <Nav className="ms-auto d-flex flex-row justify-content-between">
            {currentUser ? <p>{currentUser.email}</p> :  <> 
              {location.pathname !== "/sign-in" ? <Nav.Link as={Link} to={"/sign-in"}><Button variant="primary" size="sm">Sign in</Button></Nav.Link> : null }
              {location.pathname !== "/join" ? <Nav.Link as={Link} to={"/join"}><Button variant="primary" size="sm" style={{width:"3.9rem"}}>Join</Button></Nav.Link> : null }
            </> }
        </Nav>
        
    </Navbar>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { Alert, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../Contexts/AuthContext'
import { Link, useLocation } from 'react-router-dom';
import { getCollection, querySnapshot } from '../apiFirebaseCalls';

export default function Header() {
  const [error, setError] = useState("")
  const location = useLocation();
  const {currentUser, logout} = useAuth()

  const [isStaff, setIsStaff] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [checkStaffError, setCheckStaffError] = useState('')

  async function handleLogout() {
    setIsStaff(false)
    setIsAdmin(false)
    setError("")
    try {
        await logout()
        setIsStaff(false)
    } catch {
        setError('Failed to log out')
    }
  }

  useEffect(() => {
    if (currentUser) {
      checkIfStaffExists(currentUser.email);
    }
  }, [currentUser]);

  async function checkIfStaffExists(email) {
    setIsStaff(false)
    try {
      const querySnapShot = await querySnapshot("staff", email)
      if (querySnapShot.exists()) {
        setIsStaff(true)
        const staffCollectionDocumentFields = await getCollection("staff", email);
        setIsAdmin(true)
      } else {
        setIsStaff(false)
      }
    } catch (error) {
      console.error("Error checking if staff/admin exists: ", error);
      setCheckStaffError('Error checking if you are staff/admin member')
    }
  };
 
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" fixed="top" >
      {checkStaffError && <Alert variant="danger">{checkStaffError}</Alert>}
      <Container>
        <Navbar.Brand style={{ color: "#429DD0" }} as={Link} to={"/"}  ><strong>Gather</strong></Navbar.Brand>
        {error ? <p>{error}</p> : null}
        {!currentUser ?
          <>  <Nav>
            {location.pathname !== "/sign-in" ? 
              (<Nav.Link as={Link} to={"/sign-in"}>
                <Button variant="primary" size="sm">Sign in</Button>
              </Nav.Link> ): 
              null 
            }
            {location.pathname !== "/join" && <Nav.Link as={Link} to={"/join"}><Button variant="primary" size="sm" style={{width:"3.9rem"}}>Join</Button></Nav.Link>}
            </Nav>
          </> : 
          <>
            <Nav.Link as={Link} to={"/profile"}>
              <Nav.Item className='pt-2 me-2 ' style={{fontSize:"0.9rem"}}>{currentUser.email}</Nav.Item>
            </Nav.Link >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" >
              <Nav className="ms-auto">  
                {isAdmin && 
                  <Nav.Link as={Link} to={"/create-staff-members"}>
                    <Button variant="primary" size="sm">Add Staff Members</Button>
                  </Nav.Link >
                }
                {isStaff && 
                  <Nav.Link as={Link} to={"/create-event"}>
                    <Button variant="primary" size="sm">Create Event</Button>
                  </Nav.Link >
                }
                {currentUser && 
                  <Nav.Link>
                    <Button variant="primary" size="sm" onClick={handleLogout}>Logout</Button>
                  </Nav.Link>
                }
              </Nav>
            </Navbar.Collapse>
          </>
        }
      </Container>
    </Navbar>
  );
}

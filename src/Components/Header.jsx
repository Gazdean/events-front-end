import React, { useEffect, useState } from 'react'
import { Alert, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../Contexts/AuthContext'
import { IsStaffContext } from "../Contexts/IsStaffContext";
import { Link, useLocation } from 'react-router-dom';
import { getCollection, querySnapshot } from '../apiFirebaseCalls';
import { useContext } from 'react';

export default function Header() {
  const [error, setError] = useState("")
  const location = useLocation();
  const {currentUser, logout} = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const {
    isStaff,
    setIsStaff,
    isStaffLoading,
    setIsStaffLoading,
    isStaffError,
    setIsStaffError,
  } = useContext(IsStaffContext);

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
    setIsStaffError("")
    setIsStaffLoading(true)
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
      setIsStaffError('Error checking if you are staff/admin member')
    } finally {
      setIsStaffLoading(false)
    }
  };
 
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" fixed="top" style={{ borderBottom: "0.5px solid #429DD0", borderBottomRightRadius: "15px"}}>
      {isStaffError && <Alert variant="danger">{isStaffError}</Alert>}
      <Container>
        <Navbar.Brand style={{ color: "#429DD0" }} as={Link} to={"/"}  >
          <strong>Gather</strong>
          <svg className="pb-1 bi bi-house-heart-fill" xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" viewBox="0 0 16 16">
            <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707z"/>
            <path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018"/>
          </svg>
        </Navbar.Brand>
        {error ? <p>{error}</p> : null}
        {!currentUser ?
          <>  <Nav >
             <div className="d-flex align-items-center">
            {location.pathname !== "/sign-in" ? 
              (<Nav.Link as={Link} to={"/sign-in"} className="me-2">
                <Button variant="primary" size="sm">Sign in</Button>
              </Nav.Link> ): 
              null 
            }
            {location.pathname !== "/join" && <Nav.Link as={Link} to={"/join"}><Button variant="primary" size="sm" style={{width:"3.9rem"}}>Join</Button></Nav.Link>}
            </div>
            </Nav>
          </> : 
          <>
            <Nav.Link as={Link} to={"/profile"}>
              <Nav.Item className='pt-2 me-2 ' style={{fontSize:"0.9rem"}}>{currentUser.email}</Nav.Item>
            </Nav.Link >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" >
              <Nav className="ms-auto">  
                { isStaffLoading ? <p>-- Loading Staff Options --</p> :
                  <>
                    {isAdmin && 
                      <Nav.Link as={Link} to={"/create-staff-members"}>
                        <Button variant="primary" size="sm">Add Staff Members</Button>
                      </Nav.Link >

                    }
                    {isStaff && 
                      <Nav.Link as={Link} to={"/create-event"}>
                        <Button variant="primary" size="sm">Create Event</Button>
                      </Nav.Link>
                    }
                  </>
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

import React from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import CallToAction from './CallToAction'

export default function LoadingComponent({loadingMessage}) {
  return (
    <Container >
        <CallToAction/>
        <Row className='d-flex align-content-center mt-5' style={{height:'30vh'}}>
            <Col sm={12} className='d-flex justify-content-center mt-5'><Spinner animation="border" variant="primary" />
                <Spinner animation="border" variant="success" />
                <h2 className="ms-5 me-5" >{loadingMessage}</h2><Spinner animation="border" variant="danger" />
                <Spinner animation="border" variant="warning" />
            </Col>
         
        </Row>
    </Container>
  )
}

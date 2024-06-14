import React from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import CallToAction from './CallToAction'

export default function LoadingComponent({loadingMessage}) {
  return (
    <Container>
        <CallToAction/>
        <Row>
            <Col sm={2}>
                <Spinner animation="border" variant="primary" />
                <Spinner animation="border" variant="success" />
            </Col>
            <Col sm={8}>
                <h2>{loadingMessage}</h2>
            </Col>
            <Col sm={2}>
                <Spinner animation="border" variant="danger" />
                <Spinner animation="border" variant="warning" />
            </Col>
        </Row>
    </Container>
  )
}

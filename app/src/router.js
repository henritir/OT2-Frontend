import { Link, NavLink, Routes, Route, BrowserRouter as Router, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { Profiili } from './profiili';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Parhaimmat } from './parhaimmat';
import { Arvostele } from './arvostele';
import { Etusivu } from './etusivu';
const RouteApp = (props) => {

    return (
        <Router>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Brand href="/">Maistelu_PRO</Navbar.Brand>
                    <Navbar.Collapse dir='column' className='mx-1'>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Etusivu</Nav.Link>
                            <Nav.Link href="/profiili">Profiili</Nav.Link>
                            <Nav.Link href="/parhaimmat">Parhaimmat</Nav.Link>
                            <Nav.Link href='/arvostele'>Arvostele</Nav.Link>
                        </Nav>
                        <Form className='d-flex me-1'>
                            <Col xs='auto'>
                                <Form.Control type="käyttjänimi" placeholder="käyttäjänimi" htmlSize='8' />
                            </Col>
                        </Form>
                        <Form className='d-flex me-1'>
                            <Col xs='auto'>
                                <Form.Control type="salasana" placeholder="salasana" htmlSize='8' />
                            </Col>
                        </Form>
                        <Button variant="outline-success">Kirjaudu</Button>
                    </Navbar.Collapse>

                </Container>

            </Navbar>

            <Routes>
                
                <Route path="/" element = {<Etusivu/>} />
                <Route path="/profiili" element={<Profiili />} />
                <Route path="/parhaimmat" element={<Parhaimmat />} />
                <Route path='arvostele' element={<Arvostele />} />

                <Route path="*"
                    element={<Navigate to="/" />} />

            </Routes>
        </Router>
    );
}



export default RouteApp;
import {
    Routes,
    Route,
    BrowserRouter as Router,
    Navigate,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Profiili } from "./profiili";
import { Parhaimmat } from "./parhaimmat";
import { Arvostele } from "./arvostele";
import { Etusivu } from "./etusivu";
import image from "./viinikuva.png";

const RouteApp = () => {
    return (
        <Router>
            <Row name="yläpalkki">
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Brand href="/">Maistelu_PRO</Navbar.Brand>
                        <Navbar.Collapse dir="column" className="mx-1">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Etusivu</Nav.Link>
                                <Nav.Link href="/profiili">Profiili</Nav.Link>
                                <Nav.Link href="/parhaimmat">
                                    Parhaimmat
                                </Nav.Link>
                                <Nav.Link href="/arvostele">Arvostele</Nav.Link>
                            </Nav>
                            <Form className="d-flex me-1">
                                <Col xs="auto">
                                    <Form.Control
                                        type="käyttäjänimi"
                                        placeholder="käyttäjänimi"
                                        htmlSize="8"
                                    />
                                </Col>
                            </Form>
                            <Form className="d-flex me-1">
                                <Col xs="auto">
                                    <Form.Control
                                        type="salasana"
                                        placeholder="salasana"
                                        htmlSize="8"
                                    />
                                </Col>
                            </Form>
                            <Button variant="outline-success">Kirjaudu</Button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Row>
            <Row name="netti sivut">
                <div
                    style={{
                        backgroundImage: `url(${image})`,
                        height: "100vh",
                        backgroundRepeat: "repeat",
                        backgroundSize: "contain",
                    }}
                >
                    <div style={{ textAlign: "center" }}>
                        <Routes>
                            <Route path="/" element={<Etusivu />} />
                            <Route path="/profiili" element={<Profiili />} />
                            <Route
                                path="/parhaimmat"
                                element={<Parhaimmat />}
                            />
                            <Route path="arvostele" element={<Arvostele />} />

                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </div>
                </div>
            </Row>
            <Row name="alapalkki">
                <Navbar bg="secondary" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">Maistelu_PRO</Navbar.Brand>
                    </Container>
                </Navbar>
            </Row>
        </Router>
    );
};

// eslint-disable-next-line no-lone-blocks
{
    /* pystyy muodostamaan läpinäkyvän taustan
<div
    style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        marginLeft: "10%",
        marginRight: "10%",
    }}
></div>; */
}

export default RouteApp;

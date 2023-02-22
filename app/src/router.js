import {
    Routes,
    Route,
    BrowserRouter as Router,
    Navigate,
    Outlet,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Profiili } from "./profiili";
import { Parhaimmat } from "./parhaimmat";
import { Arvostele } from "./arvostele";
import { Etusivu } from "./etusivu";
import { Rekisterointi } from "./rekisterointi";
import image from "./viinikuva.png";
import { Row } from "react-bootstrap";
import { useState, useEffect } from "react";

const RouteApp = () => {
    const [kayttajanimi, setKayttajanimi] = useState(
        window.localStorage.getItem("kayttajanimi")
    );
    const [salasana, setSalasana] = useState(
        window.localStorage.getItem("salasana")
    );
    const [kirjautunut, setKirjautunut] = useState(
        window.localStorage.getItem("kirjautunut")
    );
    const [kirjaudu, setKirjaudu] = useState(false);

    const onSubmit = () => {
        window.localStorage.setItem("kayttajanimi", kayttajanimi);
        window.localStorage.setItem("salasana", salasana);
        setKirjaudu(!kirjaudu);
    };

    const kirjautuminen = (result) => {
        window.localStorage.removeItem("salasana");
        // console.log(result);
        if (result === kayttajanimi + " on kirjautunut sisään") {
            window.localStorage.setItem("kirjautunut", "true");
            setKirjautunut("true");
        } 
    };

    const kirjauduUlos = () => {
        window.localStorage.clear();
        setKirjautunut(null);
    };

    useEffect(() => {
        const fetchKirjaudu = async () => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            //console.log(kayttajanimi);
            //console.log(salasana);
            var raw = JSON.stringify({
                kayttajanimi: kayttajanimi,
                salasana: salasana,
            });

            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            fetch("http://localhost:3001/kirjaudu/", requestOptions)
                .then((response) => response.text())
                .then((result) => kirjautuminen(result))
                .catch((error) => console.log("error", error));
        };
        if(salasana){
            fetchKirjaudu();
        }
        
    }, [kirjaudu]);

    return (
        <Router>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Brand href="/">Maistelu_PRO</Navbar.Brand>
                    <Navbar.Collapse dir="column" className="mx-1">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Etusivu</Nav.Link>
                            <Nav.Link href="/profiili">Profiili</Nav.Link>
                            <Nav.Link href="/parhaimmat">Parhaimmat</Nav.Link>
                            <Nav.Link href="/arvostele">Arvostele</Nav.Link>
                        </Nav>

                        {kirjautunut ? (
                            <div>
                                <Row>
                                <Col xs='auto'>
                                        <p>{kayttajanimi}</p>
                                    </Col>
                                    <Col md='auto'>
                                    <Button onClick={() => kirjauduUlos()}>
                                Kirjaudu ulos
                            </Button>

                                    </Col>
                            
                            </Row>
                            </div>
                        ) : (
                            <Form className="d-flex me-1" onSubmit={onSubmit}>
                                <Row>
                                    <Col xs="auto">
                                        <Form.Control
                                            onChange={(e) =>
                                                setKayttajanimi(e.target.value)
                                            }
                                            type="text"
                                            placeholder="käyttäjänimi"
                                            htmlSize="8"
                                        />
                                    </Col>
                                    <Col xs="auto">
                                        <Form.Control
                                            onChange={(e) =>
                                                setSalasana(e.target.value)
                                            }
                                            type="password"
                                            placeholder="salasana"
                                            htmlSize="8"
                                        />
                                    </Col>
                                </Row>
                                <Col xs="auto">
                                    <Button
                                        variant="outline-success"
                                        type="submit"
                                    >
                                        Kirjaudu
                                    </Button>
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        variant="outline-success"
                                        href="/rekisterointi"
                                    >
                                        Rekisteröidy
                                    </Button>
                                </Col>
                            </Form>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div
                style={{
                    backgroundImage: `url(${image})`,
                    minHeight: "100vh",
                    backgroundRepeat: "repeat",
                    backgroundSize: "contain",
                }}
            >
                <div style={{ textAlign: "center" }}>
                    <Routes>
                        <Route path="/" element={<Etusivu />} />
                        <Route
                                path="/rekisterointi"
                                element={<Rekisterointi />}
                            />
                        <Route element={<Suojattu kirjautunut={kirjautunut} />}>
                            <Route path="/profiili" element={<Profiili />} />
                            <Route
                                path="/parhaimmat"
                                element={<Parhaimmat />}
                            />
                            
                            <Route path="arvostele" element={<Arvostele />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>

            <Navbar bg="secondary" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Maistelu_PRO</Navbar.Brand>
                </Container>
            </Navbar>
        </Router>
    );
};

const Suojattu = ({ kirjautunut, redirectPath = "/", children }) => {
    if (!kirjautunut) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
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

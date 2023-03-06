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
import { useCookies } from 'react-cookie';

const RouteApp = () => {
    const [kayttajanimi, setKayttajanimi] = useState("");
    const [salasana, setSalasana] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['user','token']);
    const [kirjautunut, setKirjautunut] = useState(cookies.user);
    const [kirjaudu, setKirjaudu] = useState(false);
    

    const kirjauduClicked = () => {
        setKirjaudu(!kirjaudu);
    };

    const kirjautuminen = (result) => {
        console.log(result);
        if (result.includes(kayttajanimi)) {
            setCookie('user',kayttajanimi);
            setCookie('token',result.slice(kayttajanimi.length+31))
            setKirjautunut(kayttajanimi);
        }

    };

    const kirjauduUlos = () => {
        setKirjautunut("");
        removeCookie('user');
        removeCookie('token');
        
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

        if (salasana) {
            fetchKirjaudu();
            setSalasana("");
            setKayttajanimi("");
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
                                        <p>{kirjautunut}</p>
                                    </Col>
                                    <Col md='auto'>
                                        <Button onClick={() => kirjauduUlos()}>
                                            Kirjaudu ulos
                                        </Button>

                                    </Col>

                                </Row>
                            </div>
                        ) : (
                            <div>

                                <Row>
                                    <Col md={3}>
                                        <Form.Control
                                            onChange={(e) =>
                                                setKayttajanimi(e.target.value)
                                            }
                                            type="text"
                                            placeholder="käyttäjänimi"
                                            htmlSize="9"
                                            value={kayttajanimi}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control
                                            onChange={(e) =>
                                                setSalasana(e.target.value)
                                            }
                                            type="password"
                                            placeholder="salasana"
                                            htmlSize="8"
                                            value={salasana}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Button
                                            variant="outline-success"
                                            onClick={() => kirjauduClicked()}
                                        >
                                            Kirjaudu
                                        </Button>
                                    </Col>
                                    <Col md={3}>
                                        <Button
                                            variant="outline-success"
                                            href="/rekisterointi"
                                        >
                                            Rekisteröidy
                                        </Button>
                                    </Col>
                                </Row>

                            </div>

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

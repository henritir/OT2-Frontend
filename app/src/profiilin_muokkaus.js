import React, { useEffect, useState, } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Muokkaus = (props) => {
    const [tiedot, setTiedot] = useState([]);
    const [muokkaan, setMuokkaan] = useState(false);
    const [muokkaasposti, setMuokkaasposti] = useState(false);
    const [muokkaasala, setMuokkaasala] = useState(false);
    const [kayttajanimi, setKayttajanimi] = useState("");
    const [sposti, setSposti] = useState("");
    const [salasana, setSalasana] = useState("");
    const [uusisalasana, setUusisalasana] = useState("");
    const [uusisalasana2, setUusisalasana2] = useState("");
    const [tallenna, setTallenna] = useState(false);
    const [vaihda, setVaihda] = useState(false);
    const [snackbar, setSnackbar] = useState(false);
    const [ilmoitus, setIlmoitus] = useState("");
    const [paivita, setPaivita] = useState(false);

    const aseta = (e) => {
        console.log(e);
        setTiedot(JSON.parse(e)[0]);
    }

    const muokkaaClicked = (e) => {
        if (e === "nimi") {
            setMuokkaan(true);
            setMuokkaasposti(false);
            setMuokkaasala(false);
            setSposti("");
        }
        if (e === "sposti") {
            setMuokkaan(false);
            setMuokkaasposti(true);
            setMuokkaasala(false);
            setKayttajanimi("");
            setSalasana("");
            setUusisalasana("");
            setUusisalasana2("");
        }
        if (e === "sala") {
            setMuokkaan(false);
            setMuokkaasposti(false);
            setMuokkaasala(true);
            setKayttajanimi("");
            setSposti("");
        }
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(false);
    };

    const snackBarAction = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackBar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );



    useEffect(() => {
        const fetchKayttaja = async () => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + props.token);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://localhost:3001/kayttaja", requestOptions)
                .then(response => response.text())
                .then(result => aseta(result))
                .catch(error => console.log('error', error));
        }
        fetchKayttaja();

    }, [paivita]);

    useEffect(() => {
        const fetchMuokkaa = async () => {

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + props.token);
            myHeaders.append("Content-Type", "application/json");

            if (kayttajanimi) {
                var raw = JSON.stringify({
                    "kayttajanimi": kayttajanimi,
                    "sposti": tiedot.sposti
                });

            }
            if (sposti) {
                var raw = JSON.stringify({
                    "kayttajanimi": tiedot.kayttajanimi,
                    "sposti": sposti
                });
            }

            console.log(raw);
            var requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:3001/muokkaa_kayttaja", requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        setIlmoitus("Käyttäjätietojen päivitys onnistui")
                    }
                    if (response.status === 400) {
                        setIlmoitus("Käyttäjänimi tai sähköposti jo käytössä")
                    }
                    if (response.status === 500) {
                        setIlmoitus("Käyttäjätietojen päivitys epäonnistui")
                    }
                    setSnackbar(true);
                    setPaivita(!paivita);
                    setMuokkaan(false);
                    setMuokkaasposti(false);
                })

                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }

        if (kayttajanimi || sposti) {
            fetchMuokkaa();
            setKayttajanimi("");
            setSalasana("");
            setSposti("");
        }


    }, [tallenna]);


    useEffect(() => {
        const fetchSalasana = async () => {

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + props.token);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "salasana": salasana,
                "uusisalasana": uusisalasana
            });

            var requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:3001/vaihda_salasanaa", requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        setIlmoitus("Salasanan vaihto onnistui");
                    }
                    if (response.status === 400) {
                        setIlmoitus("Väärä salasana");
                    }
                    if (response.status === 500) {
                        setIlmoitus("Salasanan vaihto epäonnistui")
                    }
                    setSnackbar(true);
                    setMuokkaasala(false);
                })
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }


        if (uusisalasana === uusisalasana2 && uusisalasana) {
            console.log(salasana + " " + uusisalasana);
            fetchSalasana();
            setSalasana("");
            setUusisalasana("");
            setUusisalasana2("");



        }
        else if (uusisalasana != uusisalasana2) {
            console.log("salasanat ei täsmää");
            setIlmoitus("Salasanat eivät täsmää");
            setSnackbar(true);
        }



    }, [vaihda]);


    return (
        <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
            <Container fluid>
                <h2>Käyttäjä tiedot</h2>

                <Table striped bordered size='sm' className='my-5'>
                    <tbody>
                        <tr>
                            <td>Käyttäjänimi</td>
                            <td>{tiedot.kayttajanimi}</td>
                            <td><Button variant='link' value={"nimi"} onClick={(e) => muokkaaClicked(e.target.value)}>Muokkaa</Button></td>
                        </tr>
                        <tr>
                            <td>Sähköposti</td>
                            <td>{tiedot.sposti}</td>
                            <td><Button variant='link' value={"sposti"} onClick={(e) => muokkaaClicked(e.target.value)}>Muokkaa</Button></td>
                        </tr>
                        <tr>
                            <td>Salasana</td>
                            <td></td>
                            <td><Button variant='link' value={"sala"} onClick={(e) => muokkaaClicked(e.target.value)}>Vaihda salasana</Button></td>
                        </tr>
                    </tbody>
                </Table>
                {muokkaan ?
                    <div>
                        <Row>
                            <Col md={1}></Col>
                            <Col md={3}>
                                <Form.Control
                                    placeholder="uusi käyttäjänimi"
                                    value={kayttajanimi}
                                    onChange={(e) => { setKayttajanimi(e.target.value) }}
                                    className='m-2'
                                />
                            </Col>
                            <Col md={4}>
                                <Button onClick={() => setTallenna(!tallenna)} className='m-2' variant='outline-primary'>Tallenna</Button>
                                <Button onClick={() => setMuokkaan(false)} className='m-2' variant='outline-primary'>Peruuta</Button>
                            </Col>
                        </Row>
                    </div>
                    : null
                }

                {muokkaasposti ?
                    <div>
                        <Row>
                            <Col md={1}></Col>
                            <Col md={3}>
                                <Form.Control
                                    placeholder="uusi sähköposti"
                                    value={sposti}
                                    onChange={(e) => setSposti(e.target.value)}
                                    className='m-2'
                                />
                            </Col>
                            <Col md={4}>
                                <Button onClick={() => setTallenna(!tallenna)} className='m-2' variant='outline-primary'>Tallenna</Button>
                                <Button onClick={() => setMuokkaasposti(false)} className='m-2' variant='outline-primary'>Peruuta</Button>
                            </Col>
                        </Row>
                    </div>
                    : null
                }

                {muokkaasala ?
                    <div>
                        <Row>
                            <Col md={3}>
                                <Form.Control
                                    placeholder="Vanha salasana"
                                    htmlSize="8"
                                    className='m-2'
                                    type='password'

                                    onChange={(e) => setSalasana(e.target.value)}
                                    value={salasana}
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Control
                                    placeholder="Uusi salasana"
                                    htmlSize="8"
                                    className='m-2'
                                    type='password'

                                    onChange={(e) => setUusisalasana(e.target.value)}
                                    value={uusisalasana}
                                />
                            </Col>

                            <Col md={3}>
                                <Form.Control
                                    placeholder="Uusi salasana"
                                    htmlSize="8"
                                    className='m-2'
                                    type='password'

                                    onChange={(e) => setUusisalasana2(e.target.value)}
                                    value={uusisalasana2}
                                />
                            </Col>

                            <Col md={3}>
                                <Button className='m-2' variant='outline-primary' onClick={() => setVaihda(!vaihda)}>Tallenna</Button>
                                <Button className='m-2' onClick={() => setMuokkaasala(false)} variant='outline-primary'>Peruuta</Button>
                            </Col>
                        </Row>
                    </div>
                    : null
                }
                <Snackbar
                    open={snackbar}
                    autoHideDuration={5000}
                    onClose={handleCloseSnackBar}
                    message={ilmoitus}
                    action={snackBarAction}
                />


            </Container>
        </div>
    )
}


export { Muokkaus };
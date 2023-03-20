import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import Form from "react-bootstrap/Form";

const Muokkaus = (props) => {
    const [tiedot, setTiedot] = useState([]);
    const [muokkaan, setMuokkaan] = useState(false);
    const [muokkaasposti, setMuokkaasposti] = useState(false);
    const [muokkaasala, setMuokkaasala] = useState(false);
    const [kayttajanimi, setKayttajanimi] = useState("");
    const [sposti, setSposti] = useState("");
    const [salasana, setSalasana] = useState("");
    const [uusisala, setUusisala] =useState("");
    const [uusisala2, setUusisala2] =useState("");
    const [tallenna, setTallenna] = useState(false);

    const aseta = (e) => {
        console.log(e);
        setTiedot(JSON.parse(e)[0]);
    }

    const muokkaaClicked = (e) => {
        if(e==="nimi"){
            setMuokkaan(true);
            setMuokkaasposti(false);
            setMuokkaasala(false);
            setSposti("");
        }
        if(e==="sposti"){
            setMuokkaan(false);
            setMuokkaasposti(true);
            setMuokkaasala(false);
            setKayttajanimi("");
        }
        if(e==="sala"){
            setMuokkaan(false);
            setMuokkaasposti(false);
            setMuokkaasala(true);
        }
    }



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

    }, []);

    useEffect(() => {
        const fetchMuokkaa = async () => {

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + props.token);
            myHeaders.append("Content-Type", "application/json");

            if(kayttajanimi){ var raw = JSON.stringify({
                "kayttajanimi": kayttajanimi,
                "sposti": tiedot.sposti
            });
               
            }
            if(sposti){
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
                .then(response => response.text())
                .then(result => console.log(result))
                .then(window.location.reload(true))
                .catch(error => console.log('error', error));
        }

        if(kayttajanimi||sposti){
            console.log(sposti);
            fetchMuokkaa();
            setKayttajanimi("");
            setSalasana("");
            setSposti("");
        }


    }, [tallenna]);

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
                                    onChange={(e)=>{setKayttajanimi(e.target.value)}}
                                    className='m-2'
                                />
                            </Col>
                            <Col md={4}>
                                <Button onClick={()=>setTallenna(true)} className='m-2' variant='outline-primary'>Tallenna</Button>
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
                                    onChange={(e)=>setSposti(e.target.value)}
                                    className='m-2'
                                />
                            </Col>
                            <Col md={4}>
                            <Button onClick={()=>setTallenna(true)} className='m-2' variant='outline-primary'>Tallenna</Button>
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
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Control
                                    placeholder="Uusi salasana"
                                    htmlSize="8"
                                    className='m-2'
                                />
                            </Col>

                            <Col md={3}>
                                <Form.Control
                                    placeholder="Uusi salasana"
                                    htmlSize="8"
                                    className='m-2'
                                />
                            </Col>

                            <Col md={3}>
                            <Button className='m-2' variant='outline-primary'>Tallenna</Button>
                            <Button className='m-2' onClick={() => setMuokkaasala(false)} variant='outline-primary'>Peruuta</Button>
                            </Col>
                        </Row>
                    </div>
                    : null
                }


            </Container>
        </div>
    )
}


export { Muokkaus };
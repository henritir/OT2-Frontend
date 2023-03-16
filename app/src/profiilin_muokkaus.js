import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';


const Muokkaus = (props) => {
    const [tiedot, setTiedot] = useState([]);
    const [muokkaan, setMuokkaan] = useState(false);
    const [muokkaasposti, setMuokkaasposti] = useState(false);
    const [muokkaasala, setMuokkaasala] = useState(false);

    const aseta = (e) => {
        console.log(e);
        setTiedot(JSON.parse(e)[0]);
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

    return (
        <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
            <Container fluid>
                <h2>Käyttäjä tiedot</h2>

                <Table striped bordered size='sm' className='my-5'>
                    <tbody>
                        <tr>
                            <td>Käyttäjänimi</td>
                            <td>{tiedot.kayttajanimi}</td>
                            <td><Button variant='link' onClick={() => setMuokkaan(true)}>Muokkaa</Button></td>
                        </tr>
                        {muokkaan ?
                            <tr>
                                <td><input></input></td>
                                <td><Button>Tallenna</Button></td>
                                <td><Button onClick={()=>setMuokkaan(false)}>Peruuta</Button></td>
                            </tr>
                            : null}
                        <tr>
                            <td>Sähköposti</td>
                            <td>{tiedot.sposti}</td>
                            <td><Button variant='link'  onClick={() => setMuokkaasposti(true)}>Muokkaa</Button></td>
                        </tr>
                        {muokkaasposti ?
                            <tr>
                                <td><input></input></td>
                                <td><Button>Tallenna</Button></td>
                                <td><Button onClick={()=>setMuokkaasposti(false)}>Peruuta</Button></td>
                            </tr>
                            : null}
                        <tr>
                            <td>Salasana</td>
                            <td></td>
                            <td><Button variant='link'  onClick={() => setMuokkaasala(true)}>Vaihda salasana</Button></td>
                        </tr>
                        {muokkaasala ?
                            <tr>
                                <td><input type="password"></input></td>
                                <td><Button>Tallenna</Button></td>
                                <td><Button onClick={()=>setMuokkaasala(false)}>Peruuta</Button></td>
                            </tr>
                            : null}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}


export { Muokkaus };
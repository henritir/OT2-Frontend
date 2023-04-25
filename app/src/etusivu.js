import React, { useEffect, useState, } from 'react'
import Paper from '@mui/material/Paper';
import { padding, width } from '@mui/system';
import { Rating } from '@mui/material';
import { Col, Container, Row } from "react-bootstrap";

const Etusivu = () => {

    const [topViinit, setTopViinit] = useState([]) //useState taulukko top 3 viineille 

    // Tämä effect suoritetaan VAIN yhden kerran
    //haetaan TOP 3 viinit tietokannasta
    useEffect(() => {
        const fetchTopViinit = async () => {
            console.log("Fetching..");
            let response = await fetch("http://localhost:3001/parhaatviinit/topkolme");
            console.log("fetch called ...", response);
            let c = await response.json();
            console.log("res: " + c);
            setTopViinit(c);

        }
        fetchTopViinit();
        console.log(JSON.stringify(topViinit))

    }, []);

    //mapataan TOP 3 viinit Paper komponentteihin
    const Paperit = topViinit.map((s, i) => {
        return (
            <Paper key={i} id={s.id} elevation={3} style={{ height: '100%', backgroundColor: '#f2f2f2', padding: '20px' }}>
                <h1>{i + 1}.</h1>
                <h1>{s.nimi}</h1>
                <Rating
                    name="simple-controlled"
                    size='large'
                    readOnly
                    precision={0.1}
                    value={s.arvio}
                />
                <h2>{s.tyyppi}</h2>
                <p>{s.valmistusmaa}, {s.alue}</p>
                <p>{s.kuvaus}</p>
                <p>"{s.luonnehdinta}"</p>
                <h2>{s.hinta} €</h2>
            </Paper>
        )
    });

    return (
        <div>
            <Container style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Row style={{ padding: '20px' }}>
                    <Col style={{ display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <Paper elevation={3} style={{ width: '80%', backgroundColor: '#f2f2f2', padding: '20px' }}>
                            <h1>&#127863; Maistelu_PRO &#127863;</h1>
                            <p>Tervetuloa viininystävien sovellukseen! Rekisteröidy ja sukella viinien jännittävään maailmaan!</p>
                            <p> Maistelu_PRO auttaa sinua löytämään viinejä eri ominaisuuksien perusteella, pääset arvioimaan maistelukokemustasi ja sinulle luodaan oma yksilöllinen makuprofiilisi. Liity mukaan ja jaa kokemuksesi Maistelu_PRO:n avulla.</p>
                            <p>Kippis! &#127863;</p>
                        </Paper>
                    </Col>
                </Row>
                <Row style={{ padding: '20px' }}>
                    <Col style={{ display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <Paper elevation={3} style={{ width: '80%', backgroundColor: '#f2f2f2', padding: '20px' }}>
                            <h1>TOP 3</h1>
                        </Paper>
                    </Col>
                </Row>
                <Row style={{ padding: '20px' }}>
                    <Col>
                        {Paperit[0]}
                    </Col>
                    <Col>
                        {Paperit[1]}
                    </Col>
                    <Col>
                        {Paperit[2]}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export { Etusivu };

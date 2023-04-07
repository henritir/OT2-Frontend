import React, { useEffect, useState, } from 'react'
import Paper from '@mui/material/Paper';
import { padding, width } from '@mui/system';
import { Rating } from '@mui/material';

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
            <div style={{ padding: '20px', width: '30%', height: '30%' }}>
                <Paper key={i} id={s.id} elevation={3} style={{ width: 'auto', backgroundColor: '#f2f2f2', padding: '20px 20px' }}>
                    <h1>{i + 1}. {s.nimi}</h1>
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
                <br></br>
            </div>
        )
    });

    return (
        <div>
            <h1>MAISTELU PRO</h1>
            <h2>Tervetuloa viininystävien sovellukseen, rekisteröidy ja sukella viinien jännittävään maailmaan!</h2>
            <h3>Maistelu_PRO auttaa sinua löytämään viinejä eri ominaisuuksien perusteella, pääset arvioimaan maistelukokemustasi ja sinulle luodaan oma yksilöllinen maisteluprofiilisi.</h3>
            <h3>Liity mukaan ja jaa kokemuksesi Maistelu_PRO:n avulla. Kippis!</h3>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20 20' }}>
                <Paper elevation={3} style={{ width: '80%', backgroundColor: '#f2f2f2', padding: '20px 20px' }}>
                    <h1>TOP 3</h1>
                </Paper>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20 20' }}>
                {Paperit}
            </div>
        </div>
    );
}

export { Etusivu };

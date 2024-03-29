import React, { useEffect, useState, } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "react-bootstrap/Button";
import Rating from '@mui/material/Rating';
import Backdrop from '@mui/material/Backdrop';
import Paper from '@mui/material/Paper';
import { Col, Container, Row, Table } from "react-bootstrap";

const Parhaimmat = () => {

    const [viinit, setViinit] = useState([]) // useState taulukko parhaille viineille
    const [valmistusMaa, setValmistusMaa] = useState(''); // valmistusmaa select-komponentin value
    const [pakkausTyyppi, setPakkausTyyppi] = useState(''); // pakkausTyyppi select komponentin value
    const [tyyppi, setTyyppi] = useState('');  // tyyppi select komponentin value
    const [bdOpen, setbdOpen] = useState(false); // Lisätietojen näyttämisen BackDrop-tilan useState

    // Sulkee backDrop tilan
    const backDropClose = () => {
        setbdOpen(false);
    };

    // Avaa backDrop tilan
    const backDropOpen = () => {
        setbdOpen(true);
    };

    // valmistusmaa - select komponentin  handleChange
    const handleApMaaChange = (event) => {
        setValmistusMaa(event.target.value);
        console.log(valmistusMaa);
    };

    // pakkaustyyppi - select komponentin  handleChange
    const handlePakkausTyyppiChange = (event) => {
        setPakkausTyyppi(event.target.value);
        console.log(pakkausTyyppi);
    };

    // tyyppi - select komponentin  handleChange
    const handleTyyppiChange = (event) => {
        setTyyppi(event.target.value);
        console.log(tyyppi);
    };

    // Rajattu parhaiden viinien haku hakukriteerien kanssa
    const fetchRajattuHaku = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "valmistusmaa": valmistusMaa,
            "tyyppi": tyyppi,
            "pakkaustyyppi": pakkausTyyppi
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let response = await fetch("http://localhost:3001/parhaatviinit/rajattu", requestOptions);
        console.log("fetch called ...", response);
        let c = await response.json();
        setViinit(c);
    }

    // Tämä effect suoritetaan VAIN yhden kerran
    //haetaan viinit tietokannasta
    useEffect(() => {
        const fetchViinit = async () => {
            console.log("Fetching..");
            let response = await fetch("http://localhost:3001/parhaatviinit");
            console.log("fetch called ...", response);
            let c = await response.json();
            setViinit(c);
        }
        fetchViinit();
    }, []);

    //mapataan viinit tableen
    const vTable = viinit.map((s, i) => {
        return (
            <tr key={i} id={s.id}>
                <td>{i + 1}</td>
                <td>{s.nimi}</td>
                <td>{s.hinta}</td>
                <td>{s.tyyppi}</td>
                <td>{s.valmistusmaa}</td>
                <td>{s.alkoholipros}</td>
                <td>
                    <Rating
                        name="simple-controlled"
                        size='large'
                        readOnly
                        precision={0.1}
                        value={s.arvio}
                    />
                </td>
                <td><Button onClick={backDropOpen}>Lisätietoja</Button></td>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={bdOpen}
                    onClick={backDropClose}
                >
                    <Paper elevation={3} style={{ width: '70%', backgroundColor: '#f2f2f2' }}>
                        <h1>{s.nimi}</h1>
                        <h2>{s.tyyppi}</h2>
                        <p>Valmistaja: {s.valmistaja}</p>
                        <p>Hinta: {s.hinta}</p>
                        <p>Valmistaja: {s.valmistaja}</p>
                        <p>Pakkaustyyppi: {s.pakkaustyyppi}</p>
                        <p>Kuvaus: {s.kuvaus}</p>
                        <p>Luonnehdinta: {s.luonnehdinta}</p>
                        <p>Erityismaininta: {s.erityismaininta}</p>
                        <p>Valmistusmaa ja alue: {s.valmistusmaa}, {s.alue}</p>
                        <p>Vuosikerta: {s.vuosikerta}</p>
                        <p>Rypäleet: {s.rypaleet}</p>
                        <p>Alkoholiprosentti: {s.alkoholipros} %</p>
                    </Paper>
                </Backdrop>
            </tr>

        )
    });

    return (
        <div>
            <h1>Parhaat viinit</h1>
            <div>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 140 }}>
                    <InputLabel id="demo-simple-select-filled-label">Valmistusmaa</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={valmistusMaa}
                        onChange={handleApMaaChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Peru">Peru</MenuItem>
                        <MenuItem value="Etelä-Afrikka">Etelä-Afrikka</MenuItem>
                        <MenuItem value="Ruotsi">Ruotsi</MenuItem>
                        <MenuItem value="Suomi">Suomi</MenuItem>
                        <MenuItem value="Italia">Italia</MenuItem>
                        <MenuItem value="Espanja">Espanja</MenuItem>
                        <MenuItem value="Saksa">Saksa</MenuItem>
                        <MenuItem value="Yhdysvallat">Yhdysvallat</MenuItem>
                        <MenuItem value="Slovakia">Slovakia</MenuItem>
                        <MenuItem value="Itävalta">Itävalta</MenuItem>
                        <MenuItem value="Ranska">Ranska</MenuItem>
                        <MenuItem value="Muu alkuperämaa">Muu alkuperämaa</MenuItem>
                        <MenuItem value="Sveitsi">Sveitsi</MenuItem>
                        <MenuItem value="Israel">Israel</MenuItem>
                        <MenuItem value="Viro">Viro</MenuItem>
                        <MenuItem value="Japani">Japani</MenuItem>
                        <MenuItem value="Serbia">Serbia</MenuItem>
                        <MenuItem value="Armenia">Armenia</MenuItem>
                        <MenuItem value="Ukraina">Ukraina</MenuItem>
                        <MenuItem value="Pohjois-Makedonia">Pohjois-Makedonia</MenuItem>
                        <MenuItem value="Norja">Norja</MenuItem>
                        <MenuItem value="Englanti">Sveitsi</MenuItem>
                        <MenuItem value="Brasilia">Brasilia</MenuItem>
                        <MenuItem value="Moldova">Moldova</MenuItem>
                        <MenuItem value="Chile">Chile</MenuItem>
                        <MenuItem value="Argentiina">Argentiina</MenuItem>
                        <MenuItem value="Uusi-Seelanti">Uusi-Seelanti</MenuItem>
                        <MenuItem value="Tanska">Tanska</MenuItem>
                        <MenuItem value="Kosovo">Kosovo</MenuItem>
                        <MenuItem value="Tsekki">Tsekki</MenuItem>
                        <MenuItem value="Bolivia">Bolivia</MenuItem>
                        <MenuItem value="Kreikka">Kreikka</MenuItem>
                        <MenuItem value="Uruguay">Uruguay</MenuItem>
                        <MenuItem value="Georgia">Georgia</MenuItem>
                        <MenuItem value="Euroopan unioni">Euroopan unioni</MenuItem>
                        <MenuItem value="Slovenia">Slovenia</MenuItem>
                        <MenuItem value="Bulgaria">Bulgaria</MenuItem>
                        <MenuItem value="Intia">Intia</MenuItem>
                        <MenuItem value="Luxemburg">Luxemburg</MenuItem>
                        <MenuItem value="Kroatia">Kroatia</MenuItem>
                        <MenuItem value="Romania">Romania</MenuItem>
                        <MenuItem value="Kiina">Kiina</MenuItem>
                        <MenuItem value="Kypros">Kypros</MenuItem>
                        <MenuItem value="Unkari">Unkari</MenuItem>
                        <MenuItem value="Australia">Australia</MenuItem>
                        <MenuItem value="Puola">Puola</MenuItem>
                        <MenuItem value="Kanada">Kanada</MenuItem>
                        <MenuItem value="Portugali">Portugali</MenuItem>
                        <MenuItem value="Libanon">Libanon</MenuItem>
                        <MenuItem value="Turkki">Turkki</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 140 }}>
                    <InputLabel id="demo-simple-select-filled-label">Tyyppi</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={tyyppi}
                        onChange={handleTyyppiChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="punaviinit">Punaviinit</MenuItem>
                        <MenuItem value="valkoviinit">Valkoviinit</MenuItem>
                        <MenuItem value="roseeviinit">Roseeviinit</MenuItem>
                        <MenuItem value="kuohuviinit & samppanjat">Kuohuviinit & Samppanjat</MenuItem>
                        <MenuItem value="Jälkiruokaviinit, väkevöidyt ja muut viinit">Jälkiruokaviinit, väkevöidyt ja muut viinit</MenuItem>
                        <MenuItem value="alkoholittomat">Alkoholittomat</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 140 }}>
                    <InputLabel id="demo-simple-select-filled-label">Pakkaustyyppi</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={pakkausTyyppi}
                        onChange={handlePakkausTyyppiChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="kartonkitölkki">Kartonkitölkki</MenuItem>
                        <MenuItem value="pullo">Pullo</MenuItem>
                        <MenuItem value="muovipullo">Muovipullo</MenuItem>
                        <MenuItem value="tölkki">Tölkki</MenuItem>
                        <MenuItem value="viinipussi">Viinipussi</MenuItem>
                        <MenuItem value="hanapakkaus">Hanapakkaus</MenuItem>
                        <MenuItem value="paperipullo">Paperipullo</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={fetchRajattuHaku}>Päivitä</Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Table className="table table-striped table-dark" responsive="lg">
                    <thead>
                        <tr>
                            <th>Sija</th>
                            <th>Nimi</th>
                            <th>Hinta (€)</th>
                            <th>Tyyppi</th>
                            <th>Valmistusmaa</th>
                            <th>Alkoholiprosentti</th>
                            <th>Arvio</th>
                            <th>Lisätiedot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vTable}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export { Parhaimmat };

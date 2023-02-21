import React, { useEffect, useState, } from 'react'

const Parhaimmat = () => {

    const [viinit, setViinit] = useState([])

    
    // Tämä effect suoritetaan VAIN yhden kerran
    //haetaan viinit tietokannasta
    useEffect(() => {
        const fetchViinit = async () => {
            console.log("Fetching..");
            let response = await fetch("http://localhost:3001/viinit");
            console.log("fetch called ...", response);
            let c = await response.json();
            //console.log("res: " + c);
            setViinit(c);
            
        }
        fetchViinit();
        //console.log(JSON.stringify(viinit))

    }, []);

    //mapataan viinit tableen
    const vTable = viinit.map((s, i) => {
        return (

            <tr key={i} id={s.id}>
                <td>{s.nimi}</td>
                <td>{s.valmistaja}</td>
                <td>{s.pullokoko}</td>
                <td>{s.hinta}</td>
                <td>{s.litrahinta}</td>
                <td>{s.tyyppi}</td>
                <td>{s.kuvaus}</td>
                <td>{s.erityismaininta}</td>
                <td>{s.valmistusmaa}</td>
                <td>{s.alue}</td>
                <td>{s.vuosikerta}</td>
                <td>{s.rypaleet}</td>
                <td>{s.luonnehdinta}</td>
                <td>{s.pakkaustyyppi}</td>
                <td>{s.alkoholipros}</td>
                <td>{s.kcal_per_sata_ml}</td>
            </tr>

        )
    });

    return (
        <div>
            <h1>Parhaat viinit</h1>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>Nimi</th>
                        <th>Valmistaja</th>
                        <th>Pullokoko</th>
                        <th>Hinta</th>
                        <th>Litrahinta</th>
                        <th>Tyyppi</th>
                        <th>Kuvaus</th>
                        <th>Erityismaininta</th>
                        <th>Valmistusmaa</th>
                        <th>Alue</th>
                        <th>Vuosikerta</th>
                        <th>Rypäleet</th>
                        <th>Luonnehdinta</th>
                        <th>Pakkaustyyppi</th>
                        <th>Alkioholiprosentti</th>
                        <th>Kcal / 100ml</th>
                    </tr>
                </thead>
                <tbody>
                    {vTable}
                </tbody>

            </table>
        </div>
    );
    /*
   return (
    <div>
        <h1>Parhaat viinit</h1>
    </div>
   );*/
};

export { Parhaimmat };

import { Col, Container, Row } from "react-bootstrap";
import maatunnukset from "./maatunnukset.json";
import { useEffect } from "react";
import { useState } from "react";
const Profiili = (props) => {

    const [maat, setMaat] = useState([]);
    const [arviotm, setArviotm] = useState([]);
    const [arviott, setArviott] = useState([]);
    const [tulos, setTulos] = useState([]);
    const [tyypit, setTyypit] = useState([]);
    const [osoite, setOsoite] = useState([""]);



    //console.log(maatunnukset[0].argentiina);

    const kasittele = (e) => {
        if(maat.length===0){
            console.log(e);
            for (let i = 0; i < Object.keys(e).length; i++) {

                if (!maat.includes(e[i].valmistusmaa)){
                    maat.push(e[i].valmistusmaa)
                }

                if(!tyypit.includes(e[i].tyyppi)){
                    tyypit.push(e[i].tyyppi)
                }
    
                if(arviotm.length<maat.length){
                    arviotm.push([e[i].arvio]);
                }

                else {
                    arviotm[maat.indexOf(e[i].valmistusmaa)].push(e[i].arvio);
                }

                if(arviott.length<tyypit.length){
                    arviott.push([e[i].arvio]);
                }

                else {
                    arviott[tyypit.indexOf(e[i].tyyppi)].push(e[i].arvio);
                }


            }
    
            for (let i = 0; i < arviotm.length; i++) {
                let summa = 0.0;
                let jakaja =0;
                for (let j = 0; j < arviotm[i].length; j++) {
                    summa += arviotm[i][j];
                    jakaja = j+1;
                }
                arviotm[i] = summa/jakaja;
            }

            for (let i = 0; i < arviott.length; i++) {
                let summa = 0.0;
                let jakaja =0;
                for (let j = 0; j < arviott[i].length; j++) {
                    summa += arviott[i][j];
                    jakaja = j+1;
                }
                arviott[i] = summa/jakaja;
            }


            tulos.push([maat[arviotm.indexOf(Math.max.apply(null,arviotm))],Math.max.apply(null,arviotm)]);
            tulos.push([tyypit[arviott.indexOf(Math.max.apply(null,arviott))],Math.max.apply(null,arviott)]);
            
            
            console.log(tyypit);
           
            let b = tulos[0][0].toLowerCase();
            console.log(b);
            let a = maatunnukset[0][b];
            console.log(a);
            
            setOsoite("https://www.maidenliput.fi/data/flags/w580/" +a+ ".webp");
        }

        

    }


    useEffect(() => {
        const fetchArvostelut = async () => {

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + props.token);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://localhost:3001/kayttaja/viinit", requestOptions)
                .then(response => response.text())
                .then(result => kasittele(JSON.parse(result)))
                .catch(error => console.log('error', error));

        }
        if(maat.length===0){
            fetchArvostelut();
        }
        

    }, []);


    return (
        <div style={{ backgroundColor: "lightgray", minHeight: "100vh" }}>
            <h1>Maku profiilisi</h1>
            <h3>Arviointiesi perusteella pidät eniten</h3>
            <Container fluid>
                <Row>
                    <Col><img src={osoite} alt="lippu"></img></Col>
                    <Col></Col>

                </Row>
                <Row></Row>
            </Container>
        </div>
    );
};

export { Profiili };

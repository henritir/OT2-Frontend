import { Col, Container, Row, Table } from "react-bootstrap";
import maatunnukset from "./maatunnukset.json";
import { useEffect } from "react";
import { useState } from "react";
import Rating from '@mui/material/Rating';
import kyykky from "./kyykky.PNG";
import keski from "./keski.PNG";
import kallis from "./kallis.PNG";
import erittain_kallis from "./erittain_kallis.PNG";
import { textAlign } from "@mui/system";
const Profiili = (props) => {

    const [maat, setMaat] = useState([]);
    const [arviotm, setArviotm] = useState([]);
    const [arviott, setArviott] = useState([]);
    const [arvioth, setArvioh] = useState([[], [], [], []]);
    const [tulos, setTulos] = useState([]);
    const [tyypit, setTyypit] = useState([]);
    const [osoite, setOsoite] = useState([""]);
    const [marvio, setMarvio] = useState(0);
    const [tyyppi, setTyyppi] = useState("");
    const [tyyppia, setTyyppia] = useState(0);
    const [hinta, setHinta] = useState("");
    const [hintaa, setHintaa] = useState(0);
    const [lahde, setLahde] = useState();
    const [data,setData] = useState([]);
    const [maa, setMaa] = useState("");

    const hintaluokat = ["Kyykky(<20€/l)", "Keskihintainen(20-53€/l)", "Kallis(53-133€/l)", "Erittäin kallis(>133€/l)"];
    const lahteet = [kyykky, keski, kallis, erittain_kallis];





    //console.log(maatunnukset[0].argentiina);

    const kasittele = (e) => {

        e = e.sort((a,b)=>{
            if(a.aikaleima < b.aikaleima){                          //järjetstetään aikaleiman perusteella
                return -1;
            }
        });

        setData(e);

        if (maat.length === 0) {
            console.log(e);
            for (let i = 0; i < Object.keys(e).length; i++) {

                if (!maat.includes(e[i].valmistusmaa)) {             //maiden lisäys
                    maat.push(e[i].valmistusmaa)
                }

                if (!tyypit.includes(e[i].tyyppi)) {                  //tyyppien lisäys
                    tyypit.push(e[i].tyyppi)
                }

                if (arviotm.length < maat.length) {                     //ensimmäisen maakohtaisen arvion lisääminen
                    arviotm.push([e[i].arvio]);
                }

                else {
                    arviotm[maat.indexOf(e[i].valmistusmaa)].push(e[i].arvio);  //muiden kuin ensimmäisten maakohtaisten arvioiden lisäys
                }

                if (arviott.length < tyypit.length) {                   //ensimmäisen tyyppikohtaisen arvion lisääminen 
                    arviott.push([e[i].arvio]);
                }

                else {
                    arviott[tyypit.indexOf(e[i].tyyppi)].push(e[i].arvio);      //muiden kuin ensimmäisten tyyppikohtaisten arvioiden lisäys
                }


                if (e[i].litrahinta < 20) {                                     // eri hintaluokkien arvioiden lisääminen
                    arvioth[0].push(e[i].arvio);
                }

                else if (e[i].litrahinta > 15 && e[i].litrahinta < 53) {
                    arvioth[1].push(e[i].arvio);
                }

                else if (e[i].litrahinta > 53 && e[i].litrahinta < 133) {
                    arvioth[2].push(e[i].arvio);
                }

                else if (e[i].litrahinta > 100) {
                    arvioth[3].push(e[i].arvio);
                }


            }

            for (let i = 0; i < arviotm.length; i++) {                      //maakohtaisen ka:n laskeminen
                let summa = 0.0;    
                let jakaja = 0;
                for (let j = 0; j < arviotm[i].length; j++) {           
                    summa += arviotm[i][j];
                    jakaja = j + 1;
                }
                arviotm[i] = summa / jakaja;
            }

            for (let i = 0; i < arviott.length; i++) {                      //tyyppikohtaisen ka:n laskeminen
                let summa = 0.0;
                let jakaja = 0;
                for (let j = 0; j < arviott[i].length; j++) {
                    summa += arviott[i][j];
                    jakaja = j + 1;
                }
                arviott[i] = summa / jakaja;
            }

            for (let i = 0; i < arvioth.length; i++) {                  //hintaluokkakohtaisen ka:n laskeminen
                let summa = 0.0;
                let jakaja = 0;
                for (let j = 0; j < arvioth[i].length; j++) {
                    summa += arvioth[i][j];
                    jakaja = j + 1;
                }
                if (jakaja === 0) {
                    jakaja = 1
                }
                arvioth[i] = summa / jakaja;
            }

            console.log(arvioth.indexOf(Math.max.apply(null, arvioth)));


            tulos.push([maat[arviotm.indexOf(Math.max.apply(null, arviotm))], Math.max.apply(null, arviotm)]);
            tulos.push([tyypit[arviott.indexOf(Math.max.apply(null, arviott))], Math.max.apply(null, arviott)])

            setTyyppi(tyypit[arviott.indexOf(Math.max.apply(null, arviott))]);
            setTyyppia(Math.max.apply(null, arviott));
            setHinta(hintaluokat[arvioth.indexOf(Math.max.apply(null, arvioth))]);
            setLahde(lahteet[arvioth.indexOf(Math.max.apply(null, arvioth))]);
            setHintaa(Math.max.apply(null, arvioth));
            setMaa(maat[arviotm.indexOf(Math.max.apply(null,arviotm))]);


            console.log(tyypit);

            let b = tulos[0][0].toLowerCase();
            console.log(b);
            let a = maatunnukset[0][b];
            console.log(a);
            console.log(tulos);
            setMarvio(tulos[0][1]);
            setOsoite("https://www.maidenliput.fi/data/flags/w580/" + a + ".webp");
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
        if (maat.length === 0) {
            fetchArvostelut();
        }


    }, []);

    const pvm = (aikaleima)=>{
        let v = aikaleima.slice(0,4);
        let kk = aikaleima.slice(5,7);
        let p = aikaleima.slice(8,10);
        let klo = aikaleima.slice(11,16)
        return(klo+"  "+p+"."+kk+"."+v);
    }


    return (
        <div style={{ backgroundColor: "lightgray", minHeight: "100vh", textAlign:"left"}}>
            <h1>Makuprofiilisi</h1>
            <h3>Arviointiesi perusteella pidät eniten</h3>
            <Container fluid>
                <Row className="pt-5">
                    <Col md={6}><h2>Alkuperämaa</h2></Col>
                    <Col md={6}><img src={osoite} style={{ width: "70%" }} alt="lippu" ></img>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}></Col>
                    <Col md={6}>
                       <h3>{maa}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}></Col>
                    <Col md={6}>
                        <Rating
                            name="simple-controlled"
                            precision={0.25}
                            size='large'
                            readOnly
                            value={marvio}
                        />
                    </Col>
                </Row>
                <Row className="pt-5">
                    <Col md={6}><h2>Tyyppi</h2></Col>
                    <Col md={6}><h3>{tyyppi}</h3>
                        <Rating
                            name="simple-controlled"
                            precision={0.25}
                            size='large'
                            readOnly
                            value={tyyppia}
                        />

                    </Col>
                </Row>
                <Row className="pt-5">
                    <Col md={6}><h2>Hintaluokka</h2></Col>
                    <Col md={6}>
                        <h3>{hinta}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}></Col>
                    <Col md={6}><img height="200px" src={lahde} alt="halpa"></img>

                    </Col>
                </Row>
                <Row>
                    <Col md={6}></Col>
                    <Col md={6}>
                        <Rating
                            name="simple-controlled"
                            precision={0.25}
                            size='large'
                            readOnly
                            value={hintaa}
                        />
                    </Col>
                </Row>
                <Row>
                    <h2>Arviointi historiasi:</h2>
                    <Table>
                        <thead>
                            <tr>
                            <th>Viini</th>
                            <th>Valmistusmaa</th>
                            <th>Tyyppi</th>
                            <th>€/litra</th>
                            <th>Arvio</th>
                            <th>Aikaleima</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((a,i)=>{
                                return(<tr key={i}>
                                    <td>{a.nimi}</td>
                                    <td>{a.valmistusmaa}</td>
                                    <td>{a.tyyppi}</td>
                                    <td>{a.litrahinta}</td>
                                    <td>{a.arvio}</td>
                                    <td>{pvm(a.aikaleima)}</td>
                                </tr>)
                            })}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </div>
    );
};

export { Profiili };

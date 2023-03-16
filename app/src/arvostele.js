import React, { useEffect, useState, } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from "@mui/material/Box";
import Button from "react-bootstrap/Button";
import Slider from '@mui/material/Slider';
import { Button as muiButton } from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./App.css";
import { padding } from '@mui/system';
import { useCookies } from 'react-cookie';

const Arvostele = () => {
    const [value, setValue] = useState()
    const [inputValue, setInputValue] = useState();
    const [viinit, setViinit] = useState([])
    const [sliderValue, setSlidervalue] = useState(1);
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'token']);
    const [joArvosteltu, setJoArvosteltu] = useState(false);


    // Tämä effect suoritetaan VAIN yhden kerran
    //haetaan viinit tietokannasta
    useEffect(() => {
        const fetchViinit = async () => {
            console.log("Fetching..");
            let response = await fetch("http://localhost:3001/viinit/nimet");
            console.log("fetch called ...", response);
            let c = await response.json();
            setViinit(c);
        }
        fetchViinit();
    }, []);

    const fetchArvostelu = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "kayttajanimi": cookies.user,
            "arvio": sliderValue,
            "viini_id": value.viini_id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/arvosteleViini", requestOptions)
            .then(response => {
                console.log('response', response.status)
                if (response.status === 403) {
                    console.log("bingo");
                    setJoArvosteltu(true);
                } else {
                    setJoArvosteltu(false);
                }
            })
            .catch(error => console.log('error', error));
    };

    const fetchMuutaArvostelu = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "kayttajanimi": cookies.user,
            "arvio": sliderValue,
            "viini_id": value.viini_id
        });

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/muokkaa_arvostelu", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    const arvostelebtn = () => {
        if ((value !== undefined || null) && (joArvosteltu !== true)) {
            //console.log("val: " + JSON.stringify(value));
            //console.log("sliderVal: " + sliderValue);
            //console.log(value.viini_id);
            fetchArvostelu();
        }
    };

    const suljeDialogi = () => {
        setJoArvosteltu(false);
    };

    const suljeDialogiJaMuutaArvio = () => {
        setJoArvosteltu(false);
        //console.log(sliderValue);
        //console.log("val.viini_id: ", value.viini_id);
        fetchMuutaArvostelu();
    };

    return (
        <div>
            <h1>Arvioi viini asteikolla 1-5</h1>
            <div>{`inputValue: '${inputValue}'`}</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Autocomplete
                    className='Autocomplete'
                    disablePortal
                    value={value ?? null}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    id="combo-box-demo"
                    getOptionLabel={(option) => option.nimi}
                    options={viinit}
                    sx={{ width: 600 }}
                    renderOption={(props, option) => (
                        <Box component="li" {...props} key={option.viini_id}>
                            {option.nimi}
                        </Box>
                    )}
                    renderInput={(params) => <TextField {...params} label="Hae Viiniä" />}
                />
            </div>
            {value ? (<div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                    <Box width={300}>
                        <Slider
                            size="large"
                            defaultValue={1}
                            aria-label="Small"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={5}
                            color="secondary"
                            value={sliderValue ?? null}
                            onChange={(event, newValue) => {
                                setSlidervalue(newValue);
                                //console.log(sliderValue);
                            }}
                        />
                    </Box>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                    <Button onClick={() => arvostelebtn()}>
                        Arvostele
                    </Button>
                </div>
            </div>) : (<div><h1>Valitse viini että voit arvostella</h1></div>)}
            {joArvosteltu ? (
                <div>
                    <Dialog
                        open={joArvosteltu}
                        onClose={suljeDialogi}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Olet jo arvostellut tämän viinin!"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Haluatko muokata arvosteluasi?
                            </DialogContentText>
                            <p>Viinin nimi: {value.nimi}</p>
                            <p>arvio: </p>
                            <br />
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                                <Box width={300}>
                                    <Slider
                                        size="large"
                                        defaultValue={1}
                                        aria-label="Small"
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={1}
                                        max={5}
                                        color="secondary"
                                        value={sliderValue ?? null}
                                        onChange={(event, newValue) => {
                                            setSlidervalue(newValue);
                                            //console.log(sliderValue);
                                        }}
                                    />
                                </Box>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={suljeDialogi}>Sulje</Button>
                            <Button onClick={suljeDialogiJaMuutaArvio}>Muuta arvosteluasi</Button>
                        </DialogActions>
                    </Dialog>
                </div>) : (<div><p>joarvosteltu false</p></div>)}

        </div>
    );
};

export { Arvostele };

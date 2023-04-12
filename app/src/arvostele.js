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
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';
import "./App.css";
import { padding } from '@mui/system';
import { useCookies } from 'react-cookie';

const Arvostele = () => {
    const [value, setValue] = useState() // Autocompleten value, valitun viinin json-objekti
    const [viinit, setViinit] = useState([]) // Taulukko viineille 
    const [ratingValue, setRatingvalue] = useState(1); // Sliderin value, 1-5
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'token']); // Selaimen keksit
    const [joArvosteltu, setJoArvosteltu] = useState(false); // useState, joka laukaisee popup Dialog-komponentin jos valittua viiniä yrittää arvostella toista kertaa
    const [openSnackBar, setOpenSnackBar] = useState(false); //  useState, joka laukaisee popup SnackBar-komponentin jos viinin arvostelu onnistuu

    // Hakee viinit tietokannasta, tämä effect suoritetaan VAIN yhden kerran
    useEffect(() => {
        const fetchViinit = async () => {
            let response = await fetch("http://localhost:3001/viinit/nimet");
            let c = await response.json();
            setViinit(c);
        }
        fetchViinit();
    }, []);

    // Vie arvostelun tietokantaan
    const fetchArvostelu = async () => {
        let aikaleima = new Date().toLocaleString("sv-SV").slice(0, 19).replace("T", " ")
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "kayttajanimi": cookies.user,
            "arvio": ratingValue,
            "viini_id": value.viini_id,
            "aikaleima": aikaleima
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/arvosteleViini", requestOptions)
            .then(response => {
                if (response.status === 403) {
                    setJoArvosteltu(true);
                } else {
                    setJoArvosteltu(false);
                    setOpenSnackBar(true);
                }
            })
            .catch(error => console.log('error', error));
    };

    // Vie arvostelun muutoksen tietokantaan
    const fetchMuutaArvostelu = async () => {
        let aikaleima = new Date().toLocaleString("sv-SV").slice(0, 19).replace("T", " ")
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "kayttajanimi": cookies.user,
            "arvio": ratingValue,
            "viini_id": value.viini_id,
            "aikaleima": aikaleima
        });

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/muokkaa_arvostelu", requestOptions)
            .then(response => {
                if (response.status === 200) {
                    setOpenSnackBar(true);
                }
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    // Arvostele-buttonin OnClick-metodi
    const arvostelebtn = () => {
        if ((value !== undefined || null) && (joArvosteltu !== true)) {
            fetchArvostelu();
        }
    };

    //Arvostelun muokkaamisen popup-dialogin sulkeminen, Sulje-buttonin OnClick-metodi
    const suljeDialogi = () => {
        setJoArvosteltu(false);
    };

    //Arvostelun muokkaamisen popup-dialogin sulkeminen ja arvostelun muuttaminen, Muuta arvosteluasi-buttonin OnClick-metodi
    const suljeDialogiJaMuutaArvio = () => {
        setJoArvosteltu(false);
        fetchMuutaArvostelu();
    };

    // Arvostelun päivittämisen onnistumisesta ilmoittavan snackbarin sulkeminen
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    //Snackbarin X-Button
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
 
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 20}}>
            <Paper elevation={3} style={{width: '70%', backgroundColor: '#f2f2f2'}}>
                <h1 data-testid="asdd">Arvioi viini asteikolla 1-5</h1>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Autocomplete
                        className='Autocomplete'
                        disablePortal
                        autoSelect
                        value={value ?? null}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        data-testid="combo-box-demo"
                        getOptionLabel={(option) => option.nimi}
                        options={viinit}
                        sx={{ width: 600 }}
                        renderOption={(props, option) => (
                            <Box component="li" {...props} key={option.viini_id} data-testid="options">
                                {option.nimi}
                            </Box>
                        )}
                        renderInput={(params) => <TextField {...params} label="Hae Viiniä" />}
                    />
                    <Snackbar
                        open={openSnackBar}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackBar}
                        message="Viinin arvostelu onnistui!"
                        action={snackBarAction}
                    />
                </div>
                {value ? (<div data-testid="ratingdiv">
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                        <Box width={300}>
                            <Rating
                                name="simple-controlled"
                                size='large'
                                precision={0.1}
                                value={ratingValue}
                                onChange={(event, newValue) => {
                                    setRatingvalue(newValue);
                                }}
                            />
                            <h2>{ratingValue}/5</h2>
                        </Box>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                        <Button onClick={() => arvostelebtn()} data-testid="arvostelebtn">
                            Arvostele
                        </Button>
                    </div>
                </div>) : (<div><h1 data-testid="asd">Valitse viini että voit arvostella</h1></div>)}
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
                                        <Rating
                                            name="simple-controlled"
                                            size='large'
                                            precision={0.1
}
                                            value={ratingValue}
                                            onChange={(event, newValue) => {
                                                setRatingvalue(newValue);
                                            }}
                                        />
                                        <h2>{ratingValue}/5</h2>
                                    </Box>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={suljeDialogi}>Sulje</Button>
                                <Button onClick={suljeDialogiJaMuutaArvio}>Muuta arvosteluasi</Button>
                            </DialogActions>
                        </Dialog>
                    </div>) : (<div></div>)}
            </Paper>
        </div>
    );
};

export { Arvostele };

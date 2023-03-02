import React, { useEffect, useState, } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from "@mui/material/Box";
import Button from "react-bootstrap/Button";
import Slider from '@mui/material/Slider';
import "./App.css";
import { padding } from '@mui/system';

const Arvostele = () => {
    const [value, setValue] = useState()
    const [inputValue, setInputValue] = useState();
    const [viinit, setViinit] = useState([])
    const [sliderValue, setSlidervalue] = useState(1);
    //let cv = viinit.map(e => e.nimi)

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

    // <div>{`value: ${value !== undefined || null ? `'${value.viini_id}'` : 'null'}`}</div>
    const arvosteluikkuna = () => {
        if (value !== undefined || null) {
            console.log("val: " + JSON.stringify(value));
            console.log("sliderVal: " + sliderValue);
        }
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
                    <Button onClick={() => arvosteluikkuna()}>
                        Arvostele
                    </Button>
                </div>
            </div>) : (<div><h1>Valitse viini että voit arvostella</h1></div>)}

        </div>
    );
};

export { Arvostele };

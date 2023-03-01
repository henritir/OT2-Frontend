import React, { useEffect, useState, } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from "@mui/material/Box";
import "./App.css";

const Arvostele = () => {
    const [value, setValue] = useState()
    const [inputValue, setInputValue] = useState();
    const [viinit, setViinit] = useState([])
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

    return (
        <div>
            <h1>Arvioi viini</h1>
            <div>{`inputValue: '${inputValue}'`}</div>
            <div style={{display: 'flex',  justifyContent:'center'}}>
            <Autocomplete
                className='Autocomplete'
                disablePortal
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
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
        </div>
    );
};

export { Arvostele };

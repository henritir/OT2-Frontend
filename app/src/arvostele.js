import React, { useEffect, useState, } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "./App.css";

const Arvostele = () => {
    const [value, setValue] = useState()
    const [inputValue, setInputValue] = useState('');
    const [viinit, setViinit] = useState([])

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

    return (
        <div>
            <h1>Arvioi viini</h1>
            <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
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
                options={viinit.map(e => e.nimi)}
                sx={{ width: 600 }}
                renderInput={(params) => <TextField {...params} key={params} label="Hae Viiniä" />}
            />
            </div>
        </div>
    );
};

export { Arvostele };

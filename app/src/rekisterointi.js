import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Rekisterointi = () => {
    const [sposti, setSposti] = useState("");
    const [kayttajanimi, setKayttajanimi] = useState("");
    const [salasana, setSalasana] = useState("");
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openSnackBar1, setOpenSnackBar1] = useState(false);
    const [openSnackBar2, setOpenSnackBar2] = useState(false);

    const postRekisterointi = () => {
        fetch("http://localhost:3001/rekisteroidy/", {
            method: "POST",
            body: JSON.stringify({
                kayttajanimi,
                salasana,
                sposti,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.status === 400) {
                    setOpenSnackBar1(true);
                } else if (response.status === 500) {
                    setOpenSnackBar2(true);
                } else {
                    setOpenSnackBar(true);
                }
            })
            .catch((err) => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postRekisterointi();
        setKayttajanimi("");
        setSalasana("");
        setSposti("");
    };

    // Arvostelun päivittämisen onnistumisesta ilmoittavan snackbarin sulkeminen
    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackBar(false);
        setOpenSnackBar1(false);
        setOpenSnackBar2(false);
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
        <div>
            <div
                style={{
                    minHeight: "20vh",
                }}
            ></div>
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    marginLeft: "40%",
                    marginRight: "40%",
                    width: "400px",
                    minHeight: "330px",
                }}
            >
                <div className="signup__container">
                    <br></br>
                    <h2>Rekisteröidy tässä</h2>
                    <form className="signup__form" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="email"
                                name="sposti"
                                id="sposti"
                                value={sposti}
                                placeholder="Syötä sähköposti"
                                required
                                onChange={(e) => setSposti(e.target.value)}
                            />
                        </div>
                        <br></br>
                        <div>
                            <input
                                type="text"
                                id="kayttajanimi"
                                name="kayttajanimi"
                                value={kayttajanimi}
                                placeholder="Syötä käyttäjänimi"
                                required
                                onChange={(e) =>
                                    setKayttajanimi(e.target.value)
                                }
                            />
                        </div>
                        <br></br>
                        <div>
                            <input
                                type="password"
                                name="salasana"
                                id="salasana"
                                minLength={8}
                                value={salasana}
                                placeholder="Syötä salasana"
                                required
                                onChange={(e) => setSalasana(e.target.value)}
                            />
                        </div>
                        <br></br>
                        <div>
                            <button data-testid="rek">Rekisteröidy</button>
                        </div>
                        <div>
                            <p>
                                Sinulla on jo tili?{" "}
                                <Nav.Link
                                    href="/"
                                    style={{
                                        color: "blue",
                                        textDecoration: "underline",
                                    }}
                                >
                                    Palaa etusivulle.
                                </Nav.Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                message="Rekisteröityminen onnistui!"
                action={snackBarAction}
            />
            <Snackbar
                open={openSnackBar1}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                message="Käyttäjänimi tai sähköposti on jo käytössä."
                action={snackBarAction}
            />
            <Snackbar
                open={openSnackBar2}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                message="Käyttäjän lisäys epäonnistui."
                action={snackBarAction}
            />
        </div>
    );
};

export { Rekisterointi };

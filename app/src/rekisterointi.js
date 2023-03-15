import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Rekisterointi = () => {
    const [sposti, setSposti] = useState("");
    const [kayttajanimi, setKayttajanimi] = useState("");
    const [salasana, setSalasana] = useState("");

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
            .then((res) => res.json())
            .then((data) => {
                if (data.error_message) {
                    alert(data.error_message);
                } else {
                    alert(data.message);
                    <Navigate to="/" />;
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
                    <h2>Rekisteröidy</h2>
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
                            <button>Rekisteröidy</button>
                        </div>
                        <div>
                            <p>
                                Sinulla on jo tili? <Link to="/">Kirjaudu</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export { Rekisterointi };

/* {
    boolean ? (
        <div>
            <div
                style={{
                    minHeight: "20vh",
                }}
            ></div>
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    marginLeft: "40%",
                    marginRight: "40%",
                    width: "400px",
                    minHeight: "330px",
                }}
            >
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <div>
                    <h1>Rekisteröityminen onnistui</h1>
                </div>
            </div>
        </div>
    ) : (
        <div
            style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                marginLeft: "40%",
                marginRight: "40%",
                width: "400px",
                minHeight: "330px",
            }}
        >
            <form action="/onnistui">
                <br></br>
                <div>
                    <h1>Rekisteröidy tässä</h1>
                </div>
                <br></br>
                <div>
                    <input
                        id="sahkoposti"
                        type={"sposti"}
                        placeholder={"Sähköposti"}
                        style={{ borderRadius: "6px" }}
                        required
                    ></input>
                </div>
                <br></br>
                <div>
                    <input
                        id="tunnus"
                        type={"text"}
                        placeholder={"Käyttäjätunnus"}
                        style={{ borderRadius: "6px" }}
                        required
                    ></input>
                </div>
                <br></br>
                <div>
                    <input
                        id="salasana"
                        type={"salasana"}
                        placeholder={"Salasana"}
                        style={{ borderRadius: "6px" }}
                        required
                    ></input>
                </div>
                <br></br>
                <div>
                    <button
                        id="nappi"
                        type="submit"
                        style={{
                            borderRadius: "6px",
                            backgroundColor: "gray",
                        }}
                        onClick={() => {
                            setBoolean(true);
                        }}
                    >
                        Rekisteröidy
                    </button>
                </div>
            </form>
        </div>
    );
} */

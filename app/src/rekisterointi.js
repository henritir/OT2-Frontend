const Rekisterointi = () => {
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
                <form action="/onnistui">
                    <br></br>
                    <div>
                        <h1>Rekisteröidy tässä</h1>
                    </div>
                    <br></br>
                    <div>
                        <input
                            id="sahkoposti"
                            type={"email"}
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
                            type={"password"}
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
                        >
                            Rekisteröidy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { Rekisterointi };

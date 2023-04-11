import { Rekisterointi } from "../src/rekisterointi";
import RouteApp from "../src/router";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("Rekisteröitymis testi", () => {
    test("Tarkista linkki", async () => {
        render(<RouteApp />);

        let rekNappi = await screen.findByTestId("reki");
        expect(rekNappi).toHaveAttribute("href", "/rekisterointi");
    });

    test("Testaa ulkonäkö", async () => {
        render(<RouteApp />);
        render(<Rekisterointi />);

        let rekNappi = await screen.findByTestId("reki");
        expect(rekNappi).toHaveAttribute("href", "/rekisterointi");

        let etuNappi = await screen.findByText("Etusivu");
        expect(etuNappi).toHaveAttribute("href", "/");

        let proNappi = await screen.findByText("Profiili");
        expect(proNappi).toHaveAttribute("href", "/profiili");

        let parNappi = await screen.findByText("Parhaimmat");
        expect(parNappi).toHaveAttribute("href", "/parhaimmat");

        let arNappi = await screen.findByText("Arvostele");
        expect(arNappi).toHaveAttribute("href", "/arvostele");

        let paNappi = await screen.findByText("Palaa etusivulle.");
        expect(paNappi).toHaveAttribute("href", "/");

        expect(
            await screen.findByText("Rekisteröidy tässä")
        ).toBeInTheDocument();

        expect(
            await screen.findByText("Sinulla on jo tili?")
        ).toBeInTheDocument();
    });

    test("Testaa sähköposti", async () => {
        render(<Rekisterointi />);

        let spostiInput = await screen.findByPlaceholderText(
            /Syötä sähköposti/i
        );

        expect(spostiInput).toBeInvalid();

        userEvent.type(spostiInput, "sa.le@gmail.com");

        expect(spostiInput).toBeValid();
    });

    test("Testaa käyttäjänimi", async () => {
        render(<Rekisterointi />);

        let kayttajaInput = await screen.findByPlaceholderText(
            /Syötä käyttäjänimi/i
        );

        expect(kayttajaInput).toBeInvalid();

        userEvent.type(kayttajaInput, "SaLe");

        expect(kayttajaInput).toBeValid();
    });

    test("Testaa salasana", async () => {
        render(<Rekisterointi />);

        let salasanaInput = await screen.findByPlaceholderText(
            /Syötä salasana/i
        );

        expect(salasanaInput).toBeInvalid();

        userEvent.type(salasanaInput, "SaLe21");

        expect(salasanaInput).toBeValid();
    });
});

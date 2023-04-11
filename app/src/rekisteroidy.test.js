import { Rekisterointi } from "../src/rekisterointi";
import RouteApp from "../src/router";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("Rekisteröitymis testi", () => {
    const setup = () => {
        render(<Rekisterointi />);
    };

    test("Tarkista linkki", async () => {
        render(<RouteApp />);

        let rekNappi = await screen.findByTestId("reki");
        expect(rekNappi).toHaveAttribute("href", "/rekisterointi");
    });

    test("Testaa rekisterointi", async () => {
        render(<Rekisterointi />);

        let spostiInput = await screen.findByPlaceholderText(
            /Syötä sähköposti/i
        );
        let kayttajaInput = await screen.findByPlaceholderText(
            /Syötä käyttäjänimi/i
        );
        let salasanaInput = await screen.findByPlaceholderText(
            /Syötä käyttäjänimi/i
        );
        const nappi = await screen.findByTestId("rek");

        expect(spostiInput).toBeInvalid();
        expect(kayttajaInput).toBeInvalid();
        expect(salasanaInput).toBeInvalid();

        userEvent.type(spostiInput, "sa.le@gmail.com");
        userEvent.type(kayttajaInput, "SaLe");
        userEvent.type(salasanaInput, "SaLe21");

        expect(spostiInput).toBeValid();
        expect(kayttajaInput).toBeValid();
        expect(salasanaInput).toBeValid();
    });
});

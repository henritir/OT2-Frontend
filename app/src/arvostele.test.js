import { Rekisterointi } from "../src/rekisterointi";
import RouteApp from "../src/router";
import { fireEvent, getAllByRole, getByRole, getByText, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Arvostele } from "./arvostele";

describe("Arvostelun testi", () => {
    const setup = () => {
        render(<Arvostele />);
    };

    test("Tarkista autocomplete", async () => {
        render(<Arvostele />);

        let autocompleteInput = await screen.findByTestId("combo-box-demo");
        //let jokudivi = await screen.findByTestId("asdd");
        userEvent.type(autocompleteInput, "Latourba Unique Brut");
        // userEvent.click(jokudivi)
        //   await userEvent.keyboard('{ArrowDown}')
        // await userEvent.keyboard('{Enter}')
        const opts = await screen.findAllByRole("combobox");
        userEvent.click(opts[0]);
        expect(autocompleteInput).toHaveTextContent("Latourba Unique Brut");
        // console.log(Arvostele.value);
        render(<Arvostele />);
        let ratingbutton = screen.getByRole("button")
        expect(ratingdiv).not.toBeVisible();
        //console.log(arvostelenappi.id);

    });


});

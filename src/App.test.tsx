import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders appointments header", () => {
	render(<App />);
	const headerElement = screen.getByText(/Appointments/i, {
		selector: "h1",
	});
	expect(headerElement).toBeInTheDocument();
});

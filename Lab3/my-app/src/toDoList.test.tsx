import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";

describe("read list", () => {
    test("reads items", () => {
      render(<ToDoList />);
   
      const listItem1 = screen.getByText("Apples");
      const listItem2 = screen.getByText("Bananas");
      expect(listItem1).toBeInTheDocument();
      expect(listItem2).toBeInTheDocument();
    });
   
    
});

describe("Checked counter", () => {
    test("counter increments", () => {
        render(<ToDoList/>);

        const checkboxes = screen.getAllByRole('checkbox');
        const appleCheckbox = checkboxes[0];
        const bananaCheckbos = checkboxes[1];
        const counterZero = screen.getByText(/Items bought: 0/i);

        expect(counterZero).toBeInTheDocument();

        fireEvent.click(appleCheckbox);
        const counterOne = screen.getByText(/Items bought: 1/i);
        
        expect(counterOne).toBeInTheDocument();

    });

    test("counter decrements", () => {
        render(<ToDoList/>);

        const checkboxes = screen.getAllByRole('checkbox');
        const appleCheckbox = checkboxes[0];
        const bananaCheckbos = checkboxes[1];

        const counterZero = screen.getByText(/Items bought: 0/i);

        fireEvent.click(appleCheckbox);
        
        fireEvent.click(appleCheckbox);

        expect(counterZero).toBeInTheDocument();

    });

});
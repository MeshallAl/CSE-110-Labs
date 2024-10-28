import { render, screen, fireEvent } from "@testing-library/react";
import { MyBudgetTracker } from "../views/MyBudgetTracker";
import { AppProvider } from "../context/AppContext";

describe("Creation of an Expense", () => {
    test("creates a new expense", () => {
        render(
            <AppProvider>
                <MyBudgetTracker />
            </AppProvider>
        );
     
        const createExpenseName = screen.getByLabelText("Name");
        const createExpenseCost = screen.getByLabelText("Cost")
        const saveExpenseButton = screen.getByText("Save");
     
        fireEvent.change(createExpenseName, { target: { value: "Expense1" } });
        fireEvent.change(createExpenseCost, { target: { value: 100 }, });
        fireEvent.click(saveExpenseButton);
     
        
        const newExpenseName = screen.getByText(/Expense1/i);
        const newExpenseCost = screen.getByText("$100");
     
        expect(newExpenseName).toBeInTheDocument();
        expect(newExpenseCost).toBeInTheDocument();
        
      });

      test("total spent value updates correctly", () => {
        render(
            <AppProvider>
                <MyBudgetTracker />
            </AppProvider>
        );
     
        const totalSpentBefore = screen.getByText("Spent so far: $0");
        expect(totalSpentBefore).toBeInTheDocument();
        
        const createExpenseName = screen.getByLabelText("Name");
        const createExpenseCost = screen.getByLabelText("Cost")
        const saveExpenseButton = screen.getByText("Save");
     
        fireEvent.change(createExpenseName, { target: { value: "Expense1" } });
        fireEvent.change(createExpenseCost, { target: { value: 100 }, });
        fireEvent.click(saveExpenseButton);

        const totalSpentAfter = screen.getByText("Spent so far: $100");
        expect(totalSpentAfter).toBeInTheDocument();
        
        
      });

      test("remaining value updates correctly", () => {
        render(
            <AppProvider>
                <MyBudgetTracker />
            </AppProvider>
        );
     
        const remainingBefore = screen.getByText("Remaining: $1000");
        expect(remainingBefore).toBeInTheDocument();
        
        const createExpenseName = screen.getByLabelText("Name");
        const createExpenseCost = screen.getByLabelText("Cost")
        const saveExpenseButton = screen.getByText("Save");
     
        fireEvent.change(createExpenseName, { target: { value: "Expense1" } });
        fireEvent.change(createExpenseCost, { target: { value: 100 }, });
        fireEvent.click(saveExpenseButton);

        const remainingAfter = screen.getByText("Remaining: $900");
        expect(remainingAfter).toBeInTheDocument();
        
        
      });

});

describe("Deletion of an Expense", () => {
    test("deleting an expense", () => {
        render(
            <AppProvider>
                <MyBudgetTracker />
            </AppProvider>
        );
     
        const createExpenseName = screen.getByLabelText("Name");
        const createExpenseCost = screen.getByLabelText("Cost")
        const saveExpenseButton = screen.getByText("Save");
     
        fireEvent.change(createExpenseName, { target: { value: "Expense1" } });
        fireEvent.change(createExpenseCost, { target: { value: 100 }, });
        fireEvent.click(saveExpenseButton);
     
        
        const newExpenseName = screen.getByText(/Expense1/i);
        const newExpenseCost = screen.getByText("$100");
     
        expect(newExpenseName).toBeInTheDocument();
        expect(newExpenseCost).toBeInTheDocument();

        const deleteButton = screen.getByText("x");
        fireEvent.click(deleteButton);

        expect(newExpenseName).not.toBeInTheDocument();
        expect(newExpenseCost).not.toBeInTheDocument();
        
      });

      test("total spent value updates correctly", () => {
        render(
            <AppProvider>
                <MyBudgetTracker />
            </AppProvider>
        );
             
        const createExpenseName = screen.getByLabelText("Name");
        const createExpenseCost = screen.getByLabelText("Cost")
        const saveExpenseButton = screen.getByText("Save");

        const totalSpentStart = screen.getByText("Remaining: $1000");
        expect(totalSpentStart).toBeInTheDocument();
     
        fireEvent.change(createExpenseName, { target: { value: "Expense1" } });
        fireEvent.change(createExpenseCost, { target: { value: 100 }, });
        fireEvent.click(saveExpenseButton);

        const totalSpentBefore = screen.getByText("Spent so far: $100");
        expect(totalSpentBefore).toBeInTheDocument();

        const deleteButton = screen.getByText("x");
        fireEvent.click(deleteButton);

        const totalSpentAfter = screen.getByText("Spent so far: $0");
        expect(totalSpentAfter).toBeInTheDocument();

        
        
      });

      test("remaining value updates correctly", () => {
        render(
            <AppProvider>
                <MyBudgetTracker />
            </AppProvider>
        );
     
        const remainingStart = screen.getByText("Remaining: $1000");
        expect(remainingStart).toBeInTheDocument();
        
        const createExpenseName = screen.getByLabelText("Name");
        const createExpenseCost = screen.getByLabelText("Cost")
        const saveExpenseButton = screen.getByText("Save");
     
        fireEvent.change(createExpenseName, { target: { value: "Expense1" } });
        fireEvent.change(createExpenseCost, { target: { value: 100 }, });
        fireEvent.click(saveExpenseButton);

        const remainingBefore = screen.getByText("Remaining: $900");
        expect(remainingBefore).toBeInTheDocument();

        const deleteButton = screen.getByText("x");
        fireEvent.click(deleteButton);

        const remainingAfter = screen.getByText("Remaining: $1000");
        expect(remainingAfter).toBeInTheDocument();
        
        
      });

});

describe("Budget Balance", () => {
    test("Budget is correct at start", () => {
        render(
            <AppProvider>
                <MyBudgetTracker />
            </AppProvider>
        );
     
        const budgetStart = screen.getByText("Budget: $1000") 
        expect(budgetStart).toBeInTheDocument();
        
      });

      test("budget is correct when expense added", () => {
        render(
            <AppProvider>
                <MyBudgetTracker />
            </AppProvider>
        );
             
        const createExpenseName = screen.getByLabelText("Name");
        const createExpenseCost = screen.getByLabelText("Cost")
        const saveExpenseButton = screen.getByText("Save");

        const budgetStart = screen.getByText("Budget: $1000") 
        expect(budgetStart).toBeInTheDocument();
     
        fireEvent.change(createExpenseName, { target: { value: "Expense1" } });
        fireEvent.change(createExpenseCost, { target: { value: 100 }, });
        fireEvent.click(saveExpenseButton);

        const budgetAfter = screen.getByText("Budget: $1000") 
        expect(budgetStart).toBeInTheDocument();
        
        
      });

      test("Budget is correct when expense is deleted", () => {
        render(
            <AppProvider>
                <MyBudgetTracker />
            </AppProvider>
        );
     
        const createExpenseName = screen.getByLabelText("Name");
        const createExpenseCost = screen.getByLabelText("Cost")
        const saveExpenseButton = screen.getByText("Save");

        const budgetStart = screen.getByText("Budget: $1000") 
        expect(budgetStart).toBeInTheDocument();
     
        fireEvent.change(createExpenseName, { target: { value: "Expense1" } });
        fireEvent.change(createExpenseCost, { target: { value: 100 }, });
        fireEvent.click(saveExpenseButton);

        const budgetAfter = screen.getByText("Budget: $1000") 
        expect(budgetStart).toBeInTheDocument();

        const deleteButton = screen.getByText("x");
        fireEvent.click(deleteButton);

        const budgetEnd = screen.getByText("Budget: $1000");
        expect(budgetEnd).toBeInTheDocument();
        
        
      });

});
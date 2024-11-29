class BankAccount {
  // Private property to store balance
  #balance;
  
  constructor(initialBalance = 0) {
    // Validate initial balance
    this.balance = initialBalance;
  }

  // Getter for balance with formatting
  get balance() {
    // Format balance as currency
    return `$${this.#balance.toFixed(2)}`;
  }

  // Setter with validation
  set balance(amount) {
    // Prevent negative balances
    if (amount < 0) {
      throw new Error("Balance cannot be negative");
    }
    
    // Round to two decimal places for financial accuracy
    this.#balance = Number(amount.toFixed(2));
  }

  // Method to deposit funds
  deposit(amount) {
    // Uses the setter for validation
    this.balance = this.#balance + amount;
  }

  // Method to withdraw funds
  withdraw(amount) {
    if (amount > this.#balance) {
      throw new Error("Insufficient funds");
    }
    // Uses the setter for validation
    this.balance = this.#balance - amount;
  }
}

// Usage example
const account = new BankAccount(1000);
console.log(account.balance); // "$1000.00"
account.deposit(500);
console.log(account.balance); // "$1500.00"
account.withdraw(200);
console.log(account.balance); // "$1300.00"

class BankAccount {
  // Private property to store balance
  #balance: number;

  constructor(initialBalance: number = 0) {
    // Validate initial balance
    if (initialBalance < 0) {
      throw new Error("Initial balance cannot be negative");
    }
    this.#balance = Number(initialBalance.toFixed(2));
  }

  // Getter for balance with formatting
  get balance(): string {
    // Format balance as currency
    return `$${this.#balance.toFixed(2)}`;
  }

  // Method to deposit funds
  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    this.#balance += Number(amount.toFixed(2));
  }

  // Method to withdraw funds
  withdraw(amount: number): void {
    if (amount > this.#balance) {
      throw new Error("Insufficient funds");
    }
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive");
    }
    this.#balance -= Number(amount.toFixed(2));
  }
}

// Usage example
const account = new BankAccount(1000); // Create account with $1000
console.log(account.balance); // "$1000.00"
account.deposit(500); // Deposit $500
console.log(account.balance); // "$1500.00"
account.withdraw(200); // Withdraw $200
console.log(account.balance); // "$1300.00"


class BankAccount {
  // Private property with type annotation
  private balance: number;
  
  constructor(initialBalance: number = 0) {
    // Validate initial balance
    this.setBalance(initialBalance);
  }

  // Getter for balance with formatting
  getBalance(): string {
    // Format balance as currency
    return `$${this.balance.toFixed(2)}`;
  }

  // Explicit setter method in TypeScript
  setBalance(amount: number): void {
    // Prevent negative balances
    if (amount < 0) {
      throw new Error("Balance cannot be negative");
    }
    
    // Round to two decimal places for financial accuracy
    this.balance = Number(amount.toFixed(2));
  }

  // Method to deposit funds
  deposit(amount: number): void {
    this.setBalance(this.balance + amount);
  }

  // Method to withdraw funds
  withdraw(amount: number): void {
    if (amount > this.balance) {
      throw new Error("Insufficient funds");
    }
    this.setBalance(this.balance - amount);
  }
}

// Usage example
const account = new BankAccount(1000);
console.log(account.getBalance()); // "$1000.00"
account.deposit(500);
console.log(account.getBalance()); // "$1500.00"
account.withdraw(200);
console.log(account.getBalance()); // "$1300.00"

class ContaBancaria {
  // Propriedade privada para armazenar o saldo
  #saldo: number;

  constructor(saldoInicial: number = 0) {
    // Validar saldo inicial
    if (saldoInicial < 0) {
      throw new Error("O saldo inicial não pode ser negativo");
    }
    this.#saldo = Number(saldoInicial.toFixed(2));
  }

  // Getter para o saldo com formatação
  get saldo(): string {
    // Formatar o saldo como moeda
    return `R$${this.#saldo.toFixed(2)}`;
  }

  // Método para depositar fundos
  depositar(valor: number): void {
    if (valor <= 0) {
      throw new Error("O valor do depósito deve ser positivo");
    }
    this.#saldo += Number(valor.toFixed(2));
  }

  // Método para sacar fundos
  sacar(valor: number): void {
    if (valor > this.#saldo) {
      throw new Error("Fundos insuficientes");
    }
    if (valor <= 0) {
      throw new Error("O valor do saque deve ser positivo");
    }
    this.#saldo -= Number(valor.toFixed(2));
  }
}

// Exemplo de uso
const conta = new ContaBancaria(1000); // Criar conta com R$1000
console.log(conta.saldo); // "R$1000.00"
conta.depositar(500); // Depositar R$500
console.log(conta.saldo); // "R$1500.00"
conta.sacar(200); // Sacar R$200
console.log(conta.saldo); // "R$1300.00"
conta.depositar(-500);
console.log(conta.saldo);


// Criando um objeto simples
const user = { name: "John" };

// Configurando uma nova propriedade 'age' no objeto
Object.defineProperty(user, "age", {
  value: 30,           // Define o valor inicial
  writable: false,     // Não permite alterar o valor
  enumerable: true,    // A propriedade aparecerá em iterações
  configurable: false  // Não permite deletar ou reconfigurar
});

// Tentando alterar o valor
user.age = 40; // Ignorado porque writable é false
console.log(user.age); // 30

// Listando as propriedades do objeto
console.log(Object.keys(user)); // ['name', 'age']

// Tentando deletar a propriedade
delete user.age; // Ignorado porque configurable é false
console.log(user.age); // 30

// Redefinindo a propriedade (isso lança um erro em 'strict mode')
Object.defineProperty(user, "age", { writable: true }); 
// TypeError: Cannot redefine property 'age'


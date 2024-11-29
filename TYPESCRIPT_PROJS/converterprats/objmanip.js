const obj = {};

// Adicionando propriedades configuradas
Object.defineProperty(obj, "readOnly", {
  value: "I cannot be changed",
  writable: false, // Somente leitura
});

Object.defineProperty(obj, "hidden", {
  value: "You can't see me",
  enumerable: false, // Não aparece em iterações
});

Object.defineProperty(obj, "fixed", {
  value: "Permanent",
  configurable: false, // Não pode ser deletada nem alterada
});

// Testando as configurações
console.log(obj.readOnly); // 'I cannot be changed'
obj.readOnly = "New value"; // Ignorado
console.log(obj.readOnly); // 'I cannot be changed'

console.log(Object.keys(obj)); // []

delete obj.fixed; // Ignorado
console.log(obj.fixed); // 'Permanent'


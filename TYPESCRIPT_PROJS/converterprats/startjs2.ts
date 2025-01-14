let a: string | null = prompt("First number?", "1");
let b: string | null = prompt("Second number?", "2");

let numA: number = a !== null ? Number(a) : 0;
let numB: number = b !== null ? Number(b) : 0;

let sum: number = numA + numB;
let sub: number = numA - numB;

alert(`Sum: ${sum}`);
alert(`Subtraction: ${sub}`);


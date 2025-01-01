function Calculator() {
  

  this.methods = {
    "-": (a: number, b: number) => a - b,
    "+": (a: number, b: number) => a + b
  };

  this.calculate = function(str: string) {

    let split = str.split(' '),
      a = +split[0],
      op = split[1],
      b = +split[2];

    if (!this.methods[op] || isNaN(a) || isNaN(b)) {
      return NaN;
    }

    return this.methods[op](a, b);
  };

  this.addMethod = function(name: string, func: {}) {
    this.methods[name] = func;
  };
}


let calc = new Calculator;

alert( calc.calculate("3 + 7") ); // 10

let power = new Calculator;
power.addMethod("*", (a, b) => a * b);
power.addMethod("/", (a, b) => a / b);
power.addMethod("**", (a, b) => a ** b);

let result = power.calculate("2 ** 3");
alert( result ); // 8


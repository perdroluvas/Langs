function sumSalaries(salaries: Record<string, number>): number {
  let soma = 0;
  for (let key in salaries) {
    soma += salaries[key];
  }
  return soma;
}

let salaries: Record<string, number> = {
  John: 100,
  Ann: 160,
  Pete: 130
};

alert(sumSalaries(salaries));

let sum = 0;
for (let key in salaries) {
  sum += salaries[key] * 2;
}

alert(sum); // 780
alert(salaries.Pete);
alert(salaries.John);

function sumSalaries(sal) {
  let soma = 0;
  for (let key in sal){
    soma += salaries[key];
  }
  return soma;


}

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}


alert(sumSalaries(salaries));



let sum = 0;
for (let key in salaries) {
  sum += salaries[key]*2;
}

alert(sum); // 390
alert(salaries.Pete);

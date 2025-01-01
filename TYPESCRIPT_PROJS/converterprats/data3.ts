function sumSalaries(sal: number) {
  var soma = 0;
  for (let key = 0; key < sal; key++) {
    soma += salaries[key]; 
  }
  return soma;
  //for (let key in sal){
  //  soma += salaries[key];
  //}
  //return soma;
  //

}
var salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}

alert(sumSalaries(salaries));
var sum = 0;
for (let key in salaries) {
  sum += salaries[key]*2;
}
alert(sum); // 390
alert(salaries.Pete);

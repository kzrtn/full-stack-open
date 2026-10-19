type Operation = 'multiply' | 'add' | 'divide';

const calculator = (a:number, b:number, op:Operation): number | string => {
  if (op === 'multiply') {
    return a * b;
  } else if (op === 'add') {
    return a + b;
  } else if (op === 'divide') {
    if (b === 0) return 'can\'t divide by 0!'
    return a / b;
  }
}

console.log(calculator(1, 2, 'add'));
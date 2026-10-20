type Operation = 'multiply' | 'add' | 'divide';
type Result = string | number

const calculator = (a:number, b:number, op:Operation): Result => {
  switch (op) {
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) throw new Error(`Can't divide by 0!`);
    case 'add':
      return a + b;
    default:
      throw new Error ('Operation is not multiply, add or divide!')
  }
}

try {
  console.log(calculator(1, 2, 'add'));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
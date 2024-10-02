function generateQuestion() {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];

    let question, answer;
    if (operator === '+') {
        question = `${num1} + ${num2}`;
        answer = (num1 + num2).toString();
    } else if (operator === '-') {
        question = `${num1} - ${num2}`;
        answer = (num1 - num2).toString();
    } else if (operator === '*') {
        question = `${num1} * ${num2}`;
        answer = (num1 * num2).toString();
    }

    return { question, answer };
}

// Implement modulo without using the (%) operator.
const modulo = (a, b) => {
  let quotient = Math.trunc(a / b);
  return a - b * quotient;
};

// Take an input string and determine if exactly 3 question marks
// exist between every pair of numbers that add up to 10.
// If so, return true, otherwise return false.
const question_mark = s => {
  let isValid = true;
  const numberIndices = [];
  for (let i = 0; i < s.length; i++) {
    if (!(isNaN(parseInt(s.charAt(i))))) {
      numberIndices.push(i);
    }
  }
  for (let i = 0; i < numberIndices.length; i++) {
    const leftNum = parseInt(s.charAt(numberIndices[i]));
    const rightNum = parseInt(s.charAt(numberIndices[i+1]));
    if (leftNum+rightNum === 10) {
      if (numberIndices[i+1] - numberIndices[i] !== 4) {
        isValid = false;
      } else if (s.charAt(numberIndices[i] + 1) !== '?' || s.charAt(numberIndices[i] + 2) !== '?' || s.charAt(numberIndices[i] + 3) !== '?' ){
        isValid = false;
      }
    }
  }
  return isValid;
};

console.log("Testing modulo");
console.log("Expected: " + 34%8 + ", is " + modulo(34, 8));
console.log("Expected: " + 192%23 + ", is " + modulo(192, 23));
console.log("Expected: " + 33%33 + ", is " + modulo(33, 33));
console.log("Expected: " + -123%30 + ", is " + modulo(-123, 30));
console.log("Expected: " + 1%1 + ", is " + modulo(1, 1));
console.log("");
console.log("Testing question_mark");
console.log("Expected: false" + ", is " +  question_mark("19???19"));
console.log("Expected: false" + ", is " +  question_mark("2039???128"));
console.log("Expected: false" + ", is " +  question_mark("2039??1"));
console.log("Expected: false" + ", is " +  question_mark("9...1"));
console.log("Expected: true" + ", is " +  question_mark("*.03sa9???12???8"));
console.log("Expected: true" + ", is " +  question_mark("*.0???3sa9???12???8"));
console.log("Expected: true" + ", is " +  question_mark("*.0???3sa9???12???8??3???7"));


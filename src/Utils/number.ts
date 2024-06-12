/** formatDollar
 * @param {number|string} input - The new value to check if it can be formatted as a dollar amount.
 * @param {number|string} lastInput - The last value of the input before it was prompted to change.
 * @returns {number|string} The formatted value of the input as a dollar amount.
 */
export const formatDec = (
  input: string,
  lastInput: string,
  decimals: number = 2
) => {
  const isDecimal = /^-?\d+(\.\d+)?$/;
  if (!isDecimal.test(input)) {
    if (decimals > 0) {
      //get the last character and check if it's either a period or empty, else we won't update it as it's odds are not a number
      const lastChar = input.slice(-1);
      //check if it's a decimal and if it's the first time the decimal has occured
      if (lastChar === "." && input.indexOf(".") === input.length - 1) {
        return input;
      }
    }
    if (input === "") return 0;
    return lastInput;
    // For example, display an error message or reset the value
  } else {
    //check if there is more than 2 decimal places
    if (input.split(".")[1] && input.split(".")[1].length > decimals) {
      return lastInput;
    }

    const lastChar = input.slice(-1);
    if (lastChar === "0") {
      //check if the first character is a 0 and the second character is not a period then we know the user is trying to do 00 or 000 etc
      if (input.length >= decimals && input[0] === "0" && input[1] !== ".") {
        return 0;
      }
      return input;
    } else {
      const value = parseFloat(input);
      return value;
    }
  }
};

const decoder = new TextDecoder("utf-8");
const rawData = await Deno.readFile("../input.txt");
const data = decoder.decode(rawData).split("\n");

const isNumberCode = (code: number) => code >= 48 && code <= 57;

const outputNumbers = data.map((row: string): number => {
  let numberStr = "";

  for (let i = 0; i < row.length; i++) {
    if (isNumberCode(row.charCodeAt(i))) {
      numberStr += row[i];

      break;
    }
  }

  for (let i = row.length - 1; i >= 0; i--) {
    if (isNumberCode(row.charCodeAt(i))) {
      numberStr += row[i];

      break;
    }
  }

  return parseInt(numberStr, 10);
});

console.log(outputNumbers.reduce((a, b) => a + b, 0));

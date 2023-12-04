import { assert } from "https://deno.land/std@0.208.0/assert/mod.ts";

const decoder = new TextDecoder("utf-8");
const rawData = await Deno.readFile("../input.txt");
const data = decoder.decode(rawData).split("\n");

const numberWordToNumberCharacterMap = {
  "one": "1",
  "two": "2",
  "three": "3",
  "four": "4",
  "five": "5",
  "six": "6",
  "seven": "7",
  "eight": "8",
  "nine": "9",
};

const firstNumberRegexString = `^.*?(${
  Object.keys(numberWordToNumberCharacterMap).join("|")
}|\\d){1}`;
const lastNumberRegexString = `.*(${
  Object.keys(numberWordToNumberCharacterMap).join("|")
}|\\d){1}?.*$`;

const getNumberFromWordOrNumber = (input: string): string =>
  input.length === 1 ? input : numberWordToNumberCharacterMap[input] as string;

const findNumber = (input: string, regExp: RegExp): string => {
  const matches = regExp.exec(input);

  assert(matches, `No matches found for ${input}`);

  const lastMatch = matches[matches.length - 1];

  return getNumberFromWordOrNumber(lastMatch);
};

const outputNumbers = data.map((row: string): number => {
  const firstNumber = findNumber(
    row,
    new RegExp(
      firstNumberRegexString,
      "d",
    ),
  );

  const secondNumber = findNumber(
    row,
    new RegExp(
      lastNumberRegexString,
      "d",
    ),
  );

  return parseInt(`${firstNumber}${secondNumber}`, 10);
});

console.log(outputNumbers.reduce((a, b) => a + b, 0));

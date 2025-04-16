import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const range = (start: number, stop: number, step: number = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export function convertTZ(date: string, tzString: string) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}

export const timeConversion = (milliseconds: number) => {
  if (!milliseconds) return 0;
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

  let time = hours !== 0 ? `${hours}h` : ``;
  time += minutes !== 0 ? ` ${minutes}m` : ``;
  time += ` ${seconds}s`;
  return time;
};

export function numberToWords(number: number) {
  if (number === 0) return "zero";

  const belowTwenty = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const aboveThousand = ["", "thousand", "million", "billion"];

  function helper(n: number): string {
    if (n === 0) return "";
    else if (n < 20) return belowTwenty[n] + " ";
    else if (n < 100) return tens[Math.floor(n / 10)] + " " + helper(n % 10);
    else
      return belowTwenty[Math.floor(n / 100)] + " hundred " + helper(n % 100);
  }

  let word = "";
  let place = 0;

  while (number > 0) {
    if (number % 1000 !== 0) {
      word = helper(number % 1000) + aboveThousand[place] + " " + word;
    }
    number = Math.floor(number / 1000);
    place++;
  }

  return word.trim();
}

export const distanceConversion = (distanceMeter?: number) => {
  if (!distanceMeter) return `-`;

  if (distanceMeter > 100) {
    return (distanceMeter / 1000).toFixed(2) + " km";
  }

  return distanceMeter + " m";
};

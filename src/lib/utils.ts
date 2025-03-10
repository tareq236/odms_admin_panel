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
  if(!milliseconds) return 0
  const hours = milliseconds / (1000 * 60 * 60);
  const minutes = Number("." + hours.toString().split(".")[1]) * 60;
  const seconds = Number("." + minutes.toString().split(".")[1]) * 60;
  let time = hours.toFixed(0) !== "0" ? `${hours.toFixed(0)}h` : ``;
  time += minutes.toFixed(0) !== "0" ? ` ${minutes.toFixed(0)}m` : ``;
  time += ` ${seconds.toFixed(0)}s`;
  return time;
};

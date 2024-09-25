import { format } from "date-fns";

const NUMBER_FORMATTER = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

export const formatNumber = (number: number) => {
  return NUMBER_FORMATTER.format(number);
};

const DATE_FORMATTER = new Intl.DateTimeFormat("en-us", {
  dateStyle: "medium",
});

export const formatDate = (date: Date) => {
  if (date == null) return `-`;
  return DATE_FORMATTER.format(date);
};

export const formatDateTime = (date: Date) => {
  if (date == null) return `-`;
  return format(date, "MMM d, yyyy - h:mm aaa");
};

export const formateDateDB = (date: Date) => {
  if (date == null) return `-`;
  return format(date, "yyyy-MM-dd");
};

export const titleCase = (str: string) => {
  if (str == null) return;
  let word: any = str
    .toLowerCase()
    .split(" ")
    .map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    });

  return word.join(" ");
};

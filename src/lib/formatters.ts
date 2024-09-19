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
  return DATE_FORMATTER.format(date);
};


export const formatDateTime = (date:Date) => {
  return format(date, 'MMM d, yyyy - h:mm aaa')
}
import {
  format,
  formatDistanceToNowStrict,
  differenceInMonths,
} from "date-fns";
import { enGB } from "date-fns/locale";

const language = "en";

export function getFormattedAmount({
  currency = "BRL",
  value = 0,
  currencyDisplay = "symbol",
  minimumIntegerDigits = 2,
  signDisplay = "auto",
  ...settings
}) {
  try {
    const formattedAmount = new Intl.NumberFormat(language, {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
      ...settings,
    }).format(value);
    return formattedAmount;
  } catch (error) {
    console.log("error ... ", error);
    return `${value} ${currency}`;
  }
}

export function getFormattedFullDate(timestamp: string) {
  const result = format(new Date(timestamp), "hh:mm:ss, EEEE do MMMM yyyy");
  return result;
}

export function getTimeFromNow(timestamp: string) {
  const monthsDiff = differenceInMonths(new Date().toDateString(), timestamp);
  const result = formatDistanceToNowStrict(new Date(timestamp), {
    addSuffix: true,
    locale: enGB,
  });
  return `${monthsDiff > 0 ? "More than " : ""}${result}`;
}

export function getFormattedDate(timestamp: string) {
  const result = format(new Date(timestamp), "dd MMMM yyyy, hh:mm");
  return result;
}

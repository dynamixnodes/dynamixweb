import { createContext, useContext, useState, ReactNode } from "react";

export type CurrencyCode = "INR" | "USD" | "NPR" | "BDT" | "PKR" | "EUR";

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  convert: (inrAmount: number) => number;
  symbol: string;
  formatPrice: (inrAmount: number) => string;
}

const rates: Record<CurrencyCode, { rate: number; symbol: string }> = {
  INR: { rate: 1, symbol: "₹" },
  USD: { rate: 0.012, symbol: "$" },
  NPR: { rate: 1.6, symbol: "रू" },
  BDT: { rate: 1.31, symbol: "৳" },
  PKR: { rate: 3.34, symbol: "Rs" },
  EUR: { rate: 0.011, symbol: "€" },
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<CurrencyCode>("INR");

  const convert = (inrAmount: number) => {
    const converted = inrAmount * rates[currency].rate;
    return Math.round(converted * 100) / 100;
  };

  const symbol = rates[currency].symbol;

  const formatPrice = (inrAmount: number) => {
    const converted = convert(inrAmount);
    // For currencies with small values, show decimals
    if (currency === "USD" || currency === "EUR") {
      return `${symbol}${converted.toFixed(2)}`;
    }
    return `${symbol}${Math.round(converted)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert, symbol, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
};

import type { FiatCurrency } from "@/constants/apiTypes";

export type CryptoCompareTopItem = {
  CoinInfo?: {
    Id?: string;
    Name?: string;
    FullName?: string;
    ImageUrl?: string;
  };
  RAW?: {
    USD?: {
      PRICE?: number;
      CHANGEPCT24HOUR?: number;
      MKTCAP?: number;
    };
  };
};

export type CryptoCompareTopMktCapResponse = {
  Data?: CryptoCompareTopItem[];
};

export type CryptoCompareUsdFxResponse = Partial<Record<FiatCurrency, number>>;

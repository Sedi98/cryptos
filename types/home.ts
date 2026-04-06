import type { ColumnDef } from "@tanstack/react-table";
import type { CryptoCoin, FiatCurrency, FiatRates } from "@/constants/apiTypes";

export type DashboardTexts = {
  converterTitle: string;
  converterDescription: string;
  amountLabel: string;
  coinLabel: string;
  convertToLabel: string;
  convertedResultLabel: string;
  trendingTitle: string;
  trendingDescription: string;
  searchPlaceholder: string;
  loading: string;
  resultsSuffix: string;
  updatedLabel: string;
  tableCoin: string;
  tableSymbol: string;
  tablePriceUsd: string;
  table24h: string;
  tableMarketCap: string;
  tableNoResults: string;
};

export type HomePageDict = {
  siteName: string;
  nav: {
    converter: string;
    trending: string;
    about: string;
  };
  hero: {
    eyebrow?: string;
    title: string;
    description: string;
  };
  dashboard: DashboardTexts;
};

export type HomePageProps = {
  lang: string;
  dict: HomePageDict;
  initialCoins: CryptoCoin[];
  initialRates: FiatRates;
};

export type HeroSectionProps = {
  lang: string;
  title: string;
  description: string;
  trendingLabel: string;
  converterLabel: string;
};

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectComboboxProps = {
  inputId?: string;
  value: string;
  options: SelectOption[];
  placeholder: string;
  emptyText: string;
  className?: string;
  onChange: (value: string) => void;
};

export type CoinComboboxProps = {
  inputId?: string;
  value: string;
  coins: CryptoCoin[];
  placeholder: string;
  emptyText: string;
  className?: string;
  onChange: (value: string) => void;
};

export type ConverterSectionProps = {
  title: string;
  description: string;
  amountLabel: string;
  coinLabel: string;
  convertToLabel: string;
  convertedResultLabel: string;
  emptyText: string;
  amount: string;
  coinSymbol: string;
  currency: FiatCurrency;
  convertedValueText: string;
  oneCoinValueText: string;
  coins: CryptoCoin[];
  fiatOptions: SelectOption[];
  onAmountChange: (value: string) => void;
  onCoinChange: (value: string) => void;
  onCurrencyChange: (value: FiatCurrency) => void;
};

export type TrendingTableSectionProps = {
  title: string;
  description: string;
  searchPlaceholder: string;
  loadingText: string;
  resultCountText: string;
  updatedLabel: string;
  updatedValue: string | null;
  search: string;
  onSearchChange: (value: string) => void;
  columns: ColumnDef<CryptoCoin>[];
  data: CryptoCoin[];
  emptyMessage: string;
  isLoading: boolean;
};

export type CryptoDashboardSectionProps = {
  texts: DashboardTexts;
  initialCoins: CryptoCoin[];
  initialRates: FiatRates;
};

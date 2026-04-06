export type FiatCurrency = "USD" | "EUR" | "AZN" | "GBP" | "TRY";

export type CryptoCoin = {
  id: string;
  name: string;
  symbol: string;
  imageUrl: string;
  priceUsd: number;
  change24h: number;
  marketCap: number;
};

export type FiatRates = Record<FiatCurrency, number>;

export const FALLBACK_COINS: CryptoCoin[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    imageUrl: "https://www.cryptocompare.com/media/37746251/btc.png",
    priceUsd: 68420.71,
    change24h: 2.14,
    marketCap: 1347200000000,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    imageUrl: "https://www.cryptocompare.com/media/37746238/eth.png",
    priceUsd: 3522.86,
    change24h: 1.32,
    marketCap: 423900000000,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    imageUrl: "https://www.cryptocompare.com/media/41221626/sol.png",
    priceUsd: 168.19,
    change24h: 5.77,
    marketCap: 74400000000,
  },
  {
    id: "bnb",
    name: "BNB",
    symbol: "BNB",
    imageUrl: "https://www.cryptocompare.com/media/40485170/bnb.png",
    priceUsd: 596.21,
    change24h: -0.65,
    marketCap: 86800000000,
  },
  {
    id: "xrp",
    name: "XRP",
    symbol: "XRP",
    imageUrl: "https://www.cryptocompare.com/media/38553096/xrp.png",
    priceUsd: 0.612,
    change24h: 1.06,
    marketCap: 33600000000,
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    imageUrl: "https://www.cryptocompare.com/media/37746339/doge.png",
    priceUsd: 0.1582,
    change24h: 3.48,
    marketCap: 22800000000,
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    imageUrl: "https://www.cryptocompare.com/media/37746235/ada.png",
    priceUsd: 0.702,
    change24h: -1.19,
    marketCap: 25000000000,
  },
  {
    id: "toncoin",
    name: "Toncoin",
    symbol: "TON",
    imageUrl: "https://www.cryptocompare.com/media/44154328/ton.png",
    priceUsd: 6.21,
    change24h: 4.03,
    marketCap: 21400000000,
  },
];

export const DEFAULT_USD_TO_FIAT_RATE: FiatRates = {
  USD: 1,
  EUR: 0.92,
  AZN: 1.7,
  GBP: 0.78,
  TRY: 32.1,
};

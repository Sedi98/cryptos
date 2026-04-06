import { GetApi } from "@/lib/api";
import {
  CryptoCoin,
  FiatRates,
  FALLBACK_COINS,
  DEFAULT_USD_TO_FIAT_RATE,
} from "@/constants/apiTypes";
import {
  CryptoCompareTopMktCapResponse,
  CryptoCompareUsdFxResponse,
} from "@/types/api/CryptoCompare";

export const getTrendingCoins = async (limit = 30): Promise<CryptoCoin[]> => {
  try {
    const res = await GetApi<CryptoCompareTopMktCapResponse>("/data/top/mktcapfull", {
      limit,
      tsym: "USD",
    });

    const mapped =
      res.Data?.map((item) => {
        const symbol = item.CoinInfo?.Name ?? "";
        const raw = item.RAW?.USD;

        if (!symbol || !raw?.PRICE) {
          return null;
        }

        return {
          id: item.CoinInfo?.Id ?? symbol,
          name: item.CoinInfo?.FullName ?? symbol,
          symbol,
          imageUrl: item.CoinInfo?.ImageUrl
            ? `https://www.cryptocompare.com${item.CoinInfo.ImageUrl}`
            : "https://www.cryptocompare.com/media/37746251/btc.png",
          priceUsd: raw.PRICE,
          change24h: raw.CHANGEPCT24HOUR ?? 0,
          marketCap: raw.MKTCAP ?? 0,
        } satisfies CryptoCoin;
      }).filter((coin): coin is CryptoCoin => Boolean(coin)) ?? [];

    return mapped.length > 0 ? mapped : FALLBACK_COINS;
  } catch {
    return FALLBACK_COINS;
  }
};

export const getUsdToFiatRates = async (): Promise<FiatRates> => {
  try {
    const res = await GetApi<CryptoCompareUsdFxResponse>("/data/price", {
      fsym: "USD",
      tsyms: "USD,EUR,AZN,GBP,TRY",
    });

    return {
      USD: res.USD ?? 1,
      EUR: res.EUR ?? DEFAULT_USD_TO_FIAT_RATE.EUR,
      AZN: res.AZN ?? DEFAULT_USD_TO_FIAT_RATE.AZN,
      GBP: res.GBP ?? DEFAULT_USD_TO_FIAT_RATE.GBP,
      TRY: res.TRY ?? DEFAULT_USD_TO_FIAT_RATE.TRY,
    };
  } catch {
    return DEFAULT_USD_TO_FIAT_RATE;
  }
};

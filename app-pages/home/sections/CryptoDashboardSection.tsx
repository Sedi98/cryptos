"use client";

import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { createColumns } from "@/constants/columns";
import { FiatCurrency } from "@/constants/apiTypes";
import { getTrendingCoins, getUsdToFiatRates } from "@/lib/cryptoCompare";
import { ConverterSection } from "@/app-pages/home/sections/ConverterSection";
import { TrendingTableSection } from "@/app-pages/home/sections/TrendingTableSection";
import type { CryptoDashboardSectionProps } from "@/types/home";

const formatterByCurrency: Record<FiatCurrency, Intl.NumberFormat> = {
  USD: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }),
  EUR: new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }),
  AZN: new Intl.NumberFormat("az-AZ", {
    style: "currency",
    currency: "AZN",
    maximumFractionDigits: 2,
  }),
  GBP: new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
  }),
  TRY: new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  }),
};

export function CryptoDashboardSection({
  texts,
  initialCoins,
  initialRates,
}: CryptoDashboardSectionProps) {
  const [amount, setAmount] = useState("1");
  const [coinSymbol, setCoinSymbol] = useState(initialCoins[0]?.symbol ?? "");
  const [currency, setCurrency] = useState<FiatCurrency>("USD");
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const [coins, setCoins] = useState(initialCoins);
  const [rates, setRates] = useState(initialRates);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isRefreshingRef = useRef(false);
  const isMountedRef = useRef(true);

  const refreshData = useCallback(async () => {
    if (isRefreshingRef.current) {
      return;
    }

    isRefreshingRef.current = true;
    setIsLoading(true);

    try {
      const [topCoins, fxRates] = await Promise.all([
        getTrendingCoins(30),
        getUsdToFiatRates(),
      ]);

      if (!isMountedRef.current) return;

      setCoins(topCoins);
      setRates(fxRates);
      setLastUpdated(new Date());
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
      isRefreshingRef.current = false;
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    let debounceTimer: number | undefined;

    const scheduleRefresh = (delay = 400) => {
      if (debounceTimer !== undefined) {
        window.clearTimeout(debounceTimer);
      }

      debounceTimer = window.setTimeout(() => {
        refreshData();
      }, delay);
    };

    scheduleRefresh(0);

    const intervalTimer = window.setInterval(() => {
      scheduleRefresh(400);
    }, 30_000);

    const onFocus = () => scheduleRefresh(500);
    const onOnline = () => scheduleRefresh(500);

    window.addEventListener("focus", onFocus);
    window.addEventListener("online", onOnline);

    return () => {
      isMountedRef.current = false;
      if (debounceTimer !== undefined) {
        window.clearTimeout(debounceTimer);
      }
      window.clearInterval(intervalTimer);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("online", onOnline);
    };
  }, [refreshData]);

  const filteredCoins = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();
    if (!query) return coins;

    return coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query)
      );
    });
  }, [coins, deferredSearch]);

  const selectedCoin = useMemo(() => {
    return coins.find((coin) => coin.symbol === coinSymbol) ?? coins[0];
  }, [coinSymbol, coins]);
  const safeCoinSymbol = selectedCoin?.symbol ?? "";

  const fiatOptions = useMemo(() => {
    return (Object.keys(rates) as FiatCurrency[]).map((fiat) => ({
      value: fiat,
      label: fiat,
    }));
  }, [rates]);

  const columns = useMemo(
    () =>
      createColumns({
        coin: texts.tableCoin,
        symbol: texts.tableSymbol,
        priceUsd: texts.tablePriceUsd,
        h24: texts.table24h,
        marketCap: texts.tableMarketCap,
      }),
    [texts]
  );

  if (!selectedCoin) return null;

  const numericAmount = Number(amount) || 0;
  const convertedValue = numericAmount * selectedCoin.priceUsd * rates[currency];
  const oneCoinValue = selectedCoin.priceUsd * rates[currency];
  const updatedValue = lastUpdated
    ? `${String(lastUpdated.getDate()).padStart(2, "0")}.${String(
        lastUpdated.getMonth() + 1
      ).padStart(2, "0")}.${lastUpdated.getFullYear()} ${String(
        lastUpdated.getHours()
      ).padStart(2, "0")}:${String(lastUpdated.getMinutes()).padStart(2, "0")}`
    : null;

  return (
    <section
      id="converter"
      className="mt-10 flex flex-col gap-10"
      aria-label={`${texts.converterTitle} and ${texts.trendingTitle}`}
    >
      <ConverterSection
        title={texts.converterTitle}
        description={texts.converterDescription}
        amountLabel={texts.amountLabel}
        coinLabel={texts.coinLabel}
        convertToLabel={texts.convertToLabel}
        convertedResultLabel={texts.convertedResultLabel}
        emptyText={texts.tableNoResults}
        amount={amount}
        coinSymbol={safeCoinSymbol}
        currency={currency}
        convertedValueText={formatterByCurrency[currency].format(convertedValue)}
        oneCoinValueText={`1 ${selectedCoin.symbol} = ${formatterByCurrency[currency].format(
          oneCoinValue
        )}`}
        coins={coins}
        fiatOptions={fiatOptions}
        onAmountChange={setAmount}
        onCoinChange={setCoinSymbol}
        onCurrencyChange={setCurrency}
      />

      <TrendingTableSection
        title={texts.trendingTitle}
        description={texts.trendingDescription}
        searchPlaceholder={texts.searchPlaceholder}
        loadingText={texts.loading}
        resultCountText={`${filteredCoins.length} ${texts.resultsSuffix}`}
        updatedLabel={texts.updatedLabel}
        updatedValue={updatedValue}
        search={search}
        onSearchChange={setSearch}
        columns={columns}
        data={filteredCoins}
        emptyMessage={texts.tableNoResults}
        isLoading={isLoading}
      />
    </section>
  );
}

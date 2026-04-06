"use client";

import { memo } from "react";
import { CoinCombobox } from "@/app-pages/home/components/CoinCombobox";
import { SelectCombobox } from "@/app-pages/home/components/SelectCombobox";
import type { ConverterSectionProps } from "@/types/home";
import type { FiatCurrency } from "@/constants/apiTypes";

function ConverterSectionComponent({
  title,
  description,
  amountLabel,
  coinLabel,
  convertToLabel,
  convertedResultLabel,
  emptyText,
  amount,
  coinSymbol,
  currency,
  convertedValueText,
  oneCoinValueText,
  coins,
  fiatOptions,
  onAmountChange,
  onCoinChange,
  onCurrencyChange,
}: ConverterSectionProps) {
  const sectionTitleId = "converter-title";
  const amountInputId = "converter-amount";
  const coinInputId = "converter-coin";
  const currencyInputId = "converter-currency";
  const resultId = "converter-result";

  return (
    <section className="text-card-foreground" aria-labelledby={sectionTitleId}>
      <h2 id={sectionTitleId} className="text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      <p className="mt-2 text-base text-muted-foreground">{description}</p>

      <form className="mt-6 grid gap-4 md:grid-cols-3" role="search" aria-label={title}>
        <label htmlFor={amountInputId} className="grid gap-2">
          <span className="text-sm uppercase tracking-[0.14em] text-muted-foreground">
            {amountLabel}
          </span>
          <input
            id={amountInputId}
            type="number"
            min="0"
            step="any"
            value={amount}
            onChange={(event) => onAmountChange(event.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-3 text-base outline-none ring-ring/50 focus:ring-2"
          />
        </label>

        <label htmlFor={coinInputId} className="grid gap-2">
          <span className="text-sm uppercase tracking-[0.14em] text-muted-foreground">
            {coinLabel}
          </span>
          <CoinCombobox
            inputId={coinInputId}
            value={coinSymbol}
            coins={coins}
            placeholder={coinLabel}
            emptyText={emptyText}
            className="h-11 w-full rounded-xl border border-border bg-background"
            onChange={onCoinChange}
          />
        </label>

        <label htmlFor={currencyInputId} className="grid gap-2">
          <span className="text-sm uppercase tracking-[0.14em] text-muted-foreground">
            {convertToLabel}
          </span>
          <SelectCombobox
            inputId={currencyInputId}
            value={currency}
            options={fiatOptions}
            placeholder={convertToLabel}
            emptyText={emptyText}
            className="h-11 w-full rounded-xl border border-border bg-background"
            onChange={(nextValue) => onCurrencyChange(nextValue as FiatCurrency)}
          />
        </label>
      </form>

      <div className="mt-6 py-2" aria-live="polite" aria-atomic="true">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">
          {convertedResultLabel}
        </p>
        <output id={resultId} className="mt-2 block text-4xl font-semibold tracking-tight">
          {convertedValueText}
        </output>
        <p className="mt-1 text-base text-muted-foreground">{oneCoinValueText}</p>
      </div>
    </section>
  );
}

export const ConverterSection = memo(ConverterSectionComponent);

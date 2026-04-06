"use client";

import Image from "next/image";
import { useMemo } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import type { CoinComboboxProps } from "@/types/home";

export function CoinCombobox({
  inputId,
  value,
  coins,
  placeholder,
  emptyText,
  className,
  onChange,
}: CoinComboboxProps) {
  const symbols = useMemo(() => coins.map((coin) => coin.symbol), [coins]);

  const coinBySymbol = useMemo(() => {
    return new Map(coins.map((coin) => [coin.symbol, coin]));
  }, [coins]);

  return (
    <Combobox
      items={symbols}
      value={value}
      itemToStringValue={(symbol) => {
        const coin = coinBySymbol.get(symbol);
        return coin ? `${coin.name} (${coin.symbol})` : symbol;
      }}
      onValueChange={(nextValue) => {
        if (nextValue && coinBySymbol.has(nextValue)) {
          onChange(nextValue);
        }
      }}
    >
      <ComboboxInput id={inputId} placeholder={placeholder} className={className} />
      <ComboboxContent>
        <ComboboxEmpty>{emptyText}</ComboboxEmpty>
        <ComboboxList>
          {(symbol) => {
            const coin = coinBySymbol.get(symbol);
            if (!coin) return null;

            return (
              <ComboboxItem key={coin.id} value={coin.symbol}>
                <span className="flex items-center gap-2">
                  <Image
                    src={coin.imageUrl}
                    alt={`${coin.name} icon`}
                    width={18}
                    height={18}
                    sizes="18px"
                    loading="lazy"
                    decoding="async"
                    className="h-[18px] w-[18px] rounded-full"
                  />
                  <span>
                    {coin.name} ({coin.symbol})
                  </span>
                </span>
              </ComboboxItem>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

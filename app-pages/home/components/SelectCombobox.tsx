"use client";

import { useMemo } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import type { SelectComboboxProps } from "@/types/home";

export function SelectCombobox({
  inputId,
  value,
  options,
  placeholder,
  emptyText,
  className,
  onChange,
}: SelectComboboxProps) {
  const values = useMemo(() => options.map((option) => option.value), [options]);

  const labels = useMemo(() => {
    return new Map(options.map((option) => [option.value, option.label]));
  }, [options]);

  return (
    <Combobox
      items={values}
      value={value}
      itemToStringValue={(item) => labels.get(item) ?? item}
      onValueChange={(nextValue) => {
        if (nextValue) onChange(nextValue);
      }}
    >
      <ComboboxInput id={inputId} placeholder={placeholder} className={className} />
      <ComboboxContent>
        <ComboboxEmpty>{emptyText}</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {labels.get(item) ?? item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

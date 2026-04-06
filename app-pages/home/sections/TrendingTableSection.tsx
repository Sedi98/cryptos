"use client";

import { memo } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { DataTable } from "@/components/DataTable";
import type { TrendingTableSectionProps } from "@/types/home";

function TrendingTableSectionComponent({
  title,
  description,
  searchPlaceholder,
  loadingText,
  resultCountText,
  updatedLabel,
  updatedValue,
  search,
  onSearchChange,
  columns,
  data,
  emptyMessage,
  isLoading,
}: TrendingTableSectionProps) {
  const sectionTitleId = "trending-title";
  const searchInputId = "trending-search";

  return (
    <section id="trending" className="text-card-foreground" aria-labelledby={sectionTitleId}>
      <h2 id={sectionTitleId} className="text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      <p className="mt-2 text-base text-muted-foreground">{description}</p>

      <div className="mt-4">
        <div className="relative">
          <HugeiconsIcon
            icon={Search01Icon}
            strokeWidth={2}
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            id={searchInputId}
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="h-11 w-full rounded-xl border border-border bg-background pr-3 pl-10 text-base outline-none ring-ring/50 focus:ring-2"
          />
        </div>

        <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>{isLoading ? loadingText : resultCountText}</span>
          {updatedValue ? (
            <span>
              {updatedLabel}: {updatedValue}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-4 w-full overflow-x-hidden relative">
        <DataTable columns={columns} data={data} emptyMessage={emptyMessage} />
      </div>
    </section>
  );
}

export const TrendingTableSection = memo(TrendingTableSectionComponent);

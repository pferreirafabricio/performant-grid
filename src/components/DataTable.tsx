import React, { useState, useMemo, useCallback, useRef } from "react";
import { filterDataByName } from "../services/dataService";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { DataRecord } from "../types/DataRecord";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableRow } from "./DataTableRow";
import { DataTableFilter } from "./DataTableFilter";

interface DataTableProps {
  data: DataRecord[];
  height?: number;
  rowHeight?: number;
}

export type SortKey = "name" | "createdAt" | "email" | "location";
export type SortOrder = "asc" | "desc";

export const DataTable: React.FC<DataTableProps> = ({
  data,
  height = 600,
  rowHeight = 56,
}) => {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [nameFilter, setNameFilter] = useState("");
  const [debouncedNameFilter, setDebouncedNameFilter] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const handleSort = useCallback((key: SortKey) => {
    setSortKey(key);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  const filteredData = useMemo(() => {
    return filterDataByName(data, debouncedNameFilter);
  }, [data, debouncedNameFilter]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData].sort((a, b) => {
      if (sortKey === "createdAt") {
        const aDate = new Date(a.createdAt).getTime();
        const bDate = new Date(b.createdAt).getTime();
        if (aDate < bDate) return sortOrder === "asc" ? -1 : 1;
        if (aDate > bDate) return sortOrder === "asc" ? 1 : -1;
        return 0;
      } else {
        const aValue = a[sortKey] as string;
        const bValue = b[sortKey] as string;
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      }
    });
    return sorted;
  }, [filteredData, sortKey, sortOrder]);

  const rowVirtualizer = useVirtualizer({
    count: sortedData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 10,
  });

  // Debounce name filter input
  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameFilter(value);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setDebouncedNameFilter(value);
    }, 300);
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-10 bg-zinc-900 rounded-2xl shadow-2xl overflow-x-auto border border-zinc-800">
      <DataTableFilter value={nameFilter} onChange={handleNameFilterChange} />
      <table className="min-w-full border border-zinc-700 border-collapse text-base">
        <DataTableHeader
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </table>
      <div
        ref={parentRef}
        className="overflow-y-auto"
        style={{ height, maxHeight: height }}
      >
        <table className="min-w-full border border-zinc-700 border-collapse text-base">
          <tbody
            style={{
              position: "relative",
              height: rowVirtualizer.getTotalSize(),
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const record = sortedData[virtualRow.index];
              return (
                <DataTableRow
                  key={record.email}
                  record={record}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

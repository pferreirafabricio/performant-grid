import React, { useState, useMemo, useCallback, useRef } from "react";
import { filterDataByName } from "../services/dataService";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { DataRecord } from "../types/DataRecord";

interface DataTableProps {
  data: DataRecord[];
  height?: number;
  rowHeight?: number;
}

type SortKey = "name" | "createdAt" | "email" | "location";
type SortOrder = "asc" | "desc";

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
      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="name-filter" className="text-zinc-200 font-semibold">Filter by Name:</label>
        <input
          id="name-filter"
          type="text"
          value={nameFilter}
          onChange={handleNameFilterChange}
          className="px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a name..."
        />
      </div>
      <table className="min-w-full border-separate border-spacing-0 text-base">
        <thead>
          <tr className="bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-700 text-zinc-100 font-bold border-b-2 border-zinc-700">
            <th
              className="px-6 py-4 cursor-pointer text-left tracking-wide"
              style={{ width: 160 }}
              onClick={() => handleSort("name")}
            >
              Name{" "}
              {sortKey === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="px-6 py-4 text-center tracking-wide"
              style={{ width: 120 }}
            >
              Status
            </th>
            <th
              className="px-6 py-4 cursor-pointer text-right tracking-wide"
              style={{ width: 140 }}
              onClick={() => handleSort("createdAt")}
            >
              Created At{" "}
              {sortKey === "createdAt" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="px-6 py-4 cursor-pointer text-left tracking-wide"
              style={{ width: 220 }}
              onClick={() => handleSort("email")}
            >
              Email{" "}
              {sortKey === "email" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="px-6 py-4 cursor-pointer text-left tracking-wide"
              style={{ width: 220 }}
              onClick={() => handleSort("location")}
            >
              Location{" "}
              {sortKey === "location" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
          </tr>
        </thead>
      </table>
      <div
        ref={parentRef}
        className="overflow-y-auto"
        style={{ height, maxHeight: height }}
      >
        <table className="min-w-full border-separate border-spacing-0 text-base">
          <tbody
            style={{
              position: "relative",
              height: rowVirtualizer.getTotalSize(),
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const record = sortedData[virtualRow.index];
              return (
                <tr
                  key={record.email}
                  className="bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800 text-zinc-100 transition-colors hover:bg-zinc-700 border-b border-zinc-700"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <td
                    className="px-6 py-4 font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-lg"
                    style={{ maxWidth: 160 }}
                    title={record.name}
                  >
                    <span className="block truncate">{record.name}</span>
                  </td>
                  <td
                    className="px-6 py-4 text-center"
                    style={{ width: 120 }}
                  >
                    <span
                      className={
                        record.status === "active"
                          ? "bg-green-500/80 text-white rounded-full px-3 py-1 text-xs font-bold shadow"
                          : "bg-red-500/80 text-white rounded-full px-3 py-1 text-xs font-bold shadow"
                      }
                    >
                      {record.status}
                    </span>
                  </td>
                  <td
                    className="px-6 py-4 text-right whitespace-nowrap text-zinc-300"
                    style={{ width: 140 }}
                    title={new Date(record.createdAt).toLocaleDateString()}
                  >
                    <span className="block truncate">
                      {new Date(record.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td
                    className="px-6 py-4 text-left whitespace-nowrap overflow-hidden text-ellipsis text-zinc-200"
                    style={{ maxWidth: 220 }}
                    title={record.email}
                  >
                    <span className="block truncate">{record.email}</span>
                  </td>
                  <td
                    className="px-6 py-4 text-left whitespace-nowrap overflow-hidden text-ellipsis text-zinc-200"
                    style={{ maxWidth: 220 }}
                    title={record.location}
                  >
                    <span className="block truncate">{record.location}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

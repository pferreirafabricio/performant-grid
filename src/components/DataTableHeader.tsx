import React from "react";
import type { SortKey, SortOrder } from "./DataTable";

interface DataTableHeaderProps {
  sortKey: SortKey;
  sortOrder: SortOrder;
  onSort: (key: SortKey) => void;
}

export const DataTableHeader: React.FC<DataTableHeaderProps> = ({ sortKey, sortOrder, onSort }) => (
  <thead>
    <tr className="bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-700 text-zinc-100 font-bold border-b-2 border-zinc-700">
      <th
        className="px-6 py-4 cursor-pointer text-left tracking-wide"
        style={{ width: 160 }}
        onClick={() => onSort("name")}
      >
        Name {sortKey === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
      </th>
      <th className="px-6 py-4 text-center tracking-wide" style={{ width: 120 }}>
        Status
      </th>
      <th
        className="px-6 py-4 cursor-pointer text-right tracking-wide"
        style={{ width: 140 }}
        onClick={() => onSort("createdAt")}
      >
        Created At {sortKey === "createdAt" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
      </th>
      <th
        className="px-6 py-4 cursor-pointer text-left tracking-wide"
        style={{ width: 220 }}
        onClick={() => onSort("email")}
      >
        Email {sortKey === "email" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
      </th>
      <th
        className="px-6 py-4 cursor-pointer text-left tracking-wide"
        style={{ width: 220 }}
        onClick={() => onSort("location")}
      >
        Location {sortKey === "location" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
      </th>
    </tr>
  </thead>
);

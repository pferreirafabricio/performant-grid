import React from "react";
import type { DataRecord } from "../types/DataRecord";

interface DataTableRowProps {
  record: DataRecord;
  style?: React.CSSProperties;
}

export const DataTableRow: React.FC<DataTableRowProps> = ({ record, style }) => (
  <tr
    key={record.email}
    className="bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800 text-zinc-100 transition-colors hover:bg-zinc-700 border-b border-zinc-700"
    style={style}
  >
    <td
      className="px-6 py-4 font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-lg"
      title={record.name}
    >
      <span className="block truncate">{record.name}</span>
    </td>
    <td className="px-6 py-4 text-center">
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
      title={new Date(record.createdAt).toLocaleDateString()}
    >
      <span className="block truncate">
        {new Date(record.createdAt).toLocaleDateString()}
      </span>
    </td>
    <td
      className="px-6 py-4 text-left whitespace-nowrap overflow-hidden text-ellipsis text-zinc-200"
      title={record.email}
    >
      <span className="block truncate">{record.email}</span>
    </td>
    <td
      className="px-6 py-4 text-left whitespace-nowrap overflow-hidden text-ellipsis text-zinc-200"
      title={record.location}
    >
      <span className="block truncate">{record.location}</span>
    </td>
  </tr>
);

import React from "react";

interface DataTableFilterProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DataTableFilter: React.FC<DataTableFilterProps> = ({ value, onChange }) => (
  <div className="mb-4 flex items-center gap-4">
    <label htmlFor="name-filter" className="text-zinc-200 font-semibold">Filter by Name:</label>
    <input
      id="name-filter"
      type="text"
      value={value}
      onChange={onChange}
      className="px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Type a name..."
    />
  </div>
);

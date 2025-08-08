import { describe, it, expect } from "vitest";
import { filterData, filterDataByName } from "./dataService";
import type { DataRecord } from "../types/DataRecord";

const mockData: DataRecord[] = [
  {
    name: "Alice",
    status: "active",
    createdAt: "2023-01-01",
    email: "alice@example.com",
    location: "New York, USA",
  },
  {
    name: "Bob",
    status: "inactive",
    createdAt: "2023-02-01",
    email: "bob@example.com",
    location: "London, UK",
  },
  {
    name: "Carol",
    status: "active",
    createdAt: "2023-03-01",
    email: "carol@example.com",
    location: "Paris, France",
  },
  {
    name: "David",
    status: "active",
    createdAt: "2023-04-01",
    email: "david@example.com",
    location: "Berlin, Germany",
  },
  {
    name: "Eve",
    status: "inactive",
    createdAt: "2023-05-01",
    email: "eve@example.com",
    location: "Tokyo, Japan",
  },
  {
    name: "Frank",
    status: "active",
    createdAt: "2023-06-01",
    email: "frank@example.com",
    location: "Sydney, Australia",
  },
  {
    name: "Grace",
    status: "inactive",
    createdAt: "2023-07-01",
    email: "grace@example.com",
    location: "Toronto, Canada",
  },
  {
    name: "Heidi",
    status: "active",
    createdAt: "2023-08-01",
    email: "heidi@example.com",
    location: "Madrid, Spain",
  },
  {
    name: "Ivan",
    status: "inactive",
    createdAt: "2023-09-01",
    email: "ivan@example.com",
    location: "Rome, Italy",
  },
  {
    name: "Judy",
    status: "active",
    createdAt: "2023-10-01",
    email: "judy@example.com",
    location: "Amsterdam, Netherlands",
  },
];

describe("filterData", () => {
  it("returns all records if no filter is applied", () => {
    const result = filterData(mockData, "");
    expect(result).toHaveLength(10);
  });

  it("filters by status", () => {
    const result = filterData(mockData, "active");
    expect(result).toHaveLength(6);
    expect(result.every((r: DataRecord) => r.status === "active")).toBe(true);
  });

  it("returns empty array if no match", () => {
    const result = filterData(mockData, "archived");
    expect(result).toHaveLength(0);
  });

  it("filters by status with more inactive", () => {
    const result = filterData(mockData, "inactive");
    expect(result).toHaveLength(4);
    expect(result.every((r: DataRecord) => r.status === "inactive")).toBe(true);
  });
});

describe("filterDataByName", () => {
  it("returns all records if no name filter is applied", () => {
    const result = filterDataByName(mockData, "");
    expect(result).toHaveLength(10);
  });

  it("filters by exact name match", () => {
    const result = filterDataByName(mockData, "Alice");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Alice");
  });

  it("filters by partial name match (case insensitive)", () => {
    const result = filterDataByName(mockData, "al");
    expect(result.some(r => r.name === "Alice")).toBe(true);
    expect(result).toHaveLength(1);
  });

  it("returns empty array if no name matches", () => {
    const result = filterDataByName(mockData, "Zach");
    expect(result).toHaveLength(0);
  });

  it("filters multiple names with common substring", () => {
    const result = filterDataByName(mockData, "a");
    // Alice, Carol, David, Frank, Grace, Ivan, Judy
    expect(result.length).toBeGreaterThan(1);
    expect(result.every(r => r.name.toLowerCase().includes("a"))).toBe(true);
  });
});

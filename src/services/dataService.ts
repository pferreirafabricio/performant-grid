import type { DataRecord } from '../types/DataRecord';

function filterData(data: DataRecord[], status: string): DataRecord[] {
  if (!status) return data;
  return data.filter(record => record.status === status);
}

function filterDataByName(data: DataRecord[], name: string): DataRecord[] {
  if (!name) return data;
  const lower = name.toLowerCase();
  return data.filter(record => record.name.toLowerCase().includes(lower));
}

export { filterData, filterDataByName };

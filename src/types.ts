export type YearlyCO2Data = {
  co2: number;
  co2_per_capita: number;
  population: number;
  year: number;
};

export type RawData = {
  iso_code: string;
  data: YearlyCO2Data[];
};

export type TableData = {
  data: {
    name: string;
    iso_code: string;
    co2: number | string;
    co2_per_capita: number | string;
    population: number | string;
    year: number;
  };
  dataByYears: YearlyCO2Data[];
};

export type ResponseData = {
  table: TableData[];
  years: number[];
  columns: string[];
};

export type SortOrder = 'asc' | 'desc';
export type SortType = 'name' | 'population';

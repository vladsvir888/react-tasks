import { unknownValue } from './consts';
import type { RawData, TableData, YearlyCO2Data } from './types';

const cache = new Map();
const url = 'data.json';

export function fetchData() {
  async function getData() {
    try {
      const response = await fetch(url);
      const data = (await response.json()) as RawData;
      const entriesData = Object.entries(data) as unknown as [
        string,
        RawData,
      ][];
      let years: number[] | undefined;
      const preparedData: TableData[] = entriesData.map((item, index) => {
        const name = item[0];
        const { iso_code, data } = item[1];
        const latestYearData = data.at(-1) as YearlyCO2Data;

        if (index === 0) years = data.map((item) => item.year);

        return {
          data: {
            name,
            iso_code: iso_code ?? unknownValue,
            year: latestYearData.year,
            population: latestYearData.population ?? unknownValue,
            co2: latestYearData.co2 ?? unknownValue,
            co2_per_capita: latestYearData.co2_per_capita ?? unknownValue,
          },
          dataByYears: data,
        };
      });

      return {
        years,
        table: preparedData,
        columns: [
          'name',
          'iso_code',
          'year',
          'population',
          'co2',
          'co2_per_capita',
        ],
        additionalColumns: [
          'cement_co2',
          'co2_growth_abs',
          'co2_growth_prct',
          'coal_co2',
        ],
      };
    } catch (error) {
      console.log(error);
    }
  }

  if (!cache.has(url)) {
    cache.set(url, getData());
  }

  return cache.get(url);
}

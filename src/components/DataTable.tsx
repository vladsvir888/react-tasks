import { use, useState } from 'react';
import { fetchData } from '../api';
import type { ResponseData, SortOrder, SortType, TableData } from '../types';
import { sortOrder, sortType, unknownValue } from '../consts';

const DataTable = () => {
  const data = use(fetchData()) as ResponseData;

  console.log(data, 'data');

  const [year, setYear] = useState(() => data.table[0].data.year);
  const [name, setName] = useState('');

  const [selectedSort, setSelectedSort] = useState<SortType | ''>('');
  const [selectedSortOrder, setSelectedSortOrder] = useState<SortOrder>('asc');

  const filterByYear = (data: TableData[]): TableData[] => {
    return data
      .map(({ dataByYears, data }) => {
        const foundItem = dataByYears.find(
          (yearItem) => yearItem.year === year
        );

        if (!foundItem) return null;

        return {
          dataByYears,
          data: {
            ...data,
            year: foundItem.year,
            population: foundItem.population ?? unknownValue,
            co2: foundItem.co2 ?? unknownValue,
            co2_per_capita: foundItem.co2_per_capita ?? unknownValue,
          },
        };
      })
      .filter((item) => !!item);
  };

  const filterByCountryName = (data: TableData[]): TableData[] => {
    return data.filter((item) =>
      item.data.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  const sortByNameOrPopulation = (data: TableData[]) => {
    if (selectedSort === '') return data;

    return data.sort((a, b) => {
      const valueA = a.data[selectedSort];
      const valueB = b.data[selectedSort];

      if (selectedSort === 'name') {
        return selectedSortOrder === 'desc'
          ? (valueB as string).localeCompare(valueA as string)
          : (valueA as string).localeCompare(valueB as string);
      }

      // population
      const valueANum = +valueA || 0;
      const valueBNum = +valueB || 0;

      return selectedSortOrder === 'desc'
        ? valueBNum - valueANum
        : valueANum - valueBNum;
    });
  };

  let tableData = filterByYear(data.table);
  tableData = filterByCountryName(tableData);
  tableData = sortByNameOrPopulation(tableData);

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2.5">
        <select
          className="border border-gray-300 p-1"
          value={year}
          onChange={(e) => setYear(+e.target.value)}
        >
          <option value="" disabled>
            Select a year
          </option>
          {data.years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="border border-gray-300 py-1 px-2"
          placeholder="Search by name"
          value={name}
          onInput={(e) => setName((e.target as HTMLInputElement).value)}
        />
        <select
          className="border border-gray-300 p-1"
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value as SortType)}
        >
          <option value="" disabled>
            Sort type
          </option>
          {sortType.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          className="border border-gray-300 p-1"
          value={selectedSortOrder}
          onChange={(e) => setSelectedSortOrder(e.target.value as SortOrder)}
        >
          <option value="" disabled>
            Sort order
          </option>
          {sortOrder.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {data.columns.map((column) => (
                <th key={column} className="border border-gray-300 px-4 py-2">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.length ? (
              tableData.map((country, index) => (
                <tr key={index}>
                  {data.columns.map((column) => (
                    <td
                      key={column}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {country.data[column as keyof typeof country.data]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td>No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;

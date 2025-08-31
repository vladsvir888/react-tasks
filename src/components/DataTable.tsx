import { use, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchData } from '../api';
import type { ResponseData, SortOrder, SortType, TableData } from '../types';
import { sortOrder, sortType, unknownValue } from '../consts';
import Modal from './Modal';

const DataTable = () => {
  const data = use(fetchData()) as ResponseData;

  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const [columns, setColumns] = useState(() => data.columns);

  const [year, setYear] = useState(() => data.table[0].data.year);
  const [name, setName] = useState('');

  const [selectedSort, setSelectedSort] = useState<SortType | ''>('');
  const [selectedSortOrder, setSelectedSortOrder] = useState<SortOrder>('asc');

  const [highlightedCells, setHighlightedCells] = useState<
    Record<string, boolean>
  >({});
  const prevTableDataRef = useRef<TableData[]>([]);

  const filterByYear = useCallback(
    (data: TableData[]) => {
      return data
        .map(({ dataByYears, data }) => {
          const foundItem = dataByYears.find(
            (yearItem) => yearItem.year === year
          );

          if (!foundItem) return null;

          const updatedData = columns.reduce(
            (acc, current) => {
              if (current === 'name') acc['name'] = data.name;
              else if (current === 'iso_code') acc['iso_code'] = data.iso_code;
              else
                acc[current] =
                  foundItem[current as keyof typeof foundItem] ?? unknownValue;
              return acc;
            },
            {} as Record<string, string | number>
          );

          return {
            dataByYears,
            data: updatedData,
          };
        })
        .filter((item) => !!item) as TableData[];
    },
    [columns, year]
  );

  const filterByCountryName = useCallback(
    (data: TableData[]): TableData[] => {
      return data.filter((item) =>
        item.data.name.toLowerCase().includes(name.toLowerCase())
      );
    },
    [name]
  );

  const sortByNameOrPopulation = useCallback(
    (data: TableData[]) => {
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
    },
    [selectedSort, selectedSortOrder]
  );

  const handleAdditionalColumns = useCallback(
    (column: string) => {
      const foundColumn = columns.find((item) => item === column);

      if (!foundColumn) {
        setColumns([...columns, column]);
        return;
      }

      setColumns(columns.filter((item) => item !== column));
    },
    [columns]
  );

  const tableData = useMemo(() => {
    const filteredByYear = filterByYear(data.table);
    const filteredByCountryName = filterByCountryName(filteredByYear);
    const sortedByNameOrPopulation = sortByNameOrPopulation(
      filteredByCountryName
    );
    return sortedByNameOrPopulation;
  }, [data.table, filterByYear, filterByCountryName, sortByNameOrPopulation]);

  useEffect(() => {
    const prevTableData = prevTableDataRef.current;
    const newHighlightedCells: Record<string, boolean> = {};

    tableData.forEach((country) => {
      const prevCountry = prevTableData.find(
        (c) => c.data.name === country.data.name
      );

      columns.forEach((column) => {
        const cellKey = `${country.data.name}_${column}`;
        const prevValue =
          prevCountry?.data[column as keyof typeof prevCountry.data];
        const currValue = country.data[column as keyof typeof country.data];

        if (
          prevValue !== undefined &&
          currValue !== undefined &&
          prevValue !== currValue
        ) {
          newHighlightedCells[cellKey] = true;
        }
      });
    });

    if (Object.keys(newHighlightedCells).length) {
      setHighlightedCells(newHighlightedCells);
      setTimeout(() => setHighlightedCells({}), 500);
    }

    prevTableDataRef.current = tableData;
  }, [tableData, columns]);

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
          <option value="">Sort type</option>
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
        <button
          className="cursor-pointer underline"
          onClick={() => setIsVisibleModal(true)}
        >
          Add new columns
        </button>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <th key={column} className="border border-gray-300 px-4 py-2">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.length ? (
              tableData.map((country) => (
                <tr key={country.data.name}>
                  {columns.map((column) => {
                    const cellKey = `${country.data.name}_${column}`;
                    return (
                      <td
                        key={column}
                        className={`border border-gray-300 px-4 py-2 transition-colors duration-500 ${
                          highlightedCells[cellKey] ? 'bg-yellow-100' : ''
                        }`}
                      >
                        {country.data[column as keyof typeof country.data]}
                      </td>
                    );
                  })}
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
      <Modal
        title="Additional columns"
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        <div className="flex flex-col gap-2">
          {data.additionalColumns.map((column) => (
            <label key={column} className="flex items-center gap-x-1">
              <input
                type="checkbox"
                value={column}
                checked={!!columns.find((item) => item === column)}
                onChange={() => handleAdditionalColumns(column)}
              />
              {column}
            </label>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default DataTable;

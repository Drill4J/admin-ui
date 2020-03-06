import { useEffect, useState } from 'react';

export function useSorter<D extends {[key: string]: any}>(data: D[], fieldname: string, order: 'asc' | 'desc' | 'unsorted'): D[] {
  const [sortedData, setSortedData] = useState<D[]>(data);

  const byField = () =>
    (firstObject: D, secondObject: D) =>
      (firstObject[fieldname] > secondObject[fieldname] ? 1 : -1);

  useEffect(() => {
    setSortedData(data.sort(byField()));
  }, [data, fieldname]);

  useEffect(() => {
    const sortData = () => {
      switch (order) {
        case 'asc': return setSortedData(sortedData.sort(byField()));
        case 'desc': return setSortedData(sortedData.sort(byField()).reverse());
        case 'unsorted': return data;
        default: return data;
      }
    };
    sortData();
  }, [order]);

  return sortedData;
}

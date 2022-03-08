//import { readFile } from 'xlsx';

import { Herb } from './types';
import { read, utils, WorkBook } from 'xlsx';

export const makeDataList = async (file: Blob) => {
  return new Promise<Herb[]>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = () => {
      const fileData = reader.result;
      const wb = read(fileData, { type: 'binary' });

      const sheetName = wb.SheetNames[0];

      resolve(utils.sheet_to_json(wb.Sheets[sheetName]));
    };
  });
};

export const mock: Herb[] = [
  { id: 1, name: '맥문동', unitPrice: 1000 },
  { id: 2, name: '천문동', unitPrice: 3000 },
  { id: 3, name: '부자', unitPrice: 5000 },
  { id: 4, name: '황기', unitPrice: 6000 },
];

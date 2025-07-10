import Papa from 'papaparse';
import { Word } from '../types';

export function generateWordId(l1: string, l2: string): string {
  return `${l1.toLowerCase().trim()}-${l2.toLowerCase().trim()}`;
}

function processResults(results: Papa.ParseResult<any>): Word[] {
  const words: Word[] = [];
  const seenIds = new Set<string>();
  
  if (!results.data || results.data.length === 0) {
    throw new Error('No data found in CSV');
  }

  // Get column names (first two columns)
  const columns = Object.keys(results.data[0] as any);
  if (columns.length < 2) {
    throw new Error('CSV must have at least 2 columns');
  }

  const [col1, col2] = columns;

  results.data.forEach((row: any, index: number) => {
    const l1 = row[col1];
    const l2 = row[col2];

    if (!l1 || !l2) {
      console.warn(`Skipping row ${index + 1}: missing data`);
      return;
    }

    const id = generateWordId(l1, l2);
    
    // Skip duplicates
    if (seenIds.has(id)) {
      console.warn(`Skipping duplicate: ${l1} - ${l2}`);
      return;
    }

    seenIds.add(id);
    words.push({
      id,
      l1: l1.toString(),
      l2: l2.toString(),
      learned: false,
    });
  });

  if (words.length === 0) {
    throw new Error('No valid word pairs found');
  }

  if (words.length > 5000) {
    throw new Error('Too many words (max 5000)');
  }

  return words;
}

export function parseCsvFile(file: File): Promise<Word[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      transform: (value) => value.trim(),
      complete: (results) => {
        try {
          const words = processResults(results);
          resolve(words);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(new Error(`CSV parsing error: ${error.message}`));
      }
    });
  });
}

export function parseCsvText(csvText: string): Promise<Word[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      transform: (value) => value.trim(),
      complete: (results) => {
        try {
          const words = processResults(results);
          resolve(words);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(new Error(`CSV parsing error: ${error.message}`));
      }
    });
  });
}
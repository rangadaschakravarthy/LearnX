/**
 * LearnX JavaScript Runtime - Safe Value Serializer
 * Provides fault-tolerant formatting for all JavaScript data types,
 * circular structures, BigInt, Symbols, Functions, Errors, and DOM-like values.
 */

export interface SerializedValue {
  type: string;
  preview: string;
  details?: any;
}

const MAX_DEPTH = 4;
const MAX_PROPERTIES = 50;
const MAX_STRING_LENGTH = 10000;

export function safeSerialize(val: any, depth = 0, seen = new WeakSet()): string {
  // Primitives and immediate checks
  if (val === null) return 'null';
  if (val === undefined) return 'undefined';

  const type = typeof val;

  if (type === 'string') {
    if (depth === 0) {
      // Top-level strings in console.log are printed raw
      return val.length > MAX_STRING_LENGTH ? val.slice(0, MAX_STRING_LENGTH) + '… [truncated]' : val;
    }
    // Inside objects/arrays, format as quoted string
    const truncated = val.length > 500 ? val.slice(0, 500) + '…' : val;
    return JSON.stringify(truncated);
  }

  if (type === 'number') {
    if (Object.is(val, -0)) return '-0';
    return String(val); // Handles NaN, Infinity, -Infinity, 42
  }

  if (type === 'boolean') {
    return String(val);
  }

  if (type === 'bigint') {
    return `${val.toString()}n`;
  }

  if (type === 'symbol') {
    return val.toString();
  }

  if (type === 'function') {
    const fnName = val.name ? ` ${val.name}` : ' (anonymous)';
    return `[Function${fnName}]`;
  }

  if (val instanceof Error) {
    if (val.stack) {
      return val.stack;
    }
    return `${val.name}: ${val.message}`;
  }

  if (val instanceof Date) {
    return isNaN(val.getTime()) ? 'Invalid Date' : val.toISOString();
  }

  if (val instanceof RegExp) {
    return val.toString();
  }

  // Handle objects and arrays
  if (type === 'object') {
    // Check circular reference
    if (seen.has(val)) {
      return '[Circular]';
    }

    if (depth >= MAX_DEPTH) {
      return Array.isArray(val) ? '[Array]' : '[Object]';
    }

    try {
      seen.add(val);
    } catch {
      // In case val cannot be stored in WeakSet
    }

    // Map
    if (val instanceof Map) {
      const entries: string[] = [];
      let count = 0;
      for (const [k, v] of val.entries()) {
        if (count++ >= MAX_PROPERTIES) {
          entries.push(`... ${val.size - MAX_PROPERTIES} more items`);
          break;
        }
        entries.push(`${safeSerialize(k, depth + 1, seen)} => ${safeSerialize(v, depth + 1, seen)}`);
      }
      return `Map(${val.size}) { ${entries.join(', ')} }`;
    }

    // Set
    if (val instanceof Set) {
      const items: string[] = [];
      let count = 0;
      for (const item of val.values()) {
        if (count++ >= MAX_PROPERTIES) {
          items.push(`... ${val.size - MAX_PROPERTIES} more items`);
          break;
        }
        items.push(safeSerialize(item, depth + 1, seen));
      }
      return `Set(${val.size}) { ${items.join(', ')} }`;
    }

    // Array
    if (Array.isArray(val)) {
      const items: string[] = [];
      const len = val.length;
      const limit = Math.min(len, MAX_PROPERTIES);

      for (let i = 0; i < limit; i++) {
        items.push(safeSerialize(val[i], depth + 1, seen));
      }

      if (len > MAX_PROPERTIES) {
        items.push(`... ${len - MAX_PROPERTIES} more items`);
      }

      return `[${items.join(', ')}]`;
    }

    // Plain or generic Object
    try {
      const keys = Object.keys(val);
      const items: string[] = [];
      const limit = Math.min(keys.length, MAX_PROPERTIES);

      for (let i = 0; i < limit; i++) {
        const k = keys[i];
        let serializedVal = '';
        try {
          serializedVal = safeSerialize(val[k], depth + 1, seen);
        } catch {
          serializedVal = '[Unserializable]';
        }
        items.push(`${k}: ${serializedVal}`);
      }

      if (keys.length > MAX_PROPERTIES) {
        items.push(`... ${keys.length - MAX_PROPERTIES} more keys`);
      }

      return items.length === 0 ? '{}' : `{ ${items.join(', ')} }`;
    } catch {
      return '[Object]';
    }
  }

  try {
    return String(val);
  } catch {
    return '[Unknown Value]';
  }
}

/**
 * Format arguments into a single log string according to console.log formatting conventions.
 */
export function formatConsoleArgs(args: any[]): string {
  if (args.length === 0) return '';
  return args.map(arg => safeSerialize(arg, 0, new WeakSet())).join(' ');
}

/**
 * Format table data for console.table
 */
export function formatTableOutput(data: any): string {
  if (data === null || data === undefined || typeof data !== 'object') {
    return safeSerialize(data);
  }

  try {
    // Array of objects (most common console.table use case)
    if (Array.isArray(data)) {
      if (data.length === 0) return '[]';
      if (typeof data[0] === 'object' && data[0] !== null) {
        const allKeys = Array.from(new Set(data.flatMap(item => (item && typeof item === 'object') ? Object.keys(item) : [])));
        const rows = data.map((item, idx) => {
          const rowObj: Record<string, any> = { '(index)': idx };
          allKeys.forEach(k => {
            rowObj[k] = (item && typeof item === 'object') ? item[k] : item;
          });
          return rowObj;
        });
        return JSON.stringify(rows, (_, val) => (typeof val === 'bigint' ? val.toString() + 'n' : val), 2);
      }
      return JSON.stringify(data, (_, val) => (typeof val === 'bigint' ? val.toString() + 'n' : val), 2);
    }

    // Plain object
    return JSON.stringify(data, (_, val) => (typeof val === 'bigint' ? val.toString() + 'n' : val), 2);
  } catch {
    return safeSerialize(data);
  }
}

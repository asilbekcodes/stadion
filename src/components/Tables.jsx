import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import React from 'react';
import '../css/index.css';

const Tables = ({ columns, rows }) => {
  return (
    <TableContainer
      component={Paper}
      className="w-full bg-white dark:bg-gray-900"
    >
      {/* Jadval katta ekranlarda ko'rinadi */}
      <Table
        sx={{
          display: { xs: 'none', sm: 'table' },
          '& td, & th': { padding: '16px', fontSize: '0.875rem' },
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className="dark:hover:bg-gray-800 hover:bg-gray-100"
            >
              {columns.map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  className="text-gray-600 dark:text-gray-400"
                >
                  {row[column]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Kichik ekranlarda kartochkalar ko'rinadi */}
      <div className="sm:hidden space-y-4">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow-md"
          >
            {columns.map((column, colIndex) => (
              <div
                key={colIndex}
                className="flex justify-between text-sm py-1 border-b border-gray-200 dark:border-gray-700"
              >
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {column}:
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {row[column]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </TableContainer>
  );
};

export default Tables;

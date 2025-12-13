"use client";

import SearchIcon from '@mui/icons-material/Search';
import React, { FC, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@mui/material/Button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

interface TableHeader {
  key: string;      // Object property name (lowercase)
  label: string;    // Display name (capitalized)
}

interface Props<T extends Record<string, any>> {
  headers: TableHeader[];
  data: T[];
  description?: string;
  isLoading: boolean;
  isError: boolean;
  idField?: keyof T; // Allow customizing which field to use as ID
  searchField?: keyof T; // Allow customizing which field to search in
  onRowClick?: (item: T) => void;
  onDeleteClick?: (item: T) => void;
  onEditClick?: (item: T) => void;
  basePath?: string; // Base path for navigation when clicking a row
}

export const DataTable = <T extends Record<string, any>,>({
  headers,
  data,
  description = "items",
  isLoading,
  isError,
  idField = "id" as keyof T,
  searchField,
  onRowClick,
  onDeleteClick,
  onEditClick,
  basePath
}: Props<T>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  // Determine which field to search in (default to first header if not specified)
  const fieldToSearch = searchField || headers[0] as keyof T;

  const filteredData = data.filter((item) => {
    // Handle possible undefined or null values
    const fieldValue = item[fieldToSearch];
    if (fieldValue === undefined || fieldValue === null) return false;

    return String(fieldValue).toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Calculate pagination
  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / parseInt(pageSize)));

  // Get current page of data
  const indexOfLastItem = currentPage * parseInt(pageSize);
  const indexOfFirstItem = indexOfLastItem - parseInt(pageSize);
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (value: string) => {
    setPageSize(value);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  // Handle row click
  const handleRowClick = (item: T) => {
    if (onRowClick) {
      onRowClick(item);
    } else if (basePath) {
      // Ensure the ID exists before navigating
      const id = item[idField];
      if (id !== undefined) {
        router.push(`${basePath}/${id}`);
      }
    }
  };

  const handleDeleteClick = (item: T) => {
    if (onDeleteClick) {
      console.log('Deleting item', item)
      onDeleteClick(item);
    }
  }

  const handleEditClick = (item: T) => {
    if (onEditClick) {
      console.log('Start Editing item', item)
      onEditClick(item);
    }
  }

  return (
    <Card variant="outlined">
      <Stack sx={{ p: 4, pl: 2, pb: 0 }}>
        <OutlinedInput
          size='small'
          placeholder="Search cars..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          sx={{
            borderColor: 'grey.100',
            maxWidth: { xs: '100%', sm: 400 },
            backgroundColor: 'grey.700'
          }}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Stack>
      <CardContent>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell key={header.key} align='left'>
                    {header.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={item.id || index}
                  sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                >
                  {headers.map((header) => (
                    <TableCell key={header.key} align='left'>
                      {item[header.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={headers.length} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

        </TableContainer>
      </CardContent>

      {/* <CardContent>
        {isError ? (<ErrorState />) : isLoading ? (
          <LoadingRows />
        ) : currentData.length > 0 ? (
          <DataTableContent
            data={currentData}
            headers={headers}
            handleRowClick={handleRowClick}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
          />
        ) : (
          <EmptyState />
        )}
      </CardContent> */}

      {/* {filteredData.length > 0 && (
        <TableFooter
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          totalItems={totalItems}
          pageSize={pageSize}
          handlePageSizeChange={handlePageSizeChange}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )} */}
    </Card>
  );
};

// Component for displaying table content
const DataTableContent = <T extends Record<string, any>,>({
  data,
  headers,
  handleRowClick,
  handleDeleteClick,
  handleEditClick
}: {
  data: T[];
  headers: string[];
  handleRowClick: (item: T) => void;
  handleDeleteClick: (item: T) => void;
  handleEditClick: (item: T) => void;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent cursor-default">
          {headers.map((header, index) => (
            <TableHead
              key={index}
              className={index > 0 ? "md:table-cell" : ""}
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, rowIndex) => (
          <TableRow
            key={`row-${rowIndex}-${String(item.id || rowIndex)}`}
            className="cursor-pointer"
            onClick={() => handleRowClick(item)}
          >
            {headers.map((header, cellIndex) => {
              // Direct access to the property using the header as the key
              //Need to transform header to camel case if has spaces in it
              const headerToCamelCase = toCamelCase(header)
              const value = item[headerToCamelCase];

              // Check if the current header might be a URL field
              const isUrlField = header.toLowerCase().includes('url') ||
                header.toLowerCase().includes('website') ||
                header.toLowerCase() === 'link';

              return (
                <TableCell
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className={cellIndex > 0 ? "font-medium" : "md:table-cell"}
                >
                  {isUrlField && value ? (
                    <a
                      href={typeof value === 'string' ? (value.startsWith("http") ? value : `https://${value}`) : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click when clicking the link
                      }}
                    >
                      {value}
                    </a>
                  ) : (
                    value || "-"
                  )}
                </TableCell>
              );
            })}
            <TableCell className="w-10 margin-right-5">
              <div className="flex justify-end space-x-2">
                {/* Edit Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(item);
                  }}
                  className="cursor-pointer p-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-primary/50 transition-colors"
                  title="Edit Row"
                >
                  <EditNoteIcon className="h-5 w-5" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(item);
                  }}
                  className="cursor-pointer p-1 rounded-full text-red-600 hover:bg-red-200 dark:text-red-400 dark:hover:bg-destructive/60 transition-colors"
                  title="Delete Row"
                >
                  <DeleteForeverIcon className="h-5 w-5" />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

// Loading state component
const LoadingRows: FC = () => {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center w-full mb-4">
          <Skeleton className="h-12 w-full bg-gray-300 dark:bg-gray-300" />
        </div>
      ))}
    </div>
  );
};

// Empty state component
const EmptyState: FC = () => {
  return (
    <div className="text-center py-10">
      <p className="text-muted-foreground mb-4">No data found</p>
    </div>
  );
};

const ErrorState: FC = () => {
  return (
    <div className="text-center py-10">
      <p className="text-muted-foreground mb-4">Error while retrieving data...</p>
    </div>
  );
}

// Table footer with pagination
const TableFooter: FC<{
  indexOfFirstItem: number;
  indexOfLastItem: number;
  totalItems: number;
  pageSize: string;
  handlePageSizeChange: (value: string) => void;
  handlePageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}> = ({
  indexOfFirstItem,
  indexOfLastItem,
  totalItems,
  pageSize,
  handlePageSizeChange,
  handlePageChange,
  currentPage,
  totalPages,
}) => {
    return (
      <CardFooter className="flex items-center justify-between pt-0">
        <div className="text-sm text-muted-foreground">
          {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of {totalItems}
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Select
              value={pageSize}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent side="top">
                {["10", "15", "20", "50"].map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">
              {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    );
  };

const toCamelCase = (str: string): string => {
  const firstCharLower = str.charAt(0).toLowerCase();
  const restOfString = str.slice(1);

  return (firstCharLower + restOfString).replace(' ', '')
}
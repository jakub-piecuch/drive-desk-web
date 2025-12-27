"use client";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { MoreHorizontalIcon } from 'lucide-react';
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
  const fieldToSearch = searchField || headers[0].key as keyof T;

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleDelete = (item: any) => {
    handleDeleteClick(item);
    handleMenuClose();
  };

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
          placeholder="Search..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'grey.500' }} />
            </InputAdornment>
          }
          sx={{
            maxWidth: { xs: '100%', sm: 400 },
            backgroundColor: 'grey.700'
          }}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Stack>
      <CardContent>
        {isError ? (
          <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', my: 4 }}>
            Error loading data. Please try again later.
          </Alert>
        ) : (
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableCell key={header.key} align='left'>
                      {header.label}
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  // Loading state - show skeleton rows
                  [...Array(parseInt(pageSize))].map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      {headers.map((header) => (
                        <TableCell key={header.key}>
                          <Skeleton variant="text" width="80%" height={20} />
                        </TableCell>
                      ))}
                      <TableCell>
                        <Skeleton variant="circular" width={40} height={40} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : currentData.length === 0 ? (
                  // Empty state
                  <TableRow>
                    <TableCell colSpan={headers.length + 1} align="center">
                      <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                        No data available
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  currentData.map((item, index) => (
                    <TableRow
                      key={item.id || index}
                      sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                    >
                      {headers.map((header) => (
                        <TableCell key={header.key} align='left'>
                          {item[header.key]}
                        </TableCell>
                      ))}
                      <TableCell align='right'>
                        <IconButton
                          onClick={handleMenuOpen}
                          title="Additional Row Actions"
                          sx={{ color: "grey.400" }}
                        >
                          <MoreHorizontalIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleMenuClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        >
                          <MenuItem onClick={() => handleEditClick(item)}>
                            <ListItemIcon>
                              <EditIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Edit</ListItemText>
                          </MenuItem>

                          <MenuItem onClick={() => handleDelete(item)}>
                            <ListItemIcon>
                              <DeleteForeverIcon fontSize="small" color="error" />
                            </ListItemIcon>
                            <ListItemText>Delete</ListItemText>
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {!isLoading && !isError && filteredData.length > 0 && (
          <Stack
            direction="row"
            sx={{
              pt: 2,
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of {totalItems}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Rows per page:
                </Typography>
                <Select
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(e.target.value)}
                  size="small"
                  sx={{ minWidth: 70 }}
                >
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                  <MenuItem value="15">15</MenuItem>
                  <MenuItem value="20">20</MenuItem>
                  <MenuItem value="50">50</MenuItem>
                </Select>
              </Stack>
            </Stack>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, page) => handlePageChange(page)}
              shape="rounded"
            />
          </Stack>
        )}
      </CardContent>

    </Card>
  );
};
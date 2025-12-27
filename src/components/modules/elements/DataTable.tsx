import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { MoreHorizontalIcon } from 'lucide-react';
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface TableHeader {
  key: string;
  label: string;
}

interface Props<T extends Record<string, any>> {
  headers: TableHeader[];
  data: T[];
  description?: string;
  isLoading: boolean;
  isError: boolean;
  idField?: keyof T;
  searchField?: keyof T;
  onRowClick?: (item: T) => void;
  onDeleteClick?: (item: T) => void;
  onEditClick?: (item: T) => void;
  basePath?: string;
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

  // Store both anchor element AND the selected item
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const open = Boolean(anchorEl);

  const fieldToSearch = searchField || headers[0].key as keyof T;

  const filteredData = data.filter((item) => {
    const fieldValue = item[fieldToSearch];
    if (fieldValue === undefined || fieldValue === null) return false;
    return String(fieldValue).toLowerCase().includes(searchQuery.toLowerCase());
  });

  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / parseInt(pageSize)));

  const indexOfLastItem = currentPage * parseInt(pageSize);
  const indexOfFirstItem = indexOfLastItem - parseInt(pageSize);
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Update to store the item when opening menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, item: T) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleDelete = () => {
    if (selectedItem && onDeleteClick) {
      console.log('Deleting item', selectedItem);
      onDeleteClick(selectedItem);
    }
    handleMenuClose();
  };

  const handleEdit = () => {
    if (selectedItem && onEditClick) {
      console.log('Start Editing item', selectedItem);
      onEditClick(selectedItem);
    }
    handleMenuClose();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const handleRowClick = (item: T) => {
    if (onRowClick) {
      onRowClick(item);
    } else if (basePath) {
      const id = item[idField];
      if (id !== undefined) {
        router.push(`${basePath}/${id}`);
      }
    }
  };

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
                          onClick={(e) => handleMenuOpen(e, item)}
                          title="Additional Row Actions"
                          sx={{ color: "grey.400" }}
                        >
                          <MoreHorizontalIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Move Menu outside the map - render only once */}
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
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteForeverIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>

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

              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => handlePageChange(page)}
                color="primary"
                size="small"
                shape="rounded"
              />
            </Stack>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};
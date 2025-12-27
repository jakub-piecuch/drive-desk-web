'use client';

import { DataTable } from "@/components/elements/DataTable";
import { PageHeader } from "@/components/elements/PageHeader";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useCarsTableData, useDeleteCarById } from "./car.hooks";
import { Car } from "./car.types";
import { CreateCarModal } from "./modules/CreateCarModal";
import { UpdateCarModal } from "./modules/UpdateCarModal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ConfirmDialog } from "@/components/elements/ConfirmDialog";

export default function Cars() {
  const deleteCarMutation = useDeleteCarById();
  const cars = useCarsTableData();

  const [isCreateCarModalOpen, setIsCreateCarModalOpen] = useState(false);
  const [isUpdateCarModalOpen, setIsUpdateCarModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);
  
  const [currentItem, setCurrentItem] = useState<Car>({
    id: '',
    make: '',
    model: '',
    registrationNumber: ''
  });

  const handleRowClick = (item: any) => {
    // empty for now
  };

  const handleEditClick = (item: Car) => {
    console.log("jestem tu!! edit")
    setCurrentItem(item)
    setIsUpdateCarModalOpen(true);
  }

  const handleDeleteClick = (item: Car) => {
    setCarToDelete(item);
    setIsDeleteDialogOpen(true);
  }

  const handleConfirmDelete = () => {
    if (carToDelete?.id) {
      deleteCarMutation.mutate(carToDelete.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setCarToDelete(null);
        }
      });
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setCarToDelete(null);
  }

  const handleCreateCarClick = () => {
    setIsCreateCarModalOpen(true);
  }

  return (
    <>
      <Box sx={{ p: { xs: 3, sm: 3 } }}>
        <PageHeader
          title="Cars"
          actions={
            <>
              <Button
                variant="outlined"
              >
                <FileDownloadIcon className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                variant="contained"
                onClick={handleCreateCarClick}
              >
                <AddIcon className="mr-2 h-4 w-4" />
                Add Car
              </Button>
            </>
          }
        />

        <Box sx={{ mt: 8 }}>
          <DataTable
            headers={cars.headers}
            data={cars.data}
            description="cars"
            isLoading={cars.isLoading}
            isError={cars.isError}
            idField="id"
            searchField="make"
            onRowClick={handleRowClick}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
          />
        </Box>
      </Box>

      <CreateCarModal
        isOpen={isCreateCarModalOpen}
        onOpenChange={setIsCreateCarModalOpen}
      />

      <UpdateCarModal
        id={currentItem.id!}
        make={currentItem.make}
        model={currentItem.model}
        registrationNumber={currentItem.registrationNumber}
        isOpen={isUpdateCarModalOpen}
        onOpenChange={setIsUpdateCarModalOpen}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Car"
        description={`Are you sure you want to delete ${carToDelete?.make} ${carToDelete?.model}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteCarMutation.isPending}
        severity="error"
      />
    </>
  )
}
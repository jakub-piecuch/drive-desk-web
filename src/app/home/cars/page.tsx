'use client';

import { Section } from "@/components/layout/Section";
import { DataTable } from "@/components/modules/elements/DataTable";
import { PageHeader } from "@/components/modules/elements/PageHeader";
import { Download, Plus } from "lucide-react";
import { useState } from "react";
import { useCarsTableData, useDeleteCarById } from "./car.hooks";
import { Car } from "./car.types";
import { CreateCarModal } from "./modules/CreateCarModal";
import { UpdateCarModal } from "./modules/UpdateCarModal";
import Button from "@mui/material/Button";
import { ConfirmDialog } from "@/components/modules/elements/ConfirmDialog";

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
      <div className="p-6 sm:p-6 space-y-6">
        <PageHeader
          title="Cars"
          actions={
            <>
              <Button
                variant="outlined"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                variant="contained"
                onClick={handleCreateCarClick}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Car
              </Button>
            </>
          }
        />

        <Section className="py-6 animate-fade-in" containerSize="full">
          <div className="mt-6 animate-slide-down">
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
          </div>
        </Section>
      </div>

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
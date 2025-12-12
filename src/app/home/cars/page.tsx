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

export default function Cars() {
  const deleteCarMutation = useDeleteCarById();
  const cars = useCarsTableData();

  const [isCreateCarModalOpen, setIsCreateCarModalOpen] = useState(false);
  const [isUpdateCarModalOpen, setIsUpdateCarModalOpen] = useState(false);
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
    setCurrentItem(item)
    setIsUpdateCarModalOpen(true);
  }

  const handleDeleteClick = (item: Car) => {
    if (confirm("Are you sure you want to delete this car?")) {
      deleteCarMutation.mutate(item.id!);
    }
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
                variant="contained"
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
              onDeleteClick={handleDeleteClick} // Use our custom row click handler
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
    </>
  )
}

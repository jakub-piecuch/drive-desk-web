'use client';

import { DataTable } from "@/components/DataTable";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Layout } from "@/modules/layout/Layout";
import { Download, Plus } from "lucide-react";
import { useState } from "react";
import { useCarsTableData, useDeleteCarById } from "./car.hooks";
import { CreateCarModal } from "./modules/CreateCarModal";
import { UpdateCarModal } from "./modules/UpdateCarModal";
import { Car } from "./car.types";

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
    <Layout>
      <div className="p-6 sm:p-6 space-y-6">
        <PageHeader
          title="Cars"
          actions={
            <>
              <Button
                size="sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                size="sm"
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
              searchField="registrationNumber"
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
    </Layout>
  )
}

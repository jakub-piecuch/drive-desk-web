'use client';

import { DataTable } from "@/components/DataTable";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Layout } from "@/modules/layout/Layout";
import { Download, Plus } from "lucide-react";
import { useState } from "react";
import { useCarTableData as useCarsTableData, useDeleteCarById } from "./car.hooks";
import { CreateCarModal } from "./modules/CreateCarModal";

export default function Cars() {
  const deleteCarMutation = useDeleteCarById();
  const cars = useCarsTableData();

  const [isCreateCarModalOpen, setIsCreateCarModalOpen] = useState(false);
  const [isUpdateCarModalOpen, setIsUpdateCarModalOpen] = useState(false);

  const handleRowClick = (item: any) => {
    // empty for now
  };

  const handleEditClick = (item: any) => {
    setIsUpdateCarModalOpen(true);
  }

  const handleDeleteClick = (item: any) => {
    if (confirm("Are you sure you want to delete this car?")) {
      deleteCarMutation.mutate(item.ID);
    }
  }

  const handleCreateCarClick = (item: any) => {
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
              idField="ID"
              searchField="RegistrationNumber"
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
    </Layout>
  )
}

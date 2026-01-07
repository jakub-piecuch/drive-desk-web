'use client';

import { ConfirmDialog } from "@/components/elements/ConfirmDialog";
import { DataTable } from "@/components/elements/DataTable";
import { PageHeader } from "@/components/elements/PageHeader";
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useTraineesTableData, useDeleteTraineeById } from "./trainee.hooks";
import { Trainee } from "./trainee.types";
import { CreateTraineeModal } from "./modules/CreateTraineeModal";
import { UpdateTraineeModal } from "./modules/UpdateTraineeModal";

export default function Trainees() {
  const deleteTraineeMutation = useDeleteTraineeById();
  const trainees = useTraineesTableData();

  const [isCreateTraineeModalOpen, setIsCreateTraineeModalOpen] = useState(false);
  const [isUpdateTraineeModalOpen, setIsUpdateTraineeModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [traineeToDelete, setTraineeToDelete] = useState<Trainee | null>(null);

  const [currentItem, setCurrentItem] = useState<Trainee>({
    id: '',
    name: '',
    surname: '',
    email: '',
    phoneNumber: ''
  });

  const handleRowClick = (item: any) => {
    // empty for now
  };

  const handleEditClick = (item: Trainee) => {
    setCurrentItem(item)
    setIsUpdateTraineeModalOpen(true);
  }

  const handleDeleteClick = (item: Trainee) => {
    setTraineeToDelete(item);
    setIsDeleteDialogOpen(true);
  }

  const handleConfirmDelete = () => {
    if (traineeToDelete?.id) {
      deleteTraineeMutation.mutate(traineeToDelete.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setTraineeToDelete(null);
        }
      });
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setTraineeToDelete(null);
  }

  const handleCreateTraineeClick = () => {
    setIsCreateTraineeModalOpen(true);
  }

  return (
    <>
      <Box sx={{ p: { xs: 3, sm: 3, md: 3 }, mb: -6 }}>
        <PageHeader
          title="Trainees"
          actions={
            <>
              <Button
                variant="contained"
                onClick={handleCreateTraineeClick}
              >
                <AddIcon className="mr-2 h-4 w-4" />
                Add Trainee
              </Button>
            </>
          }
        />
      </Box>

      <Box sx={{ mt: -2, p: { xs: 0, sm: 0, md: 3 } }}>
        <DataTable
          headers={trainees.headers}
          data={trainees.data}
          description="trainees"
          isLoading={trainees.isLoading}
          isError={trainees.isError}
          idField="id"
          searchField="name"
          onRowClick={handleRowClick}
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditClick}
        />
      </Box>

      <CreateTraineeModal
        isOpen={isCreateTraineeModalOpen}
        onOpenChange={setIsCreateTraineeModalOpen}
      />

      <UpdateTraineeModal
        id={currentItem.id!}
        name={currentItem.name}
        surname={currentItem.surname}
        email={currentItem.email}
        phoneNumber={currentItem.phoneNumber}
        isOpen={isUpdateTraineeModalOpen}
        onOpenChange={setIsUpdateTraineeModalOpen}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Trainee"
        description={`Are you sure you want to delete ${traineeToDelete?.name} ${traineeToDelete?.surname}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteTraineeMutation.isPending}
        severity="error"
      />
    </>
  )
}
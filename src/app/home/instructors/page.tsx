'use client';

import { ConfirmDialog } from "@/components/elements/ConfirmDialog";
import { DataTable } from "@/components/elements/DataTable";
import { PageHeader } from "@/components/elements/PageHeader";
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useInstructorsTableData, useDeleteInstructorById } from "./instructor.hooks";
import { Instructor } from "./instructor.types";
import { CreateInstructorModal } from "./modules/CreateInstructorModal";
import { UpdateInstructorModal } from "./modules/UpdateInstructorModal";

export default function Instructors() {
  const deleteInstructorMutation = useDeleteInstructorById();
  const instructors = useInstructorsTableData();

  const [isCreateInstructorModalOpen, setIsCreateInstructorModalOpen] = useState(false);
  const [isUpdateInstructorModalOpen, setIsUpdateInstructorModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [instructorToDelete, setInstructorToDelete] = useState<Instructor | null>(null);

  const [currentItem, setCurrentItem] = useState<Instructor>({
    id: '',
    name: '',
    surname: '',
    email: '',
    phoneNumber: ''
  });

  const handleRowClick = (_item: Instructor) => {
    // empty for now
  };

  const handleEditClick = (item: Instructor) => {
    setCurrentItem(item)
    setIsUpdateInstructorModalOpen(true);
  }

  const handleDeleteClick = (item: Instructor) => {
    setInstructorToDelete(item);
    setIsDeleteDialogOpen(true);
  }

  const handleConfirmDelete = () => {
    if (instructorToDelete?.id) {
      deleteInstructorMutation.mutate(instructorToDelete.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setInstructorToDelete(null);
        }
      });
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setInstructorToDelete(null);
  }

  const handleCreateInstructorClick = () => {
    setIsCreateInstructorModalOpen(true);
  }

  return (
    <>
      <Box sx={{ p: { xs: 3, sm: 3, md: 3 }, mb: -6 }}>
        <PageHeader
          title="Instructors"
          actions={
            <>
              <Button
                variant="contained"
                onClick={handleCreateInstructorClick}
              >
                <AddIcon className="mr-2 h-4 w-4" />
                Add Instructor
              </Button>
            </>
          }
        />
      </Box>

      <Box sx={{ mt: -2, p: { xs: 0, sm: 0, md: 3 } }}>
        <DataTable
          headers={instructors.headers}
          data={instructors.data}
          description="instructors"
          isLoading={instructors.isLoading}
          isError={instructors.isError}
          idField="id"
          searchField="name"
          onRowClick={handleRowClick}
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditClick}
        />
      </Box>

      <CreateInstructorModal
        isOpen={isCreateInstructorModalOpen}
        onOpenChange={setIsCreateInstructorModalOpen}
      />

      <UpdateInstructorModal
        id={currentItem.id!}
        name={currentItem.name}
        surname={currentItem.surname}
        email={currentItem.email}
        phoneNumber={currentItem.phoneNumber}
        isOpen={isUpdateInstructorModalOpen}
        onOpenChange={setIsUpdateInstructorModalOpen}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Instructor"
        description={`Are you sure you want to delete ${instructorToDelete?.name} ${instructorToDelete?.surname}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteInstructorMutation.isPending}
        severity="error"
      />
    </>
  )
}
'use client';

import { PageHeader } from "@/components/elements/PageHeader";
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Button from "@mui/material/Button";
import { useInstructorsTableData } from "./instructor.hooks";

export default function Instructors() {
  const instructors = useInstructorsTableData();

  const handleRowClick = (item: any) => {
    // empty for now
  };

  return (
    <>
      <div className="p-6 sm:p-6 space-y-6">
        <PageHeader
          title="Instructors"
          actions={
            <>
              <Button
              >
                <FileDownloadIcon className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
              >
                <AddIcon className="mr-2 h-4 w-4" />
                Add Instructor
              </Button>
            </>
          }
        />
      </div>
    </>
  )
}

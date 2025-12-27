'use client';

import { PageHeader } from "@/components/elements/PageHeader";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useTraineesTableData } from "./trainee.hooks";

export default function Cars() {
  const trainees = useTraineesTableData();

  const handleRowClick = (item: any) => {
    // empty for now
  };

  return (
    <>
      <div className="p-6 sm:p-6 space-y-6">
        <PageHeader
          title="Trainees"
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
                Add Trainee
              </Button>
            </>
          }
        />
      </div>
    </>
  )
}

'use client';

import { Section } from "@/components/layout/Section";
import { DataTable } from "@/components/modules/elements/DataTable";
import { PageHeader } from "@/components/modules/elements/PageHeader";
import Button from "@mui/material/Button";
import { Download, Plus } from "lucide-react";
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
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Trainee
              </Button>
            </>
          }
        />

        <Section className="py-6 animate-fade-in" containerSize="full">
          <div className="mt-6 animate-slide-down">
            <DataTable
              headers={trainees.headers}
              data={trainees.data}
              description="trainees"
              isLoading={trainees.isLoading}
              isError={trainees.isError}
              idField="id"
              searchField="email"
              onRowClick={handleRowClick} // Use our custom row click handler
            />
          </div>
        </Section>
      </div>
    </>
  )
}

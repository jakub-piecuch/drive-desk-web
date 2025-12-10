'use client';

import { DataTable } from "@/components/DataTable";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Layout } from "@/modules/layout/Layout";
import { Download, Plus } from "lucide-react";
import { useTraineesTableData } from "./trainee.hooks";

export default function Cars() {
  const trainees = useTraineesTableData();

  const handleRowClick = (item: any) => {
    // empty for now
  };

  return (
    <Layout>
      <div className="p-6 sm:p-6 space-y-6">
        <PageHeader
          title="Trainees"
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
              idField="ID"
              searchField="Email"
              onRowClick={handleRowClick} // Use our custom row click handler
            />
          </div>
        </Section>
      </div>
    </Layout>
  )
}

'use client';

import { DataTable } from "@/components/DataTable"
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getTheme } from "@/lib/theme-config"
import { Layout } from "@/modules/layout/Layout"
import { Download, Plus } from "lucide-react"
import { useTrainees, useTraineesTableData } from "./trainee.hooks"

export default function Cars() {
  const theme = getTheme('green')
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
                variant="lightGray"
                size="sm"
                className={`whitespace-nowrap ${theme.colors.light}`}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                size="sm"
                className={`whitespace-nowrap ${theme.colors.primary} ${theme.colors.text} ${theme.colors.hover}`}
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

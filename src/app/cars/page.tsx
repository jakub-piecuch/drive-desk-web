'use client';

import { DataTable } from "@/components/DataTable"
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getTheme } from "@/lib/theme-config"
import { Layout } from "@/modules/layout/Layout"
import { Download, Plus } from "lucide-react"
import { useCars } from "./car.hooks"

export default function Cars() {
  const theme = getTheme('green')
  const cars = useCars();

  // Define table headers
  const headers = ["Registration Number", "Make", "Model"];

  // Transform the data to match our headers
  const transformedData = cars.data?.map(car => ({
    ID: car.id,
    RegistrationNumber: car.registrationNumber,
    Make: car.make,
    Model: car.model
  })) || [];

  const handleRowClick = (item: any) => {
    // empty for now
  };

  return (
    <Layout>
      <div className="p-6 sm:p-6 space-y-6">
        <PageHeader
          title="Cars"
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
                Add new car
              </Button>
            </>
          }
        />

        <Section className="py-6 animate-fade-in" containerSize="full">
          <div className="mt-6 animate-slide-down">
            <DataTable
              headers={headers}
              data={transformedData}
              description="cars"
              isLoading={cars.isLoading}
              isError={cars.isError}
              idField="ID"
              searchField="RegistrationNumber"
              onRowClick={handleRowClick} // Use our custom row click handler
            />
          </div>
        </Section>
      </div>
    </Layout>
  )
}

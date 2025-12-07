import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/components/ui/button"
import { getTheme } from "@/lib/theme-config"
import { Layout } from "@/modules/layout/Layout"
import { Download, Plus } from "lucide-react"

export default function Dashboard() {
  const theme = getTheme('green')

  return (
    <Layout>
      <div className="p-6 sm:p-6 space-y-6">

        <PageHeader
          title="Schedules"
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
                New Report
              </Button>
            </>
          }
        />
      </div>
    </Layout>
  )
}
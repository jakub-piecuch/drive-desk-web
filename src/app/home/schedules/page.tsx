import { PageHeader } from "@/components/modules/elements/PageHeader"
import { Button } from "@/components/ui/button"
import { Download, Plus } from "lucide-react"

export default function Dashboard() {

  return (
    <>
      <div className="p-6 sm:p-6 space-y-6">
        <PageHeader
          title="Schedules"
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
                New Report
              </Button>
            </>
          }
        />
      </div>
    </>
  )
}
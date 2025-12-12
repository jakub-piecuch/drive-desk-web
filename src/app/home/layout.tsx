import { Layout } from "@/components/modules/layout/Layout";

interface HomeLayoutProsp {
  children: React.ReactNode
}

export default function homeLayout({children}: HomeLayoutProsp) {

  return (
    <Layout>
      {children}
    </Layout>
  )
}
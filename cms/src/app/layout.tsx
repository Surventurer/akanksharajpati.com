import './globals.css'

export const metadata = {
  title: 'Autumn Stories CMS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

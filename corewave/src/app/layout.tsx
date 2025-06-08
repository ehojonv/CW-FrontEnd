import type { Metadata } from 'next'
import { AuthProvider } from '../contexts/AuthContext';
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CoreWave - Monitoramento de Eventos Extremos',
  description: 'Sistema avançado de detecção e análise de eventos extremos da natureza',
  icons: {
    icon: '/favicon.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
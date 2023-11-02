import Image from 'next/image'
import { Inter } from 'next/font/google'
import Hero from '@/components/hero/Hero'
import Feed from '@/components/feed/Feed'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className=" w-[50%]">
      <Hero />
      <Feed/>
    </main>
  )
}

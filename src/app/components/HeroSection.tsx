import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section>
          <Image
            src="/banner.jpg"
            alt="Banière"
            width={50}
            height={50}
            className="mr-2"
          />
          <Link href="/contact">Voir les prestations</Link>
    </section>
  )
}

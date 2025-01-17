"use client";
import Image from 'next/image';

export default function Home() {
  return (
      <main className="flex flex-col items-center justify-center h-screen">

        <Image src="/logo.png" alt="Logo" width={150} height={150} className='pt-64 lg:pt-0'/>
        <p className="text-3xl mx-auto">Site en construction</p>
        <p className='w-[85%] lg:w-[60%] my-10 text-center text-lg '><span className='font-bold'>Educagriff</span> est une entreprise de prestations de services en lien avec les animaux de compagnie. Elle vous conseille, vous accompagne, s&apos;occupe, éduque et rééduque vos animaux selon vos besoins. (Services de petsitteur, d&apos;éducateur, comportementaliste canin et félin) <br />
        L&apos;empathie, la bienveillance et l&apos;écoute en accord avec les besoins physiologiques, comportementaux et psychologiques de l&apos;animal et du maître sont les principales valeurs que nous défendons. </p>
        <p className='text-xl pb-16'>Contactez-nous au <a href='tel:0651271749' className='underline'>06 51 27 17 49</a>.</p>
      </main>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import TarifsChat from "../components/tarifs-chats";
import TarifsChien from "../components/tarifs-chiens";
import { motion } from "framer-motion";

export default function Tarifs() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="flex flex-col items-center h-screen">
      <h1 className="w-full m-16 text-xl font-bold text-center mb-8">
        Choisissez votre animal :
      </h1>
      <section className="flex items-start justify-evenly flex-wrap pb-16 w-full">
        <motion.article 
          className="flex flex-col items-center"
          animate={{ 
            scale: selected === "chat" ? 1.2 : 1, 
            x: selected === "chien" ? -100 : 0 
          }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={() => setSelected("chat")}
            className={`flex items-center justify-center w-44 h-44 rounded-full border-4 ${
              theme === "light" ? "border-light" : "border-dark"
            }`}
          >
            <Image
              src={resolvedTheme === "dark" ? "/tarif-chat-light.png" : "/tarif-chat.png"}
              alt="Icone de chat"
              width={100}
              height={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-32 h-32"
            />
          </Button>
          <h2 className="pt-2">
            Prestations pour <span className="font-bold">chat</span>
          </h2>
        </motion.article>
        <motion.article 
          className="flex flex-col items-center"
          animate={{ 
            scale: selected === "chien" ? 1.2 : 1, 
            x: selected === "chat" ? 100 : 0 
          }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={() => setSelected("chien")}
            className={`flex items-center justify-center w-44 h-44 rounded-full border-4 ${
              theme === "light" ? "border-light" : "border-dark"
            }`}
          >
            <Image
              src={
                resolvedTheme === "dark" ? "/tarif-chien-light.png" : "/tarif-chien.png"
              }
              alt="Icone de chien"
              width={100}
              height={100}
              className="w-32 h-32"
            />
          </Button>
          <h2 className="pt-2">
            Prestations pour <span className="font-bold">chien</span>
          </h2>
        </motion.article>
      </section>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: selected === "chat" ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {selected === "chat" && <TarifsChat />}
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: selected === "chien" ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {selected === "chien" && <TarifsChien />}
      </motion.div>
    </main>
  );
}

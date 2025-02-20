"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import TarifsChat from "../components/tarifs-chats";
import TarifsChien from "../components/tarifs-chiens";
import { motion } from "framer-motion";

export default function Tarifs() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<"chat" | "chien" | null>(null);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  
  return (
    <section
      className={`min-h-screen py-16 transition-colors duration-300 w-full ${
        resolvedTheme === "light"
          ? "bg-gradient-to-b from-orange-50 to-white text-gray-800"
          : "bg-gradient-to-b from-gray-900 to-black text-gray-100"
      }`}
    >
      <h1
        className={`text-center text-3xl font-bold m-4 ${
          resolvedTheme === "light" ? "text-orange-600" : "text-orange-400"
        }`}
      >
        Liste des prestations proposées par Educagriff
      </h1>
      <div
        className={`h-1 w-24 mx-auto mb-8 ${
          resolvedTheme === "light" ? "bg-orange-500" : "bg-orange-400"
        }`}
      ></div>

      <h2 className="text-xl font-bold text-center mb-8">
        Choisissez votre animal :
      </h2>

      <section className="flex items-start justify-evenly flex-wrap pb-16 w-full">
        {["chat", "chien"].map((animal) => (
          <motion.article
            key={animal}
            className="flex flex-col w-[50%] lg:w-auto items-center"
            animate={{
              scale: selected === animal ? 1.2 : 0.9,
              x:
                selected && selected !== animal
                  ? animal === "chat"
                    ? -100
                    : 100
                  : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <Button
              onClick={() => setSelected(animal as "chat" | "chien")}
              className={`flex items-center justify-center w-40 h-40 rounded-full border-2 ${
                resolvedTheme === "light"
                  ? "border-orange-400 bg-white shadow-lg hover:shadow-2xl"
                  : "border-orange-400 bg-gray-700/70 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
              }`}
            >
              <Image
                src={
                  resolvedTheme === "dark"
                    ? `/tarif-${animal}-light.png`
                    : `/tarif-${animal}.png`
                }
                alt={`Icone de ${animal}`}
                width={100}
                height={100}
                className="w-32 h-32"
              />
            </Button>
            <h3 className="pt-2 text-lg text-center font-semibold w-[11ch] lg:w-auto">
              Prestations pour <span className="font-bold">{animal}</span>
            </h3>
          </motion.article>
        ))}
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
    </section>
  );
}

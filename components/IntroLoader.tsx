"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Intro = dynamic(() => import("@/components/Intro"), { ssr: false });

export default function IntroLoader() {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem("intro_seen")) {
        setShow(true);
      } else {
        setDone(true);
      }
    } catch {
      setDone(true);
    }
  }, []);

  const handleDone = () => {
    try {
      sessionStorage.setItem("intro_seen", "1");
    } catch {}
    setShow(false);
    setDone(true);
  };

  if (done || !show) return null;
  return <Intro onDone={handleDone} />;
}

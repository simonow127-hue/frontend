"use client";
import { useEffect } from "react";
import { initSession } from "@/lib/events";

export default function SessionInit() {
  useEffect(() => {
    initSession();
  }, []);
  return null;
}

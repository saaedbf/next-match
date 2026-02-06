"use client";
import { Card } from "@heroui/react";
import React, { ReactNode } from "react";

export default function ClientCard({ children }: { children: ReactNode }) {
  return <Card className="w-full mt-10 h-[80vh]">{children}</Card>;
}

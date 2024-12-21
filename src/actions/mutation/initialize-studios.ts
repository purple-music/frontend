"use server";

import prisma from "@/lib/db";

let initialized = false;

export async function initializeStudios() {
  if (initialized) return; // Avoid duplicate runs
  initialized = true;

  const studios = [{ id: "purple" }, { id: "orange" }, { id: "blue" }];

  for (const studio of studios) {
    await prisma.studio.upsert({
      where: { id: studio.id },
      update: {},
      create: studio,
    });
  }

  console.log("Studios are initialized!");
}

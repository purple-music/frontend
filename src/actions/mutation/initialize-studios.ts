"use server";

let initialized = false;

export async function initializeStudios() {
  if (initialized) return; // Avoid duplicate runs
  initialized = true;

  const studios = [{ id: "purple" }, { id: "orange" }, { id: "blue" }];

  for (const studio of studios) {
    // TODO: prisma removed
    // await prisma.studio.upsert({
    //   where: { id: studio.id },
    //   update: {},
    //   create: studio,
    // });
  }

  console.log("Initialize Studios is complete! Although it's not really.");
}

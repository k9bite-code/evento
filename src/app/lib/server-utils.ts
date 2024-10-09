import "server-only";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { RESULTS_PER_PAGE } from "./constants";
import prisma from "./db";
import { capitalise } from "./utils";

export const getEvents = unstable_cache(async (city: string, page = 1) => {
  const events = await prisma.eventoEvent.findMany({
    where: {
      city: city === "all" ? undefined : capitalise(city),
    },
    orderBy: {
      date: "asc",
    },
    take: RESULTS_PER_PAGE,
    skip: (page - 1) * RESULTS_PER_PAGE,
  });

  const totalCount = await prisma.eventoEvent.count({
    where: {
      city: city === "all" ? undefined : capitalise(city),
    },
  });

  return { events, totalCount };
});

export const getEvent = unstable_cache(async (slug: string) => {
  const event = await prisma.eventoEvent.findUnique({
    where: {
      slug: slug,
    },
  });
  if (!event) {
    return notFound();
  }
  return event;
});

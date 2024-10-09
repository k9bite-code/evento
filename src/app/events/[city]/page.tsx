import Loading from "@/app/events/[city]/loading";
import { capitalise } from "@/app/lib/utils";
import EventsList from "@/components/events-list";
import H1 from "@/components/h1";
import { Metadata } from "next";
import { Suspense } from "react";
import { z } from "zod";

type generateMetadataParams = {
  params: { city: string };
};

type EventsPageParams = generateMetadataParams & {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params }: generateMetadataParams): Metadata {
  return {
    title:
      params.city === "all"
        ? "All Events"
        : `Events in ${capitalise(params.city)}`,
  };
}
const pageNumberScema = z.coerce.number().int().positive().optional();

export default async function EventsPage({
  params,
  searchParams,
}: EventsPageParams) {
  const city = params.city;
  const parsedPage = pageNumberScema.safeParse(searchParams?.page);
  if (!parsedPage.success) {
    throw new Error("Invalid page number");
  }
  const page = parsedPage.data;

  return (
    <main className="flex flex-col items-center py-24 px-[20px]">
      <H1 className="mb-28">
        {city === "all" && "All Events"}
        {city !== "all" && (
          <p>
            Events in <span className="capitalize">{city}</span>
          </p>
        )}
      </H1>
      <Suspense key={city + page} fallback={<Loading />}>
        <EventsList city={city} page={page} />
      </Suspense>
    </main>
  );
}

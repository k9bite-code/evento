import { EventoEvent } from "@prisma/client";
import EventCard from "./event-card";
import { getEvents } from "@/app/lib/server-utils";
import PaginationControls from "./pagination-controls";
import { RESULTS_PER_PAGE } from "@/app/lib/constants";

type EventsListProps = {
  city: string;
  page?: number;
};

export default async function EventsList({ city, page = 1 }: EventsListProps) {
  const { events, totalCount }: { events: EventoEvent[]; totalCount: number } =
    await getEvents(city, page);

  const totalPages = totalCount / RESULTS_PER_PAGE;
  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : null;
  const nextPath =
    page < totalPages ? `/events/${city}?page=${page + 1}` : null;

  return (
    <section className="flex flex-wrap gap-10 justify-center max-w-[1100px] px-[20px]">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </section>
  );
}

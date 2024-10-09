import { getEvent } from "@/app/lib/server-utils";
import H1 from "@/components/h1";
import { Metadata } from "next";
import Image from "next/image";

type EventPageParams = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: EventPageParams): Promise<Metadata> {
  const event = await getEvent(params.slug);

  return {
    title: event !== null ? event.name : "Evento",
  };
}

export default async function EventPage({ params }: EventPageParams) {
  const event = await getEvent(params.slug);
  return (
    <main>
      <section className="relative overflow-hidden flex justify-center items-center py-14 md:py-20">
        <Image
          src={event.imageUrl}
          className="object-cover z-0 blur-3xl"
          alt="Event background image"
          fill
          quality={50}
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />
        <div className="flex flex-col z-1 gap-6 lg:gap-16 lg:flex-row relative">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover"
          />
          <div className="flex flex-col">
            <p className="text-white/75">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {event.name}
            </H1>
            <p className="whitespace-nowrap text-xl text-white/75">
              Organised by <span className="italic">{event.organizerName}</span>
            </p>
            <button className="bg-white/20 mt-5 lg:mt-auto text-lg w-[95vw] capitalize rounded-md bg-blur border-white/10 border-2 sm:w-full py-2 state-effects">
              Get tickets
            </button>
          </div>
        </div>
      </section>
      <div className="text-center px-5 py-16 min-h-[75vh]">
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionContent>{event.description}</SectionContent>
        </Section>
        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionContent>{event.location}</SectionContent>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-12">{children}</section>;
}
function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl mb-8">{children}</h2>;
}
function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-white/75 text-lg leading-8 max-w-4xl mx-auto">
      {children}
    </p>
  );
}

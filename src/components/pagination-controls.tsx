import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type PaginationControlsProps = {
  previousPath: string | null;
  nextPath: string | null;
};

const btnStyle =
  "flex items-center text-white px-5 py-3 gap-x-2 bg-white/5 rounded-md opacity-75 hover:opacity-100 text-sm transition";

export default function PaginationControls({
  previousPath,
  nextPath,
}: PaginationControlsProps) {
  return (
    <section className="flex justify-between w-full">
      {previousPath !== null ? (
        <Link href={previousPath} className={btnStyle}>
          <ArrowLeftIcon />
          Previous
        </Link>
      ) : (
        <div />
      )}
      {nextPath !== null && (
        <Link className={btnStyle} href={nextPath}>
          Next
          <ArrowRightIcon />
        </Link>
      )}
    </section>
  );
}

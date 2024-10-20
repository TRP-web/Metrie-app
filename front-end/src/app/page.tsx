import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <Link
          href={"/prime"}
          className="bg-yellowcus block p-4 rounded-md text-xl mr-3"
        >
          Prime Line
        </Link>
        <Link
          href={"/outfeed"}
          className="bg-yellowcus block p-4 rounded-md text-xl"
        >
          Outfeed Line
        </Link>
      </div>

    </>

  );
}

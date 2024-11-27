import Link from "next/link";
import IPages from "./types/IPages";

export default function Home() {
  return (
    <>
      {/* <Camera /> */}
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <Link
          href={IPages.prime}
          className="bg-yellowcus block p-4 rounded-md text-xl mr-3 active:bg-yellowdurk"
        >
          Prime Line
        </Link>
        <Link
          href={IPages.outfeed}
          className="bg-yellowcus block p-4 rounded-md text-xl active:bg-yellowdurk"
        >
          Outfeed Line
        </Link>
      </div>

    </>

  );
}

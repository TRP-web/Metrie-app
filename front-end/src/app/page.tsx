import Link from "next/link";
import Button from "./components/Button/Button";

export default function Home() {
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <Link
          href={"/prime"}
          className="bg-yellowcus block p-4 rounded-md text-xl mr-3 active:bg-yellowdurk"
        >
          Prime Line
        </Link>
        <Link
          href={"/outfeed"}
          className="bg-yellowcus block p-4 rounded-md text-xl active:bg-yellowdurk"
        >
          Outfeed Line
        </Link>
      </div>

    </>

  );
}

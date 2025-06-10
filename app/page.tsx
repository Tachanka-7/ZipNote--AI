import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1>Home page</h1>
      <Button variant={"outline"}>Hello button</Button>
    </div>
  );
}

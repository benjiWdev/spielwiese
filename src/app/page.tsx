import Link from "next/link";
import Button from "@/components/_ui/button";

export default async function Dashboard() {
  return (
    <div>
      <Link href={"recipes"}>
        <Button>Rezepte</Button>
      </Link>
    </div>
  );
}

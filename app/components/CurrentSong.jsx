import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CurrentSong({ song }) {
  return (
    <>
      <Card className="flex bg-black text-white border-none">
        <div className="h-16 w-16">
          <img
            className="object-cover w-full h-full aspect-square"
            src={song?.imageUrl}
            alt=""
          />
        </div>
        <CardHeader className="p-2">
          <CardTitle>{song?.title}</CardTitle>
          <CardDescription>{song?.artist}</CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}

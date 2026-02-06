"use client";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { BiSolidError } from "react-icons/bi";
// Error boundaries must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center vertical-canter">
      <Card className="w-2/5 mx-auto">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col text-secondary gap-2 items-center">
            <BiSolidError size={30} />
            <h1 className="text-3xl font-semibold">Error</h1>
          </div>
        </CardHeader>
        <CardBody>
          <div className="justify-center text-danger flex">{error.message}</div>
        </CardBody>
        <CardFooter>
          <div className="justify-center flex">
            <Button
              onClick={() => reset()}
              color="secondary"
              variant="bordered"
            >
              Try Again
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

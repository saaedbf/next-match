import { auth, signOut } from "@/auth";
import { Button } from "@heroui/button";
export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h1>hello</h1>
      {session ? (
        <div>
          {JSON.stringify(session, null, 2)}
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit" color="primary" variant="bordered">
              signOut
            </Button>
          </form>
        </div>
      ) : (
        <div>no session</div>
      )}
    </div>
  );
}

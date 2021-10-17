import { ArchiveIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FunctionComponent } from "react";

import Button, { ButtonPriority } from "./button";
import Heading from "./common/heading";

const Navbar: FunctionComponent = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="flex flex-col items-center w-full border-b-1 border-gray-100">
      <div className="flex flex-grow items-center py-5 px-8 w-full max-w-7xl">
        <span className="w-14 h-14 mr-4 bg-gray-200 rounded-full" />
        <Link href="/" passHref>
          <a>
            <Heading level={1}>Osakemyrsky</Heading>
          </a>
        </Link>
        <span className="flex-grow"></span>
        {status === "loading" || !session ? null : (
          <Link href="/profile">
            <a className="text-md tracking-wide">Profiili</a>
          </Link>
        )}
        {status === "loading" ? null : session ? (
          <div>
            <Button priority={ButtonPriority.SECONDARY} icon={<ArchiveIcon />} onClick={() => signOut()}>
              Kirjaudu ulos
            </Button>
          </div>
        ) : (
          <Button priority={ButtonPriority.PRIMARY} icon={<ArchiveIcon />} onClick={() => signIn("google")}>
            Kirjaudu sisään
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

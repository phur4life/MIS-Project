import {auth} from "@/auth"
import { redirect } from "next/navigation";
import Image from "next/image";
const HomePage = async() => {
    const session = await auth();

    if(!session?.user) redirect("/");

  return (
    <div className=" flex flex-col items-center">
        <h1>
            {session?.user?.name}
        </h1>
        <Image 
         src={session?.user?.image}
         alt={session?.user?.name}
         width={72}
         height={72}
         className="rounded-fill"
        />
    </div>
  )
}

export default HomePage
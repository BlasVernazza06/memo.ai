import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "better-auth";
import Image from "next/image";

export default function LoggedUserButtons({ user }: { user: User }) {
    return (
        <div className="flex items-center gap-3" >
            <Link 
                href="/dashboard" 
                className="bg-primary/10 border border-primary/30 px-2 py-1 rounded-lg text-xs text-primary font-medium transition-all duration-200"
            >
                Dashboard
            </Link>
            <Button
                variant={"ghost"}
                size="icon"
                className="rounded-full h-9 w-9"
            >
                {user.image ? (
                    <Image src={user.image} alt={user.name || "User"} width={36} height={36} />
                ) : (
                    <div className="w-full h-full bg-primary/10 border-1 border-black rounded-full flex items-center justify-center text-xs font-bold text-primary">
                        {user.name?.charAt(0) || "U"}
                    </div>
                )}
            </Button>
        </div>
    );
}
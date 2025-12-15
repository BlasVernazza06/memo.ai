import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {GitHubLight, Google} from "@ridemountainpig/svgl-react";

interface OAuthButtonsProps {
    disabled?: boolean;
    onLoadingChange?: (loading: boolean) => void;
}

export default function OAuthButtons({ disabled, onLoadingChange }: OAuthButtonsProps) {
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const onSubmitAuth = (provider: "Github" | "Google") => {
        try {
            setIsLoading(provider);
            onLoadingChange?.(true);
            
            // Add actual auth logic here later
            // await signIn(provider)...
            
        } catch (error) {
            console.log(error);
            setIsLoading(null);
            onLoadingChange?.(false);
        }
        // catch/finally logic to reset would go here when implemented
    };

    const isAnyLoading = isLoading !== null;

    return (
        <div className="grid grid-cols-2 gap-2 w-full">
            <Button
                className="border w-full bg-white text-black hover:bg-accent transition-colors duration-200"
                onClick={() => onSubmitAuth("Google")}
                disabled={disabled || isAnyLoading}
            >
                {isLoading === "Google" ? <Spinner /> : <Google />}
                {isLoading === "Google" ? "Conectando..." : "Google"}
            </Button>
            <Button
                className="border w-full bg-white text-black hover:bg-accent transition-colors duration-200"
                onClick={() => onSubmitAuth("Github")}
                disabled={disabled || isAnyLoading}
            >
                {isLoading === "Github" ? <Spinner /> : <GitHubLight />}
                {isLoading === "Github" ? "Conectando..." : "Github"}
            </Button>
        </div>
    );
}
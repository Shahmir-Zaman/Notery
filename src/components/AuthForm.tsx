'use client'
import { toast } from 'sonner';
import { useRouter } from "next/navigation";

type Props = {
    type: "login" | "signUp"
};

function AuthForm({ type }: Props) {
    const isLoginForm = type === "login";

    const router = useRouter();

    const handleSubmit= (formData:FormData)=>{
        console.log("Meow Meow")
    };

    return (
        <div>AuthForm</div>
    )
}

export default AuthForm
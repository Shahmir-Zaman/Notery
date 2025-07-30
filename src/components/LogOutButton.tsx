"use client";

import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';


function LogOutButton() {
    const router= useRouter();
    const [loading, setLoading] = useState(false);
    const handleLogOut = async () => {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const errorMessage = null;

        if (!errorMessage) {
            toast.success("Logged Out Successfully!", {
            });
            router.push("/");
        } else {
            toast.error(errorMessage);
        }
        setLoading(false);
    };
    return (
        <Button variant="outline" onClick={handleLogOut} className="w-24" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Log Out"}</Button>
    );
}

export default LogOutButton
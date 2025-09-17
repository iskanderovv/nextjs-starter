"use client";
import type React from "react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const session = useSession();
  useEffect(() => {
    if (session.status === "unauthenticated" && !session.data) {
      signOut({
        callbackUrl: "/",
      });
    } else if (session.status === "authenticated") {
      setLoading(false);
    }
  }, [session.status]);

  if (loading) return null;

  return <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>;
}

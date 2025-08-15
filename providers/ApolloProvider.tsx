"use client";
import { ApolloProvider } from "@apollo/client";
import { apollo } from "@/lib/apolloClient";
import { type ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ApolloProvider client={apollo}>
      {children}
    </ApolloProvider>
  );
}

import { PropsWithChildren } from "react";
import { AuthContextProvider } from "./auth-context.js";
import { WebSocketContextProvider } from "./websocket-context.js";

export function Context({ children }: PropsWithChildren) {
  return (
    <AuthContextProvider>
      <WebSocketContextProvider>{children}</WebSocketContextProvider>
    </AuthContextProvider>
  );
}

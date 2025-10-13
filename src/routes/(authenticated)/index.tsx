import { createFileRoute, redirect } from "@tanstack/react-router";
import AccountsPage from "../../pages/accounts";

export const Route = createFileRoute("/(authenticated)/")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          // Save current location for redirect after login
          redirect: location.href,
        },
      });
    }
  },
  component: () => <AccountsPage />,
});

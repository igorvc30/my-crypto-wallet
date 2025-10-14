import { createFileRoute, redirect } from "@tanstack/react-router";
import AddAccountPage from "../../pages/add";

export const Route = createFileRoute("/(authenticated)/add")({
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
  component: AddAccountPage,
});

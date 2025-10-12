import { createFileRoute, redirect } from "@tanstack/react-router";
import LoginPage from "../pages/login";

export const Route = createFileRoute("/login")({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || "/",
  }),
  beforeLoad: ({ context, search }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect });
    }
  },
  component: () => (
    <>
      <LoginPage />
    </>
  ),
});

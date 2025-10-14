import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import LoginLayout from "../layout/login";
import MainLayout from "../layout/main";
import type { User } from "../types";
import type { Login } from "../schemas";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: ({ username, password }: Login) => Promise<void>;
  logout: () => void;
}

interface RouterContext {
  auth: AuthState;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { auth } = Route.useRouteContext();
  if (auth.isAuthenticated) {
    return (
      <MainLayout>
        <Outlet />
        <TanStackRouterDevtools initialIsOpen={false} />
      </MainLayout>
    );
  }
  return (
    <LoginLayout>
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} />
    </LoginLayout>
  );
}

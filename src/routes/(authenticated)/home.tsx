import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/home")({
  component: () => (
    <>
      <div>Hello /home!</div>
    </>
  ),
});

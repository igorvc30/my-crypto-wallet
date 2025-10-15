import { createFileRoute } from "@tanstack/react-router";
import TransferPage from "../../../pages/transfer";

export const Route = createFileRoute("/(authenticated)/transfer/$accountId")({
  component: TransferPage,
});

import { ROUTES } from "@/utils/constants/routes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(ROUTES.dictionary);
  return null;
}

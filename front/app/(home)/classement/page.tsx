"use client";
import { useSessionStore } from "@/store/session.store";
import { Ranking } from "@/containers/ranking/Ranking";
export default async function Classement() {
  //const session = useSessionStore((state) => state.session);
  return <Ranking />;
}

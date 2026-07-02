import { redirect } from "next/navigation"

export default function Page() {
  // O dashboard é HTML/CSS/JS puro, servido a partir de /public.
  redirect("/index.html")
}

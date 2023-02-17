import Categories from "@/components/Categories";
import Products from "@/components/Products";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity"


const catQuery = groq`
  *[_type=='categories'] {
    ...
  }
`;

export default async function Home() {
  const categories = await client.fetch(catQuery)
  
  return (
    <main>
      <Categories categories={categories} />
    </main>
  )
}

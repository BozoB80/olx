import Categories from "@/components/Categories";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity"


const catQuery = groq`
  *[_type=='categoryList'] {
    ...
  } | order(_createdAt asc)
`;

export default async function Home() {
  const categories = await client.fetch(catQuery)
  console.log(categories);
  
  return (
    <main>
      <Categories categories={categories} />
    </main>
  )
}

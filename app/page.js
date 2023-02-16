import Products from "@/components/Products";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity"


const query = groq`
  *[_type=='products'] {
    ...
  }
`;

export default async function Home() {
  const products = await client.fetch(query)

  return (
    <main>
      <Products products={products} />
    </main>
  )
}

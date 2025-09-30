import IdeaCard, { IdeaCardType } from "@/components/IdeaCard";
import SearchForm from "../../components/SearchForm";
import { IDEA_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({searchParams}: 
  {searchParams: Promise<{query?: string}>}) 
{
  const query = (await searchParams).query;
  const params = { search : query || null};
  const session = await auth();
  
  console.log(session?.id);

  const { data : posts } = await sanityFetch({query: IDEA_QUERY, params});

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Share Your Mind, <br/> Connect With Other Fellow Qoos</h1>
        <p className="sub-heading !max-w-3xl">
          Submit your world, agree on ideas that impacts you the most and Get Noticed All Over the World.
        </p>

        <SearchForm query={query}/>
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : 'Fresh Ideas'}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: IdeaCardType, index: number)=> (
              <IdeaCard key={post?._id} post={post} />
            ))
          ):(
            <p className="no-results">No Ideas Found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}

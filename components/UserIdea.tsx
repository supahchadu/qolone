import { client } from "@/sanity/lib/client";
import { IDEAS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import IdeaCard from "./IdeaCard";
import { IdeaCardType } from "./IdeaCard";

const UserIdea = async ({id}: {id:string}) => {
    const ideas = await client.fetch(IDEAS_BY_AUTHOR_QUERY, {id});
   
    return (
    <>
        {ideas.length > 0 ? ideas.map((idea: IdeaCardType) =>
            (<IdeaCard key={idea._id} post={idea} />
        )) : (<p className="no-results">No Messages Yet~</p>)
        }
    </>
    );
}

export default UserIdea;
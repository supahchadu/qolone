import { IDEA_READS_QUERY } from "@/sanity/lib/queries";
import Ping from "./Ping";
import {client} from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from "next/server";

const Read = async ({id} : {id:string}) => {
    const {reads : totalReads } = await client.withConfig({
        useCdn: false}).fetch(IDEA_READS_QUERY, {id});

    after(async()=> await writeClient
        .patch(id).set({reads: totalReads + 1}).commit());

    return (
        <div className="view-container"> 
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>

            <p className="view-text">
                <span className="font-black">{totalReads} reads</span>
            </p>
        </div>
    );
}

export default Read;
import { formatDate, cn } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Author, Idea } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";

export type IdeaCardType = Omit<Idea,"author"> & {author?: Author};

const IdeaCard = ({post} : {post : IdeaCardType}) => {

    const { _createdAt, reads, author, title, category, _id,
    image, description } = post;
    
    return (
        <li className="startup-card group">
            <div className="flex-between">
                <p className="startup_card_date">
                    {formatDate(_createdAt)}
                </p>
                <div className="flex gap-1.5">
                    <EyeIcon className="size-6 text-primary" />
                    <span className="text-16-medium">{reads}</span>
                </div>
            </div>

            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${author?._id}`}>
                        <p className="text-16-medium line-clamp-1">{author?.name}</p>
                    </Link>
                    <Link href={`/idea/${_id}`}>
                        <h3 className="text-26-semibold line-clamp-1">
                            {title}
                        </h3>
                    </Link>
                </div>
                 <Link href={`/user/${author?._id}`}>
                    <Image src={author?.image} alt={author?.name} width={48} height={48} className="rounded-full" />
                 </Link>
            </div>

            <Link href={`/idea/${_id}`}>
                <p className="startup-card_desc">
                    {description}
                </p>

                <img src={image} alt="placeholder" className="startup-card_img" />
            </Link>

            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className="text-16-medium">{category}</p>
                </Link>
                <Button className="startup-card_btn" asChild>
                    <Link href={`/idea/${_id}`}>
                        Read Message
                    </Link>
                </Button>

            </div>
        </li>
    );
}

export const IdeaCardSkeleton = () => (
    <>
        {[0,1,2,3,4].map((index: number) => (
            <li key={cn("skeleton", index )}>
                <Skeleton className="startup-card_skeleton" />
            </li>
        ))}
    </>
)
export default IdeaCard;
import { auth } from "@/auth";
import IdeaForm from "@/components/IdeaForm";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await auth();

    // redirect unauthorized users
    if(!session) redirect("/");

    return (<>
        <section className="pink_container !min-h-[230x]">
            <h1 className="heading">Write your creative world</h1>
        </section>
        <IdeaForm />
    </>
    );
}

export default Page;
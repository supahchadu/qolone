"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import z from 'zod';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createIdea } from "@/lib/actions";


const IdeaForm = () => {

    const [ errors, setErrors ]= useState<Record<string,string>>({});
    const [ pitch, setPitch ] = React.useState("");
    const {toast} = useToast();
    const router = useRouter();

    const handleFormSubmit = async (prevState:any, formData: FormData) => {
        try{
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            }

            await formSchema.parseAsync(formValues);
            console.log(formValues);
            const result = await createIdea(prevState, formData, pitch);
            console.log(result);
            if(result.status == "SUCCESS") {
             toast({
                    title:"Nice Work!",
                     description: "Your message has been delivered to the world~",
                 });
            }

            router.push(`/idea/${result._id}`);
            return result;
        }catch(error){
            if(error instanceof z.ZodError)
            {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string,string>);
                toast({
                    title:"Error",
                    description: "Please double check your inputs and try again :)",
                    variant: "destructive",
                });
                return {... prevState, error: "Validation failed", status: "ERROR"};
            }

            toast({
                    title:"Error",
                    description: "We had a problem on our system...",
                    variant: "destructive",
                });
            return {...prevState, error: "An unexpected error has occured",
                status: "ERROR",
            };
            

        }
    };

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {error: "", status: "INITIAL"});
    
    
    return (
        <form action={formAction} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">Title</label>
                <Input id="title" name="title" className="startup-form_input" required placeholder="Content Title" />
                {errors.title && <p className="startup-form_error">{errors.title}</p>}
            </div>
            <div>
                <label htmlFor="description" className="startup-form_label">description</label>
                <Textarea id="description" name="description" className="startup-form_textarea" required placeholder="Short Description" />
                {errors.description && <p className="startup-form_error">{errors.description}</p>}
            </div>

            <div>
                <label htmlFor="category" className="startup-form_label">Category</label>
                <Input id="category" name="category" className="startup-form_input" required placeholder="Content Category (Tech, Health, Comedy, Education )" />
                {errors.category && <p className="startup-form_error">{errors.category}</p>}
            </div>

            <div>
                <label htmlFor="link" className="startup-form_label">Image Url</label>
                <Input id="link" name="link" className="startup-form_input" required placeholder="Insert Image URL Here (https://image.url)" />
                {errors.link && <p className="startup-form_error">{errors.link}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">Entire Message</label>
                <MDEditor 
                value={pitch}
                onChange={(value)=>setPitch(value as string)}
                id="pitch"
                preview="edit"
                height={300}
                style={{borderRadius: 20, overflow: "hidden" }}
                textareaProps={{
                    placeholder: "Organize your message to the world",
                }}
                previewOptions={{disallowedElements: ["style"], }}
                 />
                  {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
            </div>

            <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
                {isPending ? 'Submitting...' : "Publish your Message"}
                <Send className="size-6 ml-2" />
            </Button>
        </form>
    );
// GO VIDEO TIME: 3:55:34 --
}

export default IdeaForm;
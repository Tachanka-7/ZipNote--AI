'use client'

import { z } from "zod";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast, useSonner } from "sonner"

const schema = z.object({
    file: z.instanceof(File, {message: 'Invalid file'})
    .refine((file)=>file.size <= 20 * 1024 *1024, {
        message: 'File size must be less than 20 MB'
    })
    .refine((file)=>file.type.startsWith('application/pdf'), {
        message: 'File must be a pdf'
    })
})


export default function UploadForm() {

    

   const { startUpload, routeConfig } = useUploadThing("pdfuploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
      toast.success("File Uploaded Successfully")
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading",err);
      toast.error("Error while Uploadig File", {
        description: err.message
      })
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    console.log("submitted");

    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;

    //field validation
    const validatedFields = schema.safeParse({file});

    if(!validatedFields.success){
        toast.error('Something Went wrong', {
          description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid File'
        })
        return;
    }

    toast.info("Uploading PDF", {
      description: 'Hang Tight! We are uploading your PDF'
    })
    
    //upload file to uploadThing
     const respose = await startUpload([file]);
     if(!respose){
      toast.error('Something Went Wrong', {
        description: 'Use a different file'
      })
      return;
     }
    
    toast.info("PDF is processing", {
      description: 'Hang Tight! Our AI is processing the document'
    })

    //parse the pdf using Lang Chain
    //summarize the  pdf using AI
    //save the summary to db
    //redirect to the [id] summary page


  }  
    
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
        <UploadFormInput onSubmit={handleSubmit}/>
    </div>
  )
}

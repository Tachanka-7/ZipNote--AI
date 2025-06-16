'use client'

import { z } from "zod";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast, useSonner } from "sonner"
import { generatePdfSummary } from "@/actions/upload-actions";
import { useRef, useState } from "react";

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
  const [isLoading,setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null)

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

    try {
      setIsLoading(true);
      

      const formData = new FormData(e.currentTarget);
      const file = formData.get('file') as File;

      //field validation
      const validatedFields = schema.safeParse({file});

      if(!validatedFields.success){
          toast.error('Something Went wrong', {
            description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid File'
          })
          setIsLoading(false);
          return;
      }

      toast.info("Uploading PDF", {
        description: 'Hang Tight! We are uploading your PDF'
      })
      
      //upload file to uploadThing
      const response = await startUpload([file]);
      if(!response){
      toast.error('Something Went Wrong', {
        description: 'Use a different file'
      })
        setIsLoading(false);
      return;
      }
      
      toast.info("PDF is processing", {
        description: 'Hang Tight! Our AI is processing the document'
      })

      //parse the pdf using Lang Chain

      const result = await generatePdfSummary(response);
      console.log({result}); 

      const {data = null, message=null} = result || {};
      
      
      if(data){
        toast.info("Saving PDF", {
        description: 'Hang Tight! We are saving your summary'
      });
      
      formRef.current?.reset();
        // if(data.summary){
        //save the summary to db
        // }


      }
      //summarize the  pdf using AI
      //redirect to the [id] summary page

    } catch (error) {
      setIsLoading(false);
      console.error('Error Occured',error)
      
      formRef.current?.reset(); 
    }   
  }  
    
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
        <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit}/>
    </div>
  )
}

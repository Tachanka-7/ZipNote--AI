'use client'

import { z } from "zod";
import UploadFormInput from "./upload-form-input";

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
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    console.log("submitted");

    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;

    //field validation
    const validatedFields = schema.safeParse({file});

    if(!validatedFields.success){
        console.log(
            validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid File'
        ); 
        return;
    }



  }  
    
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
        <UploadFormInput onSubmit={handleSubmit}/>
    </div>
  )
}

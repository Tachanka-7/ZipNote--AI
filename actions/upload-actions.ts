'use server'

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

export async function generatePdfSummary(uploadResponse: [{
    serverData : {
        userId:string;
        file: {
            url: string;
            name: string;
        }
    }
}]) {
    if(!uploadResponse){
        return {
            success: false,
            message: 'File Upload Failed',
            data: null,
        }
    }

    const {serverData : {userId, file : {url: pdfUrl, name: fileName}}} = uploadResponse[0]

    if(!pdfUrl){
        return {
            success: false,
            message: 'File Upload Failed',
            data: null,
        };        
    }

    try {
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        console.log({pdfText})

        let summary;

        try {
            summary = await generateSummaryFromOpenAI(pdfText);
            
            console.log(summary);

        } catch (error) {
            console.log(error);
        }

        if(!summary){
            return {
            success: false,
            message: 'Failed to Generate Summary',
            data: null,
        }; 
        }

    } catch (error) {
        return {
            success: false,
            message: 'File Upload Failed',
            data: null,
        }        
    }
}
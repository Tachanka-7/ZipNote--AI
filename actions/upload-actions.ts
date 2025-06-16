'use server'

import { generateSummaryFromGemini } from "@/lib/gemini-ai";
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
            console.log({summary});

        } catch (error) {
            console.log(error);

            if(error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED'){
                try {
                    summary = await generateSummaryFromGemini(pdfText);
                } catch (geminiError) {
                    console.error('Gemini AI failed after OpenAI quota exceeded')
                    throw new Error('Failed to generate summary with available AI providers')
                }
                
            }
        }

        if(!summary){
            return {
            success: false,
            message: 'Failed to Generate Summary',
            data: null,
            }; 
        }

        return {
            success: true, 
            messsage: 'Summary generated Successfully',
            data: {
                summary,
            }
        }

    } catch (error) {
        return {
            success: false,
            message: 'File Upload Failed',
            data: null,
        }        
    }
}
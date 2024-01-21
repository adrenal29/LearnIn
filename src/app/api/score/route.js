import { connectToDB } from '@/lib/mongoose';
import language from '@/lib/models/language.model';
import { NextResponse } from 'next/server';

export const POST = async (req, res) => {
    await connectToDB();
    try {
        const { name, username, score } =await req.json();
        console.log(name)
        // Find the document by name in the "language" collection
        const languageDoc = await language.findOne({ name });
        console.log(languageDoc)
        if (!languageDoc) {
            // If the document does not exist, create a new one
            // const newLanguageDoc = new language({
            //     name,
            //     scores: [{ username, score }],
            // });

            // await newLanguageDoc.save();
            return NextResponse.json('ms');
        } else {
            // If the document exists, update the scores array
            languageDoc.scores.push({ username, score });
            const updatedLanguageDoc = await languageDoc.save();
            return NextResponse.json(updatedLanguageDoc);
        }
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
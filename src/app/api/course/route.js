import { connectToDB } from '@/lib/mongoose';
import language from '@/lib/models/language.model'
import { NextResponse } from 'next/server';
export const POST = async (req, res) => {
    await connectToDB();

}

export const GET = async (req, res) => {
    await connectToDB();
    try {
        const {searchParams} = new URL(req.url);
        const lang = searchParams.get("lang")
        const languageData = await language.findOne({ name: lang });

        if (!languageData) {
            return NextResponse.json({ error: 'Language not found' });
        }
        const questions = languageData.questions;
        console.log(questions)
        return NextResponse.json({questions:questions});
    }
    catch (err) {
        console.log(err)
        return NextResponse.json(err);
    }
}
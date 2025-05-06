// app/api/quiz/route.js ou app/api/quiz/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ajustez le chemin selon votre structure

export async function GET() {
  try {
    // Récupérer toutes les questions avec leurs options
    const questions = await prisma.question.findMany({
      include: {
        options: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    // Log pour déboguer les questions récupérées
    console.log('Questions récupérées:', JSON.stringify(questions, null, 2));

    // Vérifiez que toutes les questions ont bien des options
    const questionsWithNoOptions = questions.filter(q => !q.options || q.options.length === 0);
    if (questionsWithNoOptions.length > 0) {
      console.warn('Questions sans options:', questionsWithNoOptions);
    }

    // Vérifiez la validité des nextQuestionId
    const questionIds = new Set(questions.map(q => q.id));
    const invalidNextQuestionIds = [];
    
    questions.forEach(q => {
      q.options.forEach(option => {
        if (option.nextQuestionId !== null && !questionIds.has(option.nextQuestionId)) {
          invalidNextQuestionIds.push({
            questionId: q.id,
            optionId: option.id,
            nextQuestionId: option.nextQuestionId
          });
        }
      });
    });
    
    if (invalidNextQuestionIds.length > 0) {
      console.warn('Options avec nextQuestionId invalides:', invalidNextQuestionIds);
    }

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Erreur lors de la récupération des questions:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des questions' },
      { status: 500 }
    );
  }
}
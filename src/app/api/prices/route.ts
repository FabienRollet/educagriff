import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// GET /api/prices
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const animalType = searchParams.get('animalType');

    const where: Prisma.PriceWhereInput = {};
    if (animalType) {
      where.animalType = animalType as 'CAT' | 'DOG';
    }

    const prices = await prisma.price.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { order: 'asc' }
      ]
    });

    return NextResponse.json(prices);
  } catch (error) {
    console.error('Erreur lors de la récupération des prix:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des prix' },
      { status: 500 }
    );
  }
}

// POST /api/prices
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const price = await prisma.price.create({
      data: {
        ...body,
        animalType: body.animalType as 'CAT' | 'DOG'
      }
    });
    return NextResponse.json(price);
  } catch (error) {
    console.error('Erreur lors de la création du prix:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du prix' },
      { status: 500 }
    );
  }
}

// DELETE /api/prices/[id]
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID manquant' },
        { status: 400 }
      );
    }

    await prisma.price.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'Prix supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du prix:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du prix' },
      { status: 500 }
    );
  }
} 
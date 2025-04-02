import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/prices
export async function GET() {
  try {
    const prices = await prisma.price.findMany();
    return NextResponse.json(prices);
  } catch (error: Error | unknown) {
    console.error('Erreur lors de la récupération des prix:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des prix' }, { status: 500 });
  }
}

// POST /api/prices
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const price = await prisma.price.create({
      data: {
        productName: body.productName,
        price: body.price,
        currency: body.currency,
        description: body.description,
        category: body.category,
        animalType: body.animalType,
      },
    });
    return NextResponse.json(price);
  } catch (error: Error | unknown) {
    console.error('Erreur lors de la création du prix:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du prix' }, { status: 500 });
  }
}

// DELETE /api/prices/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    await prisma.price.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Prix supprimé avec succès' });
  } catch (error: Error | unknown) {
    console.error('Erreur lors de la suppression du prix:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression du prix' }, { status: 500 });
  }
} 
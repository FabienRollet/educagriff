import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// GET /api/prices/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const price = await prisma.price.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!price) {
      return NextResponse.json({ error: 'Prix non trouvé' }, { status: 404 });
    }
    return NextResponse.json(price);
  } catch (error: Error | unknown) {
    console.error('Erreur lors de la récupération du prix:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération du prix' }, { status: 500 });
  }
}

// PUT /api/prices/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const price = await prisma.price.update({
      where: { id: parseInt(params.id) },
      data: {
        productName: body.productName,
        price: body.price,
        currency: body.currency,
        description: body.description,
        category: body.category,
        animalType: body.animalType as 'CAT' | 'DOG',
        order: body.order
      } as Prisma.PriceUpdateInput,
    });
    return NextResponse.json(price);
  } catch (error: Error | unknown) {
    console.error('Erreur lors de la mise à jour du prix:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du prix' }, { status: 500 });
  }
}

// DELETE /api/prices/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.price.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ message: 'Prix supprimé avec succès' });
  } catch (error: Error | unknown) {
    console.error('Erreur lors de la suppression du prix:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression du prix' }, { status: 500 });
  }
} 
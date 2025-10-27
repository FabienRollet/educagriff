const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function setupAdmin() {
  const password = process.argv[2] || 'admin123';
  
  if (password.length < 6) {
    console.log('Le mot de passe doit contenir au moins 6 caractères');
    process.exit(1);
  }
  
  try {
    console.log('🔧 Configuration de l\'administrateur...');
    console.log('Mot de passe:', password);
    
    // Hasher le mot de passe
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Vérifier s'il y a déjà un admin
    const existingAdmin = await prisma.admin.findFirst();
    
    if (existingAdmin) {
      // Mettre à jour l'admin existant
      await prisma.admin.update({
        where: { id: existingAdmin.id },
        data: { passwordHash }
      });
      console.log('✅ Mot de passe administrateur mis à jour');
    } else {
      // Créer un nouvel admin
      await prisma.admin.create({
        data: { passwordHash }
      });
      console.log('✅ Administrateur créé avec succès');
    }
    
    console.log('🎉 Configuration terminée !');
    console.log('Vous pouvez maintenant vous connecter avec le mot de passe:', password);
    
  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupAdmin();

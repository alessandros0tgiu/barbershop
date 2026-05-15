const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const services = [
    { name: "Taglio Capelli", price: 25.0, duration: 30 },
    { name: "Barba", price: 15.0, duration: 20 },
    { name: "Taglio + Barba", price: 35.0, duration: 50 },
    { name: "Sfumatura Skin Fade", price: 30.0, duration: 45 },
  ];

  for (const service of services) {
    await prisma.service.create({
      data: service,
    });
  }
  console.log("Servizi inseriti con successo!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({});

async function main() {
  await prisma.movie.deleteMany();

  await prisma.movie.createMany({
    data: [
      {
        title: "Attack on Titan",
        description: "After his hometown is destroyed and his mother is killed, young Eren Yeager vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.",
        image: "aot.png",
        videoUrl: "https://www.youtube.com/embed/MGRm4IzK1SQ"
      },
      {
        title: "Naruto Shippuden",
        description: "Naruto Uzumaki is a loud, hyperactive ninja who constantly searches for approval and recognition.",
        image: "naruto.jpg",
        videoUrl: "https://www.youtube.com/embed/-G9BqkgZXUk" 
      },
      {
        title: "Dragon Ball Super",
        description: "Goku and his friends defend the Earth against an assortment of villains.",
        image: "dbs.png",
        videoUrl: "https://www.youtube.com/embed/-EolXoH_eWA"
      },
      {
        title: "Your Name",
        description: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies.",
        image: "yourname.jpg",
        videoUrl: "https://www.youtube.com/embed/xU47nhruN-Q"
      },
      {
        title: "Death Note",
        description: "A student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone.",
        image: "deathnote.png", 
        videoUrl: "https://www.youtube.com/embed/NlJZ-YgSqao"
      },
      {
        title: "Demon Slayer",
        description: "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko.",
        image: "demonslayer.png",
        videoUrl: "https://www.youtube.com/embed/VQGCKyvncas"
      },
      {
        title: "Chhota Bheem",
        description: "An adventurous and fun-loving boy, Bheem, along with his friends, protects his town of Dholakpur from evil forces and helps people in need.",
        image: "chhotabheem.png",
        videoUrl: "https://www.youtube.com/embed/qF-u0Y6xTns"
      }
    ]
  });
  
  await prisma.user.deleteMany();
  const bcrypt = require('bcrypt');
  const hashed = await bcrypt.hash('admin', 10);
  await prisma.user.create({
    data: {
      email: 'admin@anicart.com',
      name: 'Admin',
      password: hashed,
      role: 'admin'
    }
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

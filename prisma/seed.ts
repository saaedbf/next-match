import { PrismaClient } from "@prisma/client";
import { membersData } from "./membersData";
import { hash } from "bcryptjs";
const prisma = new PrismaClient();
async function seedMembers() {
  return membersData.map(async (member) =>
    prisma.user.create({
      data: {
        hashPassword: await hash("123456", 10),
        image: member.image,
        name: member.name,
        email: member.email,
        member: {
          create: {
            city: member.city,
            country: member.country,
            dateOfBirth: new Date(member.dateOfBirth),
            description: member.description,
            gender: member.gender,
            name: member.name,
            created: new Date(member.created),
            updated: new Date(member.lastActive),
            image: member.image,
            photos: {
              create: {
                url: member.image,
              },
            },
          },
        },
      },
    }),
  );
}
async function main() {
  await seedMembers();
}
main()
  .catch((error) => {
    console.log(error);
    process.exit(0);
  })
  .finally(async () => await prisma.$disconnect());

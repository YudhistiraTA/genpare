import prisma from "@/prisma/config"
import { Language } from "@prisma/client";

export async function fetchLanguageStats() {
  const result: {language: Language, count: number}[] = await prisma.$queryRaw`
    SELECT 
      l1.language, 
      (SELECT COUNT(*) FROM "Lyrics" WHERE language = 'japanese') - l1._count AS count
    FROM 
      (SELECT language, COUNT(*) AS _count FROM "Lyrics" GROUP BY language) AS l1
  `;
  return result;
}
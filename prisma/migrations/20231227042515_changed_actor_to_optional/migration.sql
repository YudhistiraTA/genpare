-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_circleId_fkey";

-- DropForeignKey
ALTER TABLE "Lyrics" DROP CONSTRAINT "Lyrics_creator_id_fkey";

-- AlterTable
ALTER TABLE "Album" ALTER COLUMN "circleId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Lyrics" ALTER COLUMN "creator_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "Actor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lyrics" ADD CONSTRAINT "Lyrics_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Actor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

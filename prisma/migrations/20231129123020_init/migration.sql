-- CreateEnum
CREATE TYPE "Role" AS ENUM ('vocalist', 'translator', 'composer', 'lyricist', 'circle');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('japanese', 'romaji', 'english', 'french', 'spanish');

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "release_year" INTEGER NOT NULL,
    "total_track" INTEGER NOT NULL,
    "circleId" TEXT NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "youtube_id" TEXT NOT NULL,
    "track_no" INTEGER NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lyrics" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "language" "Language" NOT NULL,
    "songId" TEXT,

    CONSTRAINT "Lyrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_vocal_song" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_composed_song" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Album_name_key" ON "Album"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Album_slug_key" ON "Album"("slug");

-- CreateIndex
CREATE INDEX "Album_id_idx" ON "Album" USING HASH ("id");

-- CreateIndex
CREATE INDEX "Album_slug_idx" ON "Album" USING HASH ("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_name_key" ON "Actor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_slug_key" ON "Actor"("slug");

-- CreateIndex
CREATE INDEX "Actor_id_idx" ON "Actor" USING HASH ("id");

-- CreateIndex
CREATE INDEX "Actor_slug_idx" ON "Actor" USING HASH ("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Song_slug_key" ON "Song"("slug");

-- CreateIndex
CREATE INDEX "Song_id_idx" ON "Song" USING HASH ("id");

-- CreateIndex
CREATE INDEX "Song_slug_idx" ON "Song" USING HASH ("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Lyrics_language_songId_key" ON "Lyrics"("language", "songId");

-- CreateIndex
CREATE UNIQUE INDEX "_vocal_song_AB_unique" ON "_vocal_song"("A", "B");

-- CreateIndex
CREATE INDEX "_vocal_song_B_index" ON "_vocal_song"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_composed_song_AB_unique" ON "_composed_song"("A", "B");

-- CreateIndex
CREATE INDEX "_composed_song_B_index" ON "_composed_song"("B");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lyrics" ADD CONSTRAINT "Lyrics_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lyrics" ADD CONSTRAINT "Lyrics_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_vocal_song" ADD CONSTRAINT "_vocal_song_A_fkey" FOREIGN KEY ("A") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_vocal_song" ADD CONSTRAINT "_vocal_song_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_composed_song" ADD CONSTRAINT "_composed_song_A_fkey" FOREIGN KEY ("A") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_composed_song" ADD CONSTRAINT "_composed_song_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

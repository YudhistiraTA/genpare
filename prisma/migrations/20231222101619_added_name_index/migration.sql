-- CreateIndex
CREATE INDEX "Actor_name_idx" ON "Actor" USING HASH ("name");

-- CreateIndex
CREATE INDEX "Album_name_idx" ON "Album" USING HASH ("name");

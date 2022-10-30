-- CreateTable
CREATE TABLE "Chapter" (
    "year" INTEGER NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("year")
);

-- AddForeignKey
ALTER TABLE "Tenure" ADD CONSTRAINT "Tenure_startYear_fkey" FOREIGN KEY ("startYear") REFERENCES "Chapter"("year") ON DELETE RESTRICT ON UPDATE CASCADE;

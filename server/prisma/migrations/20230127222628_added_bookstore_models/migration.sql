-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "descriptino" TEXT NOT NULL,
    "published" INTEGER NOT NULL,
    "ISBN" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "publisherId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Publisher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "BookReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rate" INTEGER NOT NULL DEFAULT 1,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_id_key" ON "Book"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_id_key" ON "Publisher"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_name_key" ON "Publisher"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Language_id_key" ON "Language"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BookReview_id_key" ON "BookReview"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Author_id_key" ON "Author"("id");

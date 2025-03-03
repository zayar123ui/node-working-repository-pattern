-- CreateTable
CREATE TABLE "m_users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "m_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "m_users_username_key" ON "m_users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "m_users_email_key" ON "m_users"("email");

import { PrismaClient } from "@prisma/client";
import express, { Request, Response, Router } from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes/router";

export const prisma = new PrismaClient();
prisma.$connect();

const app = express();
const apiRouter = Router();
app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://dev.bettainventory.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Accept-Version",
      "Authorization",
      "Credentials",
      "Content-Type",
      "Accept-Language",
    ],
    credentials: true,
  })
);

require("dotenv").config();
app.use(express.json({ limit: "300mb" }));
app.use(express.urlencoded({ limit: "300mb", extended: true }));
app.use(cookieParser());

apiRouter.get("/", (req: Request, res: Response) => {
  res.send({ message: "Phoo Zar APIs are up and running!!!" });
});
apiRouter.use("/api", router);
app.use("/v1", apiRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

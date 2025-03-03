import { Request, Response } from "express";

import { response } from "../common/response";
import createClient from "../services/appwrite.service";
import { Account, Client, ID, OAuthProvider } from "node-appwrite";
import { AppwriteType } from "../enums/appwrite.enum";
import { prisma } from "../..";
import User from "../../repository/user";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email } = req.body;

  const user = await User.create({
    username,
    email,
  });

  return response.success(res, 200, "User created", {
    user,
  });
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    return response.success(res, 200, "User information", {
      user,
    });
  } catch (error: any) {
    console.log(error);
  }
};

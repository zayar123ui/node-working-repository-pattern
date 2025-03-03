import { Request, Response } from "express";

import { response } from "../common/response";
import createClient from "../services/appwrite.service";
import { Account, Client, ID, OAuthProvider } from "node-appwrite";
import { AppwriteType } from "../enums/appwrite.enum";

export const whoAmI = async (req: Request, res: Response): Promise<void> => {
  try {
    const session = req.cookies.session;
    if (!session) {
      return response.fail(res, 401, "Unauthorized");
    }

    const appwrite = await createClient(AppwriteType.SESSION, session);
    const client = appwrite as Client;
    const account = new Account(client);

    const user = await account.get();

    return response.success(res, 200, "User information", {
      user,
    });
  } catch (error: any) {
    console.log(error);
  }
};

export const googleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appwrite = await createClient(AppwriteType.ADMIN);
    const client = appwrite as Client;
    const account = new Account(client);

    const redirectUrl = await account.createOAuth2Token(
      OAuthProvider.Google,
      "http://localhost:5000/v1/api/auth/google/success",
      "http://localhost:5000/v1/api/auth/google/failure"
    );

    return response.success(res, 200, "Login successful", {
      redirectUrl,
    });
  } catch (error: any) {
    console.log(error);
  }
};

export const googleSuccess = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, secret } = req.query;

  const appwrite = await createClient(AppwriteType.ADMIN);
  const client = appwrite as Client;
  const account = new Account(client);

  const session = await account.createSession(
    userId as string,
    secret as string
  );

  res.cookie("session", session.secret, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60, // 1 hour
    sameSite: "strict",
    path: "/",
  });

  return response.success(res, 200, "Login successful", {
    message: "Login successful",
  });
};

export const googleFailure = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.query);
  return response.fail(res, 400, "Login failed");
};

export const phoneNumberLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const client = new Client()
    .setEndpoint("http://appwrite.exbrainedu.com/v1")
    .setProject("67a2f5f20010029ba865");

  const account = new Account(client);

  const token = await account.createPhoneToken(ID.unique(), "+660968157928");

  const userId = token.userId;

  return response.success(res, 200, "Login successful", {
    userId,
  });
};

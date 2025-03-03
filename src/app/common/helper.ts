import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import axios from "axios";
import {
  TokenPayload,
  TokenPayloadInstance,
} from "../instances/auth/token_payload.instance";
const nodemailer = require("nodemailer");
export const helper = {
  generateToken: async (
    payload: TokenPayload,
    expiresIn: string | number = "30d"
  ) => {
    return jwt.sign(payload, process.env.JWT_SECRET || "", {
      expiresIn: expiresIn,
    });
  },
  verifyToken: async (token: string): Promise<TokenPayload> => {
    return jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as TokenPayloadInstance;
  },
  generateResetPasswordToken: async (
    payload: TokenPayload
  ): Promise<string> => {
    return jwt.sign(payload, process.env.RESET_PASSWORD_SECRET || "", {
      expiresIn: 3600,
    });
  },
  hashPassword: async (password: string) => {
    return bcrypt.hash(password, 10);
  },
  verifyPassword: async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
  },
  logoutToken: async (payload: TokenPayload): Promise<string> => {
    const logoutToken = await helper.generateToken(payload, 0);
    return logoutToken;
  },
  serialize: async (data: any[]): Promise<any> => {
    const serialized = JSON.parse(JSON.stringify(data));
    const convertBigIntToNumber = (obj: any): any => {
      if (Array.isArray(obj)) {
        return obj.map((item) => convertBigIntToNumber(item));
      }

      if (typeof obj === "object" && obj !== null) {
        const converted: any = {};
        for (const key in obj) {
          if (typeof obj[key] === "bigint") {
            converted[key] = Number(obj[key]);
          } else if (typeof obj[key] === "object") {
            converted[key] = convertBigIntToNumber(obj[key]);
          } else {
            converted[key] = obj[key];
          }
        }
        return converted;
      }

      return obj;
    };

    return convertBigIntToNumber(serialized);
  },

  bigIntFormat: (data: any) => {
    const updatedData = JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? parseInt(value.toString()) : value
    );
    return JSON.parse(updatedData);
  },
  generateOTP: (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  },
  fetchAdminApi: async (url: string, body: any) => {
    const response = await fetch(`${process.env.ADMIN_API_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  },
  fetchSourceApi: async (url: string, token: string) => {
    const response = await fetch(`${process.env.ADMIN_API_URL}/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  },
};

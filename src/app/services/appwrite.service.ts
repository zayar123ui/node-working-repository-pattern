import { Client, Databases, Account } from "node-appwrite";
import dotenv from "dotenv";
import { AppwriteType } from "../enums/appwrite.enum";

dotenv.config();

const createClient = async (
  type: AppwriteType,
  session?: string
): Promise<Client | { account: Account; databases: Databases }> => {
  const { ENDPOINT, PROJECT_ID, API_KEY } = process.env;
  const client = new Client()

    .setEndpoint(ENDPOINT)

    .setProject(PROJECT_ID);

  if (type === AppwriteType.ADMIN) {
    return client.setKey(API_KEY);
  }

  if (type === AppwriteType.PHONE_NUMBER) {
    return client.setKey(API_KEY);
  }

  if (type === AppwriteType.SESSION && session) {
     return client.setSession(session);
  }



  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};
export default createClient;

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string);
const db = client.db('hireloopdb');

// Roles are defined by the HireLoop domain model (see AGENTS / product spec).
// Only "seeker" and "recruiter" may be self-selected at sign-up; "admin" is
// assigned manually in the database. The database hook below enforces this so
// a client can never escalate itself to admin even if it sends role: "admin".
export const HIRELOOP_ROLES = ["seeker", "recruiter", "admin"] as const;
export type HireloopRole = (typeof HIRELOOP_ROLES)[number];

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "seeker",
                input: true,
            },
        },
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    const allowed = ["seeker", "recruiter", "admin"];
                    const role = allowed.includes((user as { role?: string }).role ?? "")
                        ? (user as { role?: string }).role
                        : "seeker";
                    return { data: { ...user, role } };
                },
            },
        },
    },
    // Google sign-in is only registered when credentials exist, so the app
    // keeps starting (and email/password keeps working) without them.
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
        ? {
              socialProviders: {
                  google: {
                      clientId: process.env.GOOGLE_CLIENT_ID,
                      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                  },
              },
          }
        : {}),
});
// src/pages/api/save-token.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { token } = req.body;
    console.log("Token received:", token);
    // Save the token to your database
    res.status(200).json({ message: "Token saved successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
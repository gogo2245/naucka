import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../database/users";
import bcrypt from "bcrypt";
import { registerSchema } from "@/schemas/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(404).json({ message: "Not Found" });
    return;
  }
  // Kontrola ci request je validny
  let body;
  try {
    body = await registerSchema.validate(req.body, {
      strict: true,
      abortEarly: false,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(400).json({ message: "Invalid request body", error: e.errors });
    return;
  }
  // kontrola ci email nie je pouzity
  if ((await User.findAll({ where: { email: body.email } })).length) {
    res.status(400).json({ message: "Email already in use" });
    return;
  }
  // vytvor uzivatela
  await User.build({
    email: body.email,
    passwordHash: bcrypt.hashSync(body.password, 10),
  }).save();

  res.status(201).json({ message: "User successfully created" });
}

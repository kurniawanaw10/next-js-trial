// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

type Data = {
  data: {
    id: string;
    name: string;
    phone: string;
    adress: string;
    createdAt: Date;
  }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const data = await prisma.contact.findMany();
  res.status(200).json({ data });
}

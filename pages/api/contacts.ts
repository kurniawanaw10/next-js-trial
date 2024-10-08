import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

// Tipe respons untuk data
type Data = {
  data: {
    id: string;
    name: string;
    phone: string;
    adress: string;
    createdAt: Date;
  }[];
};

// Fungsi utama handler API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Jika request adalah GET
    try {
      const data = await prisma.contact.findMany();
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  } else if (req.method === "POST") {
    // Jika request adalah POST
    try {
      const { name, phone, adress } = req.body;

      // Validasi input (opsional)
      if (!name || !phone || !adress) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newContact = await prisma.contact.create({
        data: {
          name,
          phone,
          adress,
        },
      });

      res.status(201).json({ data: newContact });
    } catch (error) {
      res.status(500).json({ error: "Failed to create contact" });
    }
  } else if (req.method === "PUT") {
    // Jika request adalah PUT (Update)
    try {
      const { id, name, phone, adress } = req.body;

      // Validasi input (opsional)
      if (!id || !name || !phone || !adress) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const updatedContact = await prisma.contact.update({
        where: { id: String(id) },
        data: {
          name,
          phone,
          adress,
        },
      });

      res.status(200).json({ data: updatedContact });
    } catch (error) {
      res.status(500).json({ error: "Failed to update contact" });
    }
  } else if (req.method === "DELETE") {
    // Jika request adalah DELETE
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      await prisma.contact.delete({
        where: { id: String(id) },
      });

      res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete contact" });
    }
  } else {
    // Jika metode lain (selain GET dan POST)
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

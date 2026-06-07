import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { saveBase64Image, deleteImage } from "@/lib/upload";
import { GraphQLContext } from "@/types";

export const resolvers = {
  Query: {
    students: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
      if (!ctx.userId) throw new Error("Unauthorized");
      return prisma.student.findMany({ orderBy: { createdAt: "desc" } });
    },
    student: async (_: unknown, { id }: { id: string }, ctx: GraphQLContext) => {
      if (!ctx.userId) throw new Error("Unauthorized");
      return prisma.student.findUnique({ where: { id: parseInt(id) } });
    },
    me: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
      if (!ctx.userId) return null;
      return prisma.user.findUnique({
        where: { id: ctx.userId },
        select: { id: true, name: true, email: true },
      });
    },
  },

  Mutation: {
    signup: async (
      _: unknown,
      { name, email, password }: { name: string; email: string; password: string }
    ) => {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) throw new Error("Email already in use");
      const hashed = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { name, email, password: hashed },
      });
      const token = signToken({ userId: user.id, email: user.email });
      return { token, user: { id: user.id, name: user.name, email: user.email } };
    },

    login: async (
      _: unknown,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error("Invalid credentials");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid credentials");
      const token = signToken({ userId: user.id, email: user.email });
      return { token, user: { id: user.id, name: user.name, email: user.email } };
    },

    createStudent: async (
      _: unknown,
      args: {
        name: string;
        email: string;
        age: number;
        department: string;
        image?: string;
      },
      ctx: GraphQLContext
    ) => {
      if (!ctx.userId) throw new Error("Unauthorized");
      let imagePath: string | undefined;
      if (args.image && args.image.startsWith("data:")) {
        imagePath = saveBase64Image(args.image);
      }
      return prisma.student.create({
        data: {
          name: args.name,
          email: args.email,
          age: args.age,
          department: args.department,
          image: imagePath,
        },
      });
    },

    updateStudent: async (
      _: unknown,
      args: {
        id: string;
        name?: string;
        email?: string;
        age?: number;
        department?: string;
        image?: string;
      },
      ctx: GraphQLContext
    ) => {
      if (!ctx.userId) throw new Error("Unauthorized");
      const existing = await prisma.student.findUnique({
        where: { id: parseInt(args.id) },
      });
      if (!existing) throw new Error("Student not found");

      let imagePath = existing.image ?? undefined;
      if (args.image && args.image.startsWith("data:")) {
        if (existing.image) deleteImage(existing.image);
        imagePath = saveBase64Image(args.image);
      }

      return prisma.student.update({
        where: { id: parseInt(args.id) },
        data: {
          ...(args.name && { name: args.name }),
          ...(args.email && { email: args.email }),
          ...(args.age && { age: args.age }),
          ...(args.department && { department: args.department }),
          image: imagePath,
        },
      });
    },

    deleteStudent: async (
      _: unknown,
      { id }: { id: string },
      ctx: GraphQLContext
    ) => {
      if (!ctx.userId) throw new Error("Unauthorized");
      const student = await prisma.student.findUnique({
        where: { id: parseInt(id) },
      });
      if (!student) throw new Error("Student not found");
      if (student.image) deleteImage(student.image);
      await prisma.student.delete({ where: { id: parseInt(id) } });
      return true;
    },
  },
};

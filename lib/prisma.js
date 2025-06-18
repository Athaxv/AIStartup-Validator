// lib/prisma.js
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis
globalForPrisma.prisma = globalForPrisma.prisma || new PrismaClient()

const prisma = globalForPrisma.prisma

export { prisma }

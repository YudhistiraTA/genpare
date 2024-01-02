'use server'
import { fetchActor } from "@/app/lib/api/cms/actor/fetchActor"
import prisma from "@/prisma/config"
import { revalidateTag } from "next/cache"

export async function deleteActor({id, name}: Awaited<ReturnType<typeof fetchActor>>){
  try {
    await prisma.$transaction(async (tx) => {
      await tx.actor.delete({ where: { id } })
      await tx.history.create({
        data: { message: `Deleted actor ${name}.` },
      })
    })
  } catch (error) {
    return { errors: {}, message: 'Internal Server Error' }
  }
  revalidateTag('actor')
  revalidateTag('history')
  return { message: 'Deleted actor.' }
}
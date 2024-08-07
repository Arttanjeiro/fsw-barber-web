import { BarberShopItemProps } from "@/components/barber-shop-item"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

interface BarberShopPageProps {
  params: {
    id: string
  }
}

async function getBarbeShopDetails(id: string) {
  const response = await api(`/barbershops/${id}`)
  const data = await response.json()

  return data.barbershop
}

export async function generateMetadata({
  params,
}: BarberShopPageProps): Promise<Metadata> {
  const barbershop = await getBarbeShopDetails(params.id)
  return {
    title: barbershop.name,
  }
}

export default async function BarberShpPage({ params }: BarberShopPageProps) {
  const barbershop: BarberShopItemProps = await getBarbeShopDetails(params.id)

  return (
    <main className="">
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbershop.name}
          src={barbershop.imageUrl}
          fill
          className="object-cover"
        />

        <Button
          asChild
          className="absolute left-4 top-4"
          size={"icon"}
          variant={"secondary"}
        >
          <Link href={"/"}>
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          asChild
          className="absolute right-4 top-4"
          size={"icon"}
          variant={"secondary"}
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-2 pb-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 (499 avaliação)</p>
        </div>
      </div>

      <div className="border-b border-solid p-5">
        <h3 className="mt-12 text-xs font-bold text-zinc-400">SOBRE NÓS</h3>
        <p className="mt-3 text-justify text-sm">{barbershop.description}</p>
      </div>
    </main>
  )
}

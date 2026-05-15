import { db } from "@/lib/db";
import Link from "next/link";

export default async function HomePage() {
  // Recuperiamo i servizi (Taglio, Barba, ecc.) dal DB
  const services = await db.service.findMany();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">BarberShop</h1>
        <Link href="/login" className="bg-black text-white px-4 py-2 rounded-md">
          Accedi
        </Link>
      </header>

      <section>
        <h2 className="text-2xl font-bold mb-6">I Nostri Servizi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.id} className="border p-5 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{service.name}</h3>
                  <p className="text-gray-500">{service.duration} minuti</p>
                </div>
                <span className="text-lg font-semibold text-green-700">{service.price}€</span>
              </div>
              <Link 
                href={`/book/${service.id}`}
                className="mt-4 block w-full text-center bg-gray-100 hover:bg-black hover:text-white py-2 rounded-lg font-medium transition"
              >
                Prenota ora
              </Link>
            </div>
          ))}
          {services.length === 0 && (
            <p className="text-gray-500">Nessun servizio disponibile. Aggiungine uno dal pannello!</p>
          )}
        </div>
      </section>
    </div>
  );
}
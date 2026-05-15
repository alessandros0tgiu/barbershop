"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SERVICES = [
  { id: 1, name: "Taglio Classic", price: 25, duration: 30 },
  { id: 2, name: "Modellatura Barba", price: 15, duration: 20 },
  { id: 3, name: "Taglio + Barba VIP", price: 40, duration: 60 },
];

const HOURS = ["09:00", "10:00", "11:00", "12:00", "15:00", "16:00", "17:00", "18:00"];

export default function DashboardPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loggedUser = localStorage.getItem("barber_user");
    if (!loggedUser) {
      router.push("/login");
    } else {
      setUser(loggedUser);
    }
  }, [router]);

  const handleBooking = () => {
    if (!selectedService || !selectedDate || !selectedHour) return;

    const newBooking = {
      user: user,
      service: SERVICES.find((s) => s.id === selectedService)?.name,
      date: selectedDate,
      hour: selectedHour,
    };

    // Salvataggio per l'Admin
    const existingBookings = JSON.parse(localStorage.getItem("all_bookings") || "[]");
    existingBookings.push(newBooking);
    localStorage.setItem("all_bookings", JSON.stringify(existingBookings));

    alert(`Ottimo! Appuntamento confermato per il ${selectedDate} alle ${selectedHour}`);

    // Reset campi
    setSelectedService(null);
    setSelectedDate("");
    setSelectedHour("");
  };

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <nav className="nav-bar">
        <h1 className="logo" style={{ fontSize: "1.5rem", margin: 0 }}>
          Barber<span className="gold-italic">Shop</span>
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("barber_user");
            router.push("/login");
          }}
          className="text-button"
          style={{ width: "auto", marginTop: 0 }}
        >
          Esci
        </button>
      </nav>

      <main style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", textTransform: "uppercase", marginBottom: "30px" }}>
          Prenota il tuo trattamento
        </h2>

        {/* STEP 1: SERVIZI */}
        <div className="service-grid">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelectedService(s.id)}
              className={`service-card ${selectedService === s.id ? "selected" : ""}`}
            >
              <div>
                <h3 style={{ margin: "0 0 5px 0", textTransform: "uppercase" }}>{s.name}</h3>
                <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.9rem" }}>{s.duration} min</p>
              </div>
              <span style={{ fontSize: "1.5rem", fontWeight: "900", color: "#c5a059" }}>{s.price}€</span>
            </div>
          ))}
        </div>

        {/* STEP 2: DATA E ORA */}
        {selectedService && (
          <div className="booking-section animate-fadeIn" style={{ marginTop: "40px" }}>
            <h3 className="form-title">Seleziona Data e Ora</h3>
            <input
              type="date"
              className="premium-input"
              style={{ marginBottom: "20px" }}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />

            <div className="hour-grid">
              {HOURS.map((h) => (
                <button
                  key={h}
                  onClick={() => setSelectedHour(h)}
                  className={`hour-pill ${selectedHour === h ? "selected" : ""}`}
                >
                  {h}
                </button>
              ))}
            </div>

            {selectedDate && selectedHour && (
              <button onClick={handleBooking} className="premium-button" style={{ marginTop: "30px" }}>
                Conferma Prenotazione
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Booking {
    user: string;
    service: string;
    date: string;
    hour: string;
}

export default function AdminDashboard() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [filterDate, setFilterDate] = useState(new Date().toISOString().split("T")[0]);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    // 1. Funzione per caricare i dati dal localStorage
    const loadBookings = useCallback(() => {
        const data = JSON.parse(localStorage.getItem("all_bookings") || "[]");
        setBookings(data);
    }, []);

    useEffect(() => {
        // CONTROLLO SICUREZZA
        const token = localStorage.getItem("admin_token");
        if (token !== "authenticated_barber") {
            router.push("/admin/login");
        } else {
            setIsAdmin(true);
            loadBookings();
        }

        // 2. TRUCCO EXTRA: Ascolta se vengono aggiunte prenotazioni da altri tab
        window.addEventListener("storage", loadBookings);
        return () => window.removeEventListener("storage", loadBookings);
    }, [router, loadBookings]);

    // 3. AGGIORNAMENTO DINAMICO: Ricarica i dati quando cambia la data selezionata
    useEffect(() => {
        if (isAdmin) {
            loadBookings();
        }
    }, [filterDate, isAdmin, loadBookings]);

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
    };

    const deleteBooking = (indexToDelete: number) => {
        if (confirm("Vuoi davvero eliminare questo appuntamento?")) {
            const updatedBookings = bookings.filter((_, index) => index !== indexToDelete);
            setBookings(updatedBookings);
            localStorage.setItem("all_bookings", JSON.stringify(updatedBookings));
        }
    };

    // Filtro locale basato sulla data scelta nel calendario
    const dailyBookings = bookings.filter(b => b.date === filterDate);

    if (!isAdmin) return null;

    return (
        <div className="dashboard-container">
            <nav className="nav-bar">
                <h1 className="logo" style={{ fontSize: '1.5rem', margin: 0 }}>
                    Admin<span className="gold-italic">Panel</span>
                </h1>
                <button onClick={handleLogout} className="text-button" style={{ width: 'auto', marginTop: 0 }}>
                    Esci Sessione
                </button>
            </nav>

            <main style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
                <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ textTransform: 'uppercase' }}>Agenda Appuntamenti</h2>
                    <div style={{ marginTop: '20px' }}>
                        <label style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                            Seleziona Giorno
                        </label>
                        <input
                            type="date"
                            className="premium-input"
                            style={{ maxWidth: '300px' }}
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                        />
                    </div>
                </header>

                <div className="booking-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {dailyBookings.length > 0 ? (
                        dailyBookings
                            .sort((a, b) => a.hour.localeCompare(b.hour))
                            .map((b, index) => (
                                <div key={index} className="service-card" style={{ cursor: 'default', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <span style={{ fontSize: '1.2rem', fontWeight: '900', color: '#c5a059', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '20px' }}>
                                            {b.hour}
                                        </span>
                                        <div>
                                            <h3 style={{ margin: '0', textTransform: 'uppercase', fontSize: '1rem' }}>{b.user}</h3>
                                            <p style={{ margin: '5px 0 0 0', color: '#94a3b8', fontSize: '0.8rem' }}>{b.service}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                        <span style={{ color: '#c5a059', fontWeight: 'bold', fontSize: '0.7rem', textTransform: 'uppercase' }}>
                                            Confermato
                                        </span>
                                        <button
                                            onClick={() => deleteBooking(index)}
                                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 'bold' }}
                                        >
                                            Elimina
                                        </button>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '50px' }}>Nessun appuntamento per questo giorno.</p>
                    )}
                </div>
            </main>
        </div>
    );
}
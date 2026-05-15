"use client";
import { useState } from "react";

const SERVICES = [
  { id: 1, name: "Taglio Classic", price: 25, duration: 30 },
  { id: 2, name: "Modellatura Barba", price: 15, duration: 20 },
  { id: 3, name: "Taglio + Barba VIP", price: 40, duration: 60 },
];

export default function Dashboard() {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("barber_user");
    window.location.reload();
  };

  return (
    <div className="dashboard-container">
      <nav className="nav-bar">
        <h1 className="logo" style={{fontSize: '1.5rem', margin: 0}}>
          Barber<span className="gold-italic">Shop</span>
        </h1>
        <button onClick={handleLogout} className="text-button" style={{width: 'auto', marginTop: 0}}>
          Esci
        </button>
      </nav>

      <main style={{padding: '60px 20px'}}>
        <h2 style={{textAlign: 'center', textTransform: 'uppercase', marginBottom: '40px'}}>
          I Nostri Servizi
        </h2>
        
        <div className="service-grid">
          {SERVICES.map((s) => (
            <div 
              key={s.id}
              onClick={() => setSelectedService(s.id)}
              className={`service-card ${selectedService === s.id ? 'selected' : ''}`}
            >
              <div>
                <h3 style={{margin: '0 0 5px 0', textTransform: 'uppercase'}}>{s.name}</h3>
                <p style={{margin: 0, color: '#94a3b8', fontSize: '0.9rem'}}>{s.duration} min</p>
              </div>
              <span style={{fontSize: '1.5rem', fontWeight: '900', color: '#c5a059'}}>{s.price}€</span>
            </div>
          ))}

          {selectedService && (
            <button className="premium-button" style={{marginTop: '20px'}}>
              Scegli Data e Ora
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
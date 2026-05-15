"use client";
import { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";

export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("barber_user");
    if (user) setIsLoggedIn(true);
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const storedUsers = JSON.parse(localStorage.getItem("registered_users") || "[]");

    if (isRegistering) {
      const userExists = storedUsers.find((u: any) => u.email === email);
      if (userExists) {
        setError("Email già registrata!");
      } else {
        storedUsers.push({ email, password });
        localStorage.setItem("registered_users", JSON.stringify(storedUsers));
        alert("Account creato con successo!");
        setIsRegistering(false);
      }
    } else {
      const validUser = storedUsers.find(
        (u: any) => u.email === email && u.password === password
      );
      if (validUser) {
        localStorage.setItem("barber_user", email);
        setIsLoggedIn(true);
      } else {
        setError("Account non registrato o dati errati!");
      }
    }
  };

  if (isLoggedIn) return <Dashboard />;

  return (
    <div className="page-container">
      <div className="premium-card">
        <div className="logo-section">
          <h1 className="logo">Barber<span className="gold-italic">Shop</span></h1>
          <p className="sub-logo">Sassari Luxury</p>
        </div>

        <form onSubmit={handleAuth} className="auth-form">
          <h3 className="form-title">
            {isRegistering ? "Nuovo Account" : "Accesso Clienti"}
          </h3>

          <input
            type="email"
            placeholder="Email"
            className="premium-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="premium-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="premium-button">
            {isRegistering ? "Crea Account ora" : "Entra nel Salone"}
          </button>
        </form>

        <button 
          onClick={() => { setIsRegistering(!isRegistering); setError(""); }}
          className="text-button"
        >
          {isRegistering ? "Hai già un account? Accedi qui" : "Primo appuntamento? Registrati ora"}
        </button>
      </div>
    </div>
  );
}
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const storedUsers = JSON.parse(localStorage.getItem("registered_users") || "[]");

    if (isRegistering) {
      if (storedUsers.find((u: any) => u.email === email)) {
        setError("Email già registrata!");
      } else {
        storedUsers.push({ email, password });
        localStorage.setItem("registered_users", JSON.stringify(storedUsers));
        alert("Account creato! Accedi ora.");
        setIsRegistering(false);
      }
    } else {
      const user = storedUsers.find((u: any) => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem("barber_user", email);
        router.push("/"); // Vai alla Dashboard
      } else {
        setError("Credenziali errate o account inesistente!");
      }
    }
  };

  return (
    <div className="page-container">
      <div className="premium-card">
        <h1 className="logo">Barber<span className="gold-italic">Shop</span></h1>
        <p className="sub-logo">Sassari Luxury</p>

        <form onSubmit={handleAuth} className="auth-form">
          <h3 className="form-title">{isRegistering ? "Registrazione" : "Accesso"}</h3>
          <input type="email" placeholder="Email" className="premium-input" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="premium-input" onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="premium-button">{isRegistering ? "Crea Account" : "Entra"}</button>
        </form>

        <button onClick={() => setIsRegistering(!isRegistering)} className="text-button">
          {isRegistering ? "Hai già un account? Accedi" : "Nuovo cliente? Registrati"}
        </button>
      </div>
    </div>
  );
}
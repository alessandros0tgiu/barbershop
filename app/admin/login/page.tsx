"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleAdminLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Credenziale fissa per il barbiere (Puoi cambiarla qui)
        const ADMIN_PASSWORD = "boss";

        if (password === ADMIN_PASSWORD) {
            localStorage.setItem("admin_token", "authenticated_barber");
            router.push("/admin"); // Vai alla dashboard admin
        } else {
            setError("Accesso negato. Password errata.");
        }
    };

    return (
        <div className="page-container">
            <div className="premium-card">
                <h1 className="logo">Admin<span className="gold-italic">Login</span></h1>
                <p className="sub-logo">Accesso riservato al personale</p>

                <form onSubmit={handleAdminLogin} className="auth-form">
                    <input
                        type="password"
                        placeholder="Password Segreta"
                        className="premium-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="premium-button">
                        Sblocca Agenda
                    </button>
                </form>

                <button onClick={() => router.push("/")} className="text-button">
                    Torna al sito pubblico
                </button>
            </div>
        </div>
    );
}
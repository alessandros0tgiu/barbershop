// "use client";
// import { useState, useEffect } from "react";
// import Dashboard from "@/components/Dashboard";

// export default function LoginPage() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const user = localStorage.getItem("barber_user");
//     if (user) setIsLoggedIn(true);
//   }, []);

//   const handleAuth = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     // Recuperiamo la lista degli utenti registrati dal "finto database" locale
//     const storedUsers = JSON.parse(localStorage.getItem("registered_users") || "[]");

//     if (isRegistering) {
//       // LOGICA DI REGISTRAZIONE
//       const userExists = storedUsers.find((u: any) => u.email === email);
      
//       if (userExists) {
//         setError("Questa email è già registrata. Vai al Login.");
//       } else {
//         const newUser = { email, password };
//         storedUsers.push(newUser);
//         localStorage.setItem("registered_users", JSON.stringify(storedUsers));
//         alert("Registrazione completata! Ora puoi accedere.");
//         setIsRegistering(false); // Torna al login dopo il successo
//       }
//     } else {
//       // LOGICA DI LOGIN (IL CONTROLLO CHE VOLEVI)
//       const validUser = storedUsers.find(
//         (u: any) => u.email === email && u.password === password
//       );

//       if (validUser) {
//         localStorage.setItem("barber_user", email);
//         setIsLoggedIn(true);
//       } else {
//         // Se l'utente non esiste o la password è sbagliata
//         setError("Credenziali non valide o account non registrato!");
//       }
//     }
//   };

//   if (isLoggedIn) return <Dashboard />;

//   return (
//     <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
//       <div className="max-w-md w-full premium-card p-10 rounded-[2.5rem] animate-premium">
//         <div className="text-center mb-8">
//           <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
//             Barber<span className="text-brand-gold italic">Shop</span>
//           </h2>
//           <p className="text-gray-500 text-[10px] mt-2 uppercase tracking-[0.3em]">Sassari Luxury</p>
//         </div>

//         <form onSubmit={handleAuth} className="space-y-4">
//           <h3 className="text-white text-center font-bold uppercase text-sm tracking-widest mb-4">
//             {isRegistering ? "Nuovo Account" : "Accesso Clienti"}
//           </h3>

//           <input
//             type="email"
//             placeholder="Email"
//             className="premium-input w-full"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="premium-input w-full"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           {error && (
//             <p className="text-red-500 text-[10px] font-bold uppercase text-center animate-pulse">
//               {error}
//             </p>
//           )}

//           <button type="submit" className="premium-button w-full mt-2">
//             {isRegistering ? "Crea Account ora" : "Entra nel Salone"}
//           </button>
//         </form>

//         <div className="mt-8 text-center">
//           <button 
//             onClick={() => { setIsRegistering(!isRegistering); setError(""); }}
//             className="text-[10px] text-gray-500 uppercase tracking-widest hover:text-brand-gold transition"
//           >
//             {isRegistering ? "Hai già un account? Accedi qui" : "Primo appuntamento? Registrati ora"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
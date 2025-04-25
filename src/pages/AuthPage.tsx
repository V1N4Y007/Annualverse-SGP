import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "../lib/firebaseConfig"; 
import { useNavigate } from "react-router-dom"; 

const auth = getAuth(app);
const db = getFirestore(app); 

export function AuthPage({ type }: { type: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (type === "signup") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date(),
          reports: [], 
        });

        console.log("User Signed Up & Data Stored:", user);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          console.log("User Data:", userDoc.data());
        } else {
          console.log("No user data found.");
        }
      }

      alert("Success! You are now logged in.");
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {type === "signup" ? "Create an Account" : "Welcome Back"}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
            {type === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          {type === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
          <a href={type === "signup" ? "/login" : "/signup"} className="text-blue-500">
            {type === "signup" ? "Login" : "Sign Up"}
          </a>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;

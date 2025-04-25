import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login successful!"); // Replace with actual login logic
    router.push("/dashboard"); // Redirect after login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <Card className="w-96 p-6 shadow-xl border dark:border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>
            <p className="text-sm text-muted-foreground">Sign in to continue</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <Input 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full">Sign In</Button>
            </form>

            <div className="flex items-center my-4">
              <Separator className="flex-1" />
              <span className="px-2 text-sm text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            {/* <div className="space-y-2">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <FcGoogle className="text-xl" /> Sign in with Google
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <FaGithub className="text-xl" /> Sign in with GitHub
              </Button>
            </div> */}

            <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
              Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;

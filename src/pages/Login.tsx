
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, store a simple flag in localStorage to indicate login status
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md bg-slate-800 border-purple-500/20">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Welcome Back
          </h1>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-900/50 border-purple-500/20"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-900/50 border-purple-500/20"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              Login
            </Button>
            <p className="text-sm text-slate-400 text-center">
              Don't have an account?{" "}
              <Button 
                variant="link" 
                className="text-purple-400 hover:text-purple-300 p-0"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;

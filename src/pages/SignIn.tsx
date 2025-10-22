import { Brain, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    // For now, just navigate to dashboard (auth integration later)
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold">MindFlow</span>
          </div>
          <Button 
            variant="outline" 
            className="border-border/50"
            onClick={() => navigate("/")}
          >
            Back
          </Button>
        </div>
      </header>

      {/* Sign In Form */}
      <div className="relative z-10 w-full max-w-md">
        <div className="relative p-12 rounded-[3rem] border border-border/50 bg-card/50 backdrop-blur-xl animate-scale-in">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Brain className="w-8 h-8 text-primary" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-center text-muted-foreground mb-8">
            Your thoughts, beautifully organized.
          </p>

          {/* Google Sign In */}
          <Button
            size="lg"
            className="w-full mb-4 bg-gradient-primary hover:opacity-90 transition-opacity"
            onClick={handleGoogleSignIn}
          >
            <Mail className="mr-2 w-5 h-5" />
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">or</span>
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email address"
                className="pl-12 h-12 bg-secondary/50 border-border/50 rounded-2xl focus:border-primary/50"
              />
            </div>

            <Button
              size="lg"
              variant="secondary"
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity text-primary-foreground"
              onClick={handleGoogleSignIn}
            >
              Continue
            </Button>
          </div>

          {/* Terms */}
          <p className="text-xs text-center text-muted-foreground mt-6">
            By continuing, you agree to our Terms and Privacy.
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl -z-10 animate-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl -z-10" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background -z-20" />
    </div>
  );
};

export default SignIn;

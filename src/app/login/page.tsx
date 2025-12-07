// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { getSession, signIn } from "next-auth/react";
// import { toast } from "sonner";
// import { GetServerSideProps } from "next";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     try {
//       setLoading(true);
//       const result = await signIn("credentials", {
//         redirect: false,
//         email,
//         password,
//       });
      
//       if (result?.error) {
//         if (result.error === "CredentialsSignin") {
//           toast.error("Invalid email or password. Please try again.");
//         } else {
//           toast.error(result.error || "Invalid credentials");
//         }
//         setLoading(false);
//       } else {
//         toast.success("Login successful!");
//         router.push("/dashboard");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("An unexpected error occurred");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-6">
//       <Card className="w-full max-w-md glass-card">
//         <CardHeader className="space-y-1 text-center">
//           <CardTitle className="text-2xl">Welcome back</CardTitle>
//           <CardDescription>
//             Enter your email to sign in to your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <Button className="w-full" type="submit" disabled={loading}>
//               {loading ? "Signing in..." : "Sign In"}
//             </Button>
//           </form>
//         </CardContent>
//         <CardFooter>
//           <div className="text-sm text-muted-foreground text-center w-full">
//             Don't have an account?{" "}
//             <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
//               Sign up
//             </Link>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);

//   if (session) {
//     return {
//       redirect: {
//         destination: '/dashboard',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {}
//   };
// };

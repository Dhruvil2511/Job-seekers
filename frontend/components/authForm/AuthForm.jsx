import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useToast } from "@/components/ui/use-toast";
// import { ToastAction } from "@radix-ui/react-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useState } from "react";
import { useToast } from "../ui/use-toast";

const AuthForm = ({ LoginOrRegister, closeDialog }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const { toast } = useToast();
  // console.log(email, password, username);

  const registerUser = async (e) => {
    e.preventDefault();

    setAuthLoading(true);
    try {
      //register user here

      setAuthLoading(false);
      closeDialog();
      toast({
        description: `Welcome!`,
        action: (
          <ToastAction altText="Close">
            close
          </ToastAction>
        ),
        duration: 5000,
      });
    } catch (err) {
      setAuthLoading(false);
      console.log(err.message);
      toast({
        description: err.message,
        action: (
          <ToastAction altText="Close">
            close
          </ToastAction>
        ),
        duration: 5000,
      });
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      //login user here
      setAuthLoading(false);
      closeDialog();
      toast({
        description: `Welcome!`,
        action: (
          <ToastAction altText="Close">
            close
          </ToastAction>
        ),
        duration: 5000,
      });
    } catch (err) {
      setAuthLoading(false);
      console.log(err);
      toast({
        description: err.message,
        action: (
          <ToastAction altText="Close">
            close
          </ToastAction>
        ),
        duration: 5000,
      });
    }
  };

  return (
    <Tabs defaultValue={LoginOrRegister} className="">
      <TabsList className="grid w-full grid-cols-2 mt-4">
        <TabsTrigger value="Login">Login</TabsTrigger>
        <TabsTrigger value="Register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="Login">
        <Card className="container border-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <>
              <form onSubmit={loginUser}>
                <div className="flex flex-col gap-4">
                  <div className=" flex flex-col gap-2">
                    <Label htmlFor="email">Email &gt;&gt;</Label>
                    <Input
                    required
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div className=" flex flex-col gap-2">
                    <Label htmlFor="password">Password &gt;&gt;</Label>
                    <Input
                    required
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      type="password"
                    />
                  </div>
                  <div className=" flex flex-col gap-2">
                    <Button
                      type="submit"
                      variant="outline"
                      className="mt-4 mb-4 w-full border-none"
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </form>
            </>
          </CardContent>
          <div className="relative mb-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
            </div>
          </div>
          <CardFooter>
            <div className="w-full mt-4 text-xs text-center  mb-2">
              {" "}
              Don't have an account?{" "}
              <TabsList className="">
                <TabsTrigger className="" value="Register">
                  Register
                </TabsTrigger>{" "}
              </TabsList>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="Register">
        <Card className="container border-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Register</CardTitle>
            <CardDescription className="text-center">
              Enter the required details below.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <>
              <form onSubmit={registerUser}>
                <div className="flex flex-col gap-4">
                  <div className=" flex flex-col gap-2">
                    <Label htmlFor="username">Username &gt;&gt;</Label>
                    <Input
                    required
                      onChange={(e) => setUsername(e.target.value)}
                      id="username"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div className=" flex flex-col gap-2">
                    <Label htmlFor="emailRegister">Email &gt;&gt;</Label>
                    <Input
                    required
                      onChange={(e) => setEmail(e.target.value)}
                      id="emailRegister"
                      type="email"
                      placeholder=""
                    />
                  </div>
                  <div className=" flex flex-col gap-2">
                    <Label htmlFor="passwordRegister">Password &gt;&gt;</Label>
                    <Input
                    required
                      onChange={(e) => setPassword(e.target.value)}
                      id="passwordRegister"
                      type="password"
                    />
                  </div>
                  <div className=" flex flex-col gap-2">
                    <Button
                      type="submit"
                      variant="outline"
                      className="mt-4 mb-4 w-full border-none"
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </form>
            </>
          </CardContent>
          <div className="relative mb-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
            </div>
          </div>
          <CardFooter>
            <div className="w-full mt-4 text-xs text-center  mb-2">
              {" "}
              Already have an account?{" "}
              <TabsList>
                <TabsTrigger value="Login">Login</TabsTrigger>{" "}
              </TabsList>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AuthForm;
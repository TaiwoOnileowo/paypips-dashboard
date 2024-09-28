"use client";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import React, { useState } from "react";
import { signInUser } from "@/lib/actions/user.actions";
import { toast } from "react-toastify";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useRouter } from "next/navigation";
const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password.toString().length < 8) {
      toast.error("Password must be more than 8 characters");
      return;
    }
    if (!email.toString().includes("@")) {
      toast.error("Invalid email");
      return;
    }
    setLoading(true);
    try {
      await signInUser(email, password);
      setLoading(false);
      toast.success("Sign in successful", {
        autoClose: 1000,
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong. Try again later.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-4 space-y-2 ">
        <Label text="Email" htmlFor="email" />
        <Input type="text" name="email" placeholder="Your email..." />
      </div>
      <div className="mt-4 space-y-2 ">
        <Label text="Password" htmlFor="Password" />
        <Input
          type="password"
          name="password"
          placeholder="Your Password..."
          className="placeholder:text-harsh/20"
        />
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <Switch id="remember-me" defaultChecked={true} />
        <Label htmlFor="remember-me" text="Remember Me" />
      </div>
      <button
        className="w-full flex items-center justify-center gap-5 bg-sharpBlue rounded-2xl  mt-8 text-sm uppercase font-bold font-plus p-3"
        type="submit"
      >
        Sign In{" "}
        {loading && (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        )}
      </button>
      <p className="mt-4 text-harsh text-sm flex justify-center w-full ">
        Don&apos;t have an account?{" "}
        <Link href={"/sign-up"} className="text-white cursor-pointer ml-1">
          {" "}
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;

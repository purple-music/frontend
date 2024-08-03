"use client";

import React from "react";
import { useFormState } from "react-dom";
import { registerUser } from "@/actions/actions";
import { InputField } from "@/ui/auth/input-field";
import RegisterForm from "@/ui/auth/register-form";

export default function Page() {
  return <RegisterForm />;
}

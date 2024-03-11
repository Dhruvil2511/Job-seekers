import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import AuthForm from "./AuthForm";

const LogIn_Register = ({onClose,LoginOrRegister}) => {
  return (
    <Dialog className=""  open={true} onOpenChange={onClose}>
      <DialogContent className="container max-w-sm md:max-w-md">
        <AuthForm LoginOrRegister={LoginOrRegister} closeDialog={onClose}/>
      </DialogContent>
    </Dialog>
  );
};

export default LogIn_Register;
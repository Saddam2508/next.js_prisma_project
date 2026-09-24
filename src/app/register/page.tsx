"use client"

import React, { FormEvent } from 'react'
import {Check, Envelope} from "@gravity-ui/icons";
import {Button, Input, Label, Modal, Surface, TextField} from "@heroui/react";
import { authClient } from '@/lib/auth-client';
const RegisterPage = () => {

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
   const objS =Object.fromEntries (formData);
    
   const {data, error} = await authClient.signUp.email({
    name: objS.name as string,
    email: objS.email as string,
    password: objS.password as string
   })
   console.log(data, error);
  };
    

  return (
    <div>
         <Modal>
      <Button variant="secondary">Open Contact Form</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Envelope className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Contact Us</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Fill out the form below and we ll get back to you. The modal adapts automatically
                when the keyboard appears on mobile.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  <TextField className="w-full" name="name" type="text" variant="secondary">
                    <Label>Name</Label>
                    <Input className="text-white" placeholder="Enter your name" />
                  </TextField>
                  <TextField className="w-full" name="email" type="email" variant="secondary">
                    <Label>Email</Label>
                    <Input placeholder="Enter your email" />
                  </TextField>
                  <TextField className="w-full" name="phone" type="tel" variant="secondary">
                    <Label>Phone</Label>
                    <Input className="text-white" placeholder="Enter your phone number" />
                  </TextField>
                  <TextField className="w-full" name="password" type="password" variant="secondary">
                    <Label>password</Label>
                    <Input className="text-white" placeholder="Enter your phone number" />
                  </TextField>
                    <Button type="submit" className="w-full">
            <Check />
            Submit
          </Button>
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button slot="close">Send Message</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
    
    </div>
  )
}

export default RegisterPage
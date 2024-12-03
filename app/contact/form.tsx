"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"
import ReCAPTCHA from "react-google-recaptcha"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50),
  email: z.string().email(),
  message: z
    .string()
    .min(2, {
      message: "Message must be at least 2 characters.",
    })
    .max(50),
})
const ContactForm = () => {
  const [captVal, setCaptVal] = useState<string | null>("")
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  const isFulFilled =
    form.watch("email") && form.watch("message") && form.watch("name")
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full grid-cols-1 gap-4 space-y-4 md:grid-cols-2 md:space-y-0"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Your name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Your email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Your message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="md:h-[150px]"
                  placeholder="Type your message here."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <div>
          <a></a>
          <Button
            disabled={!captVal || !isFulFilled}
            id="submit"
            className="w-full"
          >
            <EnvelopeOpenIcon className="mr-2 size-4" /> Just Send
          </Button>
          {
            <div
              className={`mt-4 transition-opacity duration-300 ease-out
            ${isFulFilled ? "opacity-100" : "opacity-0"}`}
              style={{ transform: "scale(1)", transformOrigin: "0 0" }}
            >
              <ReCAPTCHA
                onChange={(val) => {
                  console.log("val", val)
                  setCaptVal(val)
                }}
                sitekey="6LeKADcqAAAAAJtmz18WHnJia-hhZ1N8Vs1g2QGm"
              />
            </div>
          }
        </div>
      </form>
    </Form>
  )
}

export default ContactForm

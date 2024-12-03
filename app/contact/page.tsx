import React from "react"

import ContactForm from "./form"

const ContactPage = () => {
  return (
    <div className="flex px-4 pt-16 md:justify-center md:pt-36">
      <div className="w-full md:flex md:w-2/3 md:flex-col">
        <div className="text-2xl font-medium md:space-y-2 md:text-4xl">
          <p>Love to hear from you,</p>
          <p>Get in touch 👋</p>
        </div>
        <div className="mt-4 flex">
          {/* <form className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 w-full">
						<div>
							<Label htmlFor="email">Your email</Label>
							<Input type="email" id="email" placeholder="Email" />
						</div>
						<div>
							<Label htmlFor="name">Your name</Label>
							<Input type="name" id="name" placeholder="Name" />
						</div>
						<div className="md:col-span-2">
							<Label htmlFor="message">Message</Label>
							<Textarea
								className="md:h-[100px]"
								placeholder="Type your message here."
								id="message"
							/>
						</div>
						<div>
							<Label htmlFor="submit"></Label>
							<Button disabled={!captVal} id="submit" className="w-full">
								<EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Just Send
							</Button>

							<ReCAPTCHA
								className="w-[50px]"
								onChange={(val) => {
									console.log('val', val);
									setCaptVal(val);
								}}
								sitekey="6LeKADcqAAAAAJtmz18WHnJia-hhZ1N8Vs1g2QGm"
							/>
						</div>
					</form> */}
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default ContactPage

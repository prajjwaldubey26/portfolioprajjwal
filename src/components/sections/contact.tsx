"use client";

import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FormEvent, useState } from "react";
import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/section";
import { Slot } from "@/components/slot";
import { useToast } from "@/components/toast";
import { buttonStyles } from "@/components/ui/button";
import { isPlaceholder } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const toast = useToast();
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const endpoint = portfolio.contact.formEndpoint;
  const formReady = endpoint.startsWith("http") && !endpoint.includes("YOUR_FORM_ID");

  async function copyEmail() {
    if (isPlaceholder(portfolio.person.email)) {
      toast("Set person.email in src/data/portfolio.ts");
      return;
    }
    try {
      await navigator.clipboard.writeText(portfolio.person.email);
      toast("Email copied");
    } catch {
      toast("Could not copy email");
    }
  }

  function openLinkedIn() {
    if (isPlaceholder(portfolio.person.linkedin)) {
      toast("Set person.linkedin in src/data/portfolio.ts");
      return;
    }
    window.open(portfolio.person.linkedin, "_blank", "noopener,noreferrer");
  }

  function openX() {
    if (isPlaceholder(portfolio.person.x)) {
      toast("Set person.x in src/data/portfolio.ts");
      return;
    }
    window.open(portfolio.person.x, "_blank", "noopener,noreferrer");
  }

  function mailto(name: string, email: string, message: string) {
    if (isPlaceholder(portfolio.person.email)) {
      toast("Set person.email in src/data/portfolio.ts");
      return;
    }
    const subject = encodeURIComponent(`Portfolio note from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${email}`);
    window.location.href = `mailto:${portfolio.person.email}?subject=${subject}&body=${body}`;
    toast("Opening your email app");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company") || "").trim()) return;

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const nextErrors: Errors = {};
    if (name.length < 2) nextErrors.name = "Enter your name.";
    if (!emailPattern.test(email)) nextErrors.email = "Enter a valid email.";
    if (message.length < 10) nextErrors.message = "Use at least 10 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!formReady) {
      mailto(name, email, message);
      return;
    }

    setPending(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      toast("Message sent");
    } catch {
      mailto(name, email, message);
    } finally {
      setPending(false);
    }
  }

  return (
    <Section id="contact" labelledBy="contact-title">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-text">{"// 07 — CONTACT"}</p>
      <h2 id="contact-title" className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
        {portfolio.contact.headline} <span className="gradient-text">{portfolio.contact.highlight}</span>
      </h2>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
        <Slot value={portfolio.person.city} />
        <Slot value={portfolio.person.phone} />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" className={buttonStyles("primary")} onClick={copyEmail}>
          <Mail className="h-4 w-4" aria-hidden />
          {isPlaceholder(portfolio.person.email) ? "Copy email" : portfolio.person.email}
        </button>
        <button type="button" className={buttonStyles("icon")} aria-label="LinkedIn" onClick={openLinkedIn}>
          <FaLinkedinIn className="h-4 w-4" aria-hidden />
        </button>
        <button type="button" className={buttonStyles("icon")} aria-label="X" onClick={openX}>
          <FaXTwitter className="h-4 w-4" aria-hidden />
        </button>
        <a
          href={portfolio.person.github}
          className={buttonStyles("icon")}
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="h-4 w-4" aria-hidden />
        </a>
      </div>

      <form className="glass mt-8 max-w-xl space-y-4 rounded-2xl p-5 sm:p-6" onSubmit={onSubmit} noValidate>
        <div className="hidden" aria-hidden>
          <label htmlFor="company">Company</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>
        <div>
          <label htmlFor="name" className="text-sm">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="mt-1.5 w-full rounded-xl border border-line bg-bg/40 px-4 py-3 text-sm"
          />
          {errors.name ? (
            <p id="name-error" role="alert" className="mt-1 text-sm text-[#FB7185]">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="mt-1.5 w-full rounded-xl border border-line bg-bg/40 px-4 py-3 text-sm"
          />
          {errors.email ? (
            <p id="email-error" role="alert" className="mt-1 text-sm text-[#FB7185]">
              {errors.email}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="message" className="text-sm">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="mt-1.5 w-full resize-y rounded-xl border border-line bg-bg/40 px-4 py-3 text-sm"
          />
          {errors.message ? (
            <p id="message-error" role="alert" className="mt-1 text-sm text-[#FB7185]">
              {errors.message}
            </p>
          ) : null}
        </div>
        <button type="submit" className={buttonStyles("primary")} disabled={pending}>
          {pending ? "Sending…" : portfolio.contact.submitLabel}
        </button>
        {!formReady ? (
          <p className="font-mono text-[11px] text-muted">Opens an email draft until formEndpoint is set.</p>
        ) : null}
      </form>
    </Section>
  );
}

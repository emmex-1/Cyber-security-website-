import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const NewsletterForm = ({ dark }: { dark?: boolean }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success("Thank you for subscribing! We'll be in touch.");
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto mt-6"
    >
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`flex-1 h-11 rounded-full px-5 shadow-sm ${
          dark
            ? "bg-white border-white/20 text-black placeholder:text-black/60"
            : ""
        }`}
      />

      <Button
        type="submit"
        className="h-11 px-7 rounded-full bg-white text-blue-500 hover:bg-blue-100 font-semibold shadow-sm"
      >
        Subscribe
      </Button>
    </form>
  );
};

export default NewsletterForm;
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "13347469312";
  const message = encodeURIComponent("Hello! I'm interested in Medi Spero CBD products. Can you help me?");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float group"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-foreground text-sm font-medium px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with us!
      </span>
      
      {/* Pulse animation - hidden on mobile for performance */}
      <span className="hidden md:block absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"></span>
    </a>
  );
};

export default WhatsAppButton;

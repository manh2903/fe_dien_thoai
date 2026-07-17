import {
  Phone,
  MessageCircle,
  Globe,
  Link as LinkIcon,
  ExternalLink,
  Share2,
  Users,
} from "lucide-react";
import type { ContactLink, ContactIcon } from "@/types/database";

const iconMap: Record<ContactIcon, React.ComponentType<{ className?: string }>> = {
  zalo: MessageCircle,
  phone: Phone,
  facebook: Share2,
  messenger: MessageCircle,
  tiktok: ExternalLink,
  instagram: Users,
  website: Globe,
  link: LinkIcon,
};

interface ContactLinksProps {
  links: ContactLink[];
  variant?: "footer" | "floating";
}

export function ContactLinks({ links, variant = "footer" }: ContactLinksProps) {
  if (links.length === 0) {
    return <p className="text-sm text-zinc-400">Chưa có link liên hệ</p>;
  }

  if (variant === "floating") {
    return (
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
        {links.map((link) => {
          const Icon = iconMap[link.icon] ?? LinkIcon;
          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              title={link.title}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:scale-110 hover:bg-blue-700"
            >
              <Icon className="h-5 w-5" />
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((link) => {
        const Icon = iconMap[link.icon] ?? LinkIcon;
        return (
          <li key={link.id}>
            <a
              href={link.url}
              target={link.url.startsWith("tel:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 transition hover:border-blue-300 hover:text-blue-600"
            >
              <Icon className="h-4 w-4" />
              {link.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

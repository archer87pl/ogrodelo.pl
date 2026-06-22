import Link from "next/link";
import { LINK_HUBS } from "@/lib/constants/internal-links";

export function InternalLinkHubs() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 border-t border-border">
      <h2 className="text-2xl font-bold text-primary-dark mb-2">
        Narzędzia ogrodowe — wybierz temat
      </h2>
      <p className="text-muted mb-8 max-w-2xl">
        Kalkulatory i porównywarki pogrupowane tematycznie. Każde narzędzie łączy się z
        kolejnymi — zaplanuj ogród krok po kroku.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {LINK_HUBS.map((hub) => (
          <div
            key={hub.title}
            className="rounded-2xl border border-border bg-card p-5 sm:p-6"
          >
            <h3 className="font-bold text-primary-dark">{hub.title}</h3>
            <p className="text-sm text-muted mt-1 mb-4">{hub.description}</p>
            <ul className="space-y-2">
              {hub.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-start gap-2 text-sm hover:text-primary transition-colors"
                  >
                    <span aria-hidden="true">{link.icon}</span>
                    <span>
                      <span className="font-medium text-foreground group-hover:text-primary">
                        {link.label}
                      </span>
                      <span className="block text-xs text-muted mt-0.5 line-clamp-1">
                        {link.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

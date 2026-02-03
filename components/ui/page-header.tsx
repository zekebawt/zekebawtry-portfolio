import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  titleAccent?: string;
  subtitle?: string;
  backHref: string;
  backLabel: string;
  icon?: ReactNode;
  iconGradient?: string;
  breadcrumbs?: Breadcrumb[];
}

export function PageHeader({
  title,
  titleAccent,
  subtitle,
  backHref,
  backLabel,
  icon,
  iconGradient = "from-[#576953] to-[#6a7d65]",
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <header className="mb-10 sm:mb-12">
      {/* Back Button */}
      <Button
        asChild
        variant="ghost"
        className="mb-6 -ml-2 text-[#8a9d86] hover:text-[#CC8B86] hover:bg-[#CC8B86]/5 transition-all duration-300 focus-ring"
      >
        <Link href={backHref} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </Link>
      </Button>

      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav 
          aria-label="Breadcrumb" 
          className="mb-4 flex items-center gap-1.5 text-sm text-[#6a7d65]"
        >
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="w-3.5 h-3.5" />}
              {crumb.href ? (
                <Link 
                  href={crumb.href} 
                  className="hover:text-[#8a9d86] transition-colors duration-200"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#8a9d86]">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Title Row */}
      <div className="flex items-start gap-4">
        {icon && (
          <div 
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${iconGradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F1F7ED] leading-tight">
            {title}
            {titleAccent && (
              <>
                {" "}
                <span className="text-[#CC8B86]">{titleAccent}</span>
              </>
            )}
          </h1>
          {subtitle && (
            <p className="mt-2 text-[#8a9d86] text-base sm:text-lg leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}

// components/Footer.tsx
import Link from "next/link"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t px-6 py-6 bg-[#0a111f] text-sm text-gray-300">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        {/* Left: Copyright */}
        <p>&copy; {new Date().getFullYear()} Minimart. All rights reserved.</p>

        {/* Center: Links */}
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="hover:underline text-muted-foreground hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline text-muted-foreground hover:text-primary">
            Terms of Service
          </Link>
        </div>

        {/* Right: Social with Tooltip */}
        <div className="flex gap-2 items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="text-blue-600 hover:text-white hover:bg-blue-600 transition-colors"
              >
                <a
                  href="https://www.linkedin.com/in/rithveckh-d"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Follow my other works on LinkedIn</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Developer Credit */}
      <div className="mt-4 text-center text-xs text-gray-500">
        App built by <span className="font-semibold text-white">Rithveckh D</span>
      </div>
    </footer>
  )
}

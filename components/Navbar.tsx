import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 border-b shadow bg-[#0a111f] text-white flex items-center justify-between">
      <div className="text-xl font-bold text-blue-700">🛒 MiniMart</div>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            {/* Show Sign In if not logged in */}
            <SignedOut>
              <NavigationMenuLink
                asChild
                className={`${navigationMenuTriggerStyle()} text-black hover:text-blue-500 hover:bg-blue-100 transition-colors`}
              >
                <SignInButton mode="modal" >
                  <span>Sign-In to Shop</span>
                </SignInButton>
              </NavigationMenuLink>
            </SignedOut>

            {/* Show User Avatar if signed in */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}

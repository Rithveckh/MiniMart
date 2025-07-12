import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// Create Protected routes
const isProtectedRoutes= createRouteMatcher(["/EntryPage(.*)"]);
export default clerkMiddleware(async (auth, req) => {
  const session = await auth(); // ✅ Await the auth promise

  // If route is protected and user is not signed in, redirect
  if (!session.userId && isProtectedRoutes(req)) {
    return session.redirectToSignIn(); // ✅ redirect
  }
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
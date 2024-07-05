import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"])

// const isProtectedRoute = createRouteMatcher(["/all-data", "/analytics"])

export default clerkMiddleware((auth, req) => {
  // const {has, redirectToSignIn} = auth()
  if(isPublicRoute(req)){
    return
  }
  else{
    auth().protect()
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
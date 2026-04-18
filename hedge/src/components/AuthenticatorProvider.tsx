'use client';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

/**
 * Client-side wrapper for the Amplify Authenticator.
 * Keeps the root layout a Server Component while providing
 * the auth gate for all child routes.
 */
export default function AuthenticatorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Authenticator>{children}</Authenticator>;
}

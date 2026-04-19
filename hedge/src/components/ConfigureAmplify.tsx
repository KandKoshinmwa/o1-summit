'use client';

import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';

// Initialize Amplify once on the client side.
// This component renders nothing — it exists purely for its side effect.
Amplify.configure(outputs, { ssr: true });

export default function ConfigureAmplify() {
  return null;
}

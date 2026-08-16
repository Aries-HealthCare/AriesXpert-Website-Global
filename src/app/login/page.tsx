import { redirect } from 'next/navigation';

/**
 * Administrator authentication is owned by the Admin Center. Keeping a second
 * client-side login implementation on the public website previously duplicated
 * credentials, session logic, and insecure fallback behavior.
 */
export default function LoginPage() {
  redirect('https://ariesxpert.com/login');
}

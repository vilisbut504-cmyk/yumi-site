import { redirect } from 'next/navigation'

const UTM =
  '/?utm_source=offline&utm_medium=qr&utm_campaign=launch_first_clients'

export default function QrRedirectPage() {
  redirect(UTM)
}

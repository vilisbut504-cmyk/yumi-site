import { redirect } from 'next/navigation'

/**
 * Legacy redirect for already-printed QR codes that encode /qr.
 * Campaign launch_first_clients must stay for historical analytics.
 * New offline materials use utm_campaign=yumi_offline (see scripts/generate-qr.mjs).
 */
const UTM =
  '/?utm_source=offline&utm_medium=qr&utm_campaign=launch_first_clients'

export default function QrRedirectPage() {
  redirect(UTM)
}

'use client'

import { useEffect } from 'react'
import { captureUtmFromUrl } from '@/src/lib/utm'

/** Сохраняет UTM-метки из URL при первом заходе на сайт. */
export function UtmCapture() {
  useEffect(() => {
    captureUtmFromUrl()
  }, [])
  return null
}

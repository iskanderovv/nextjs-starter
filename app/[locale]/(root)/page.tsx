import { useTranslations } from 'next-intl'
import React from 'react'

export default function Home() {
  const t = useTranslations('home')
  return (
    <div>{t('title')}</div>
  )
}

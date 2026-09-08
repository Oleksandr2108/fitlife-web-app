import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, pageEntrance } from '../../lib/motion'
import { AppContainer } from './AppContainer'

interface PageShellProps {
  title: string
  description?: string
  children?: ReactNode
}

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <motion.div initial="hidden" animate="visible" variants={pageEntrance}>
      <AppContainer className="py-10 sm:py-14 lg:py-16">
        <motion.div className="max-w-2xl" variants={fadeUp}>
          <h1 className="text-page-title text-text-primary">{title}</h1>
          {description ? <p className="text-body mt-4 text-text-secondary">{description}</p> : null}
        </motion.div>
        {children}
      </AppContainer>
    </motion.div>
  )
}

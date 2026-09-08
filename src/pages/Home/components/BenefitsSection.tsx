import { motion } from 'framer-motion'
import { Apple, Clock3, Target } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppContainer } from '../../../components/layout/AppContainer'
import { Section } from '../../../components/layout/Section'
import { Surface } from '../../../components/ui/Surface'
import { fadeUp, staggerContainer } from '../../../lib/motion'
import { SectionHeading } from './SectionHeading'

interface Benefit { title: string; description: string; icon: LucideIcon }
const benefits: Benefit[] = [
  { title: 'Quick Workouts', description: '15–30 minute sessions that fit naturally into your day.', icon: Clock3 },
  { title: 'Personal Goals', description: 'Choose your goal and build a simple weekly routine.', icon: Target },
  { title: 'Simple Nutrition', description: 'Easy meal ideas and everyday nutrition inspiration.', icon: Apple },
]

export function BenefitsSection() {
  return <Section className="border-y border-border bg-background-secondary"><AppContainer><SectionHeading eyebrow="Built for real life" title="A simpler way to stay consistent" /><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="mt-8 grid gap-4 md:grid-cols-3">{benefits.map(({ title, description, icon: Icon }) => <motion.div key={title} variants={fadeUp}><Surface className="h-full p-5 sm:p-6"><span className="grid size-11 place-items-center rounded-control bg-accent-soft text-accent"><Icon aria-hidden="true" className="size-5" /></span><h3 className="text-card-title mt-5">{title}</h3><p className="mt-2 text-sm leading-6 text-text-secondary">{description}</p></Surface></motion.div>)}</motion.div></AppContainer></Section>
}

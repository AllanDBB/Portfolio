import React from 'react'
import { Eyebrow, Reveal, Split } from './primitives'

/** Shared opener for inner pages: giant title, lead, and a meta slot. */
export function PageHero({
  index,
  eyebrow,
  title,
  lead,
  meta,
}: {
  index: string
  eyebrow: string
  title: string
  lead?: string
  meta?: React.ReactNode
}) {
  return (
    <section className="px-[var(--gutter)] pt-36 pb-16 md:pt-48 md:pb-24">
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <h1 className="display h-xl mt-8 break-words">
        <Split text={title} />
      </h1>
      <div className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-12">
        {lead && (
          <Reveal className="md:col-span-6 md:col-start-5" delay={200}>
            <p className="text-[clamp(1.1rem,1.6vw,1.45rem)] leading-snug text-fg">{lead}</p>
          </Reveal>
        )}
        {meta && (
          <Reveal className="md:col-span-3 md:col-start-10 md:text-right" delay={300}>
            {meta}
          </Reveal>
        )}
      </div>
    </section>
  )
}

import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { site } from '@constants/site'

import { about } from './about'
import { education } from './education'
import { jobs } from './experience'
import { featuredProjectIds, projects } from './projects'
import { recommendations } from './recommendations'
import { stack } from './stack'

describe('content', () => {
  it('has the four roles with exact dates', () => {
    expect(jobs.map((j) => [j.company, j.start, j.end])).toEqual([
      ['Jitera', '2024-10', 'present'],
      ['Charcentric', '2022-01', '2024-10'],
      ['PT Immobi Solusi Prima', '2020-12', '2021-12'],
      ['Institut Pertanian Bogor (IPB) University', '2019-01', '2019-05'],
    ])
  })
  it('only points company logos at files that exist', () => {
    for (const job of jobs)
      if (job.logo) expect(existsSync(join('public', job.logo))).toBe(true)
  })
  it('keeps the Hacktiv8 honors', () => {
    expect(education.find((e) => e.id === 'hacktiv8')?.honors).toBe(true)
  })
  it('never shows a photo or a phone number', () => {
    expect('photo' in about).toBe(false)
    const blob = JSON.stringify({ about, education, jobs, projects, site })
    for (const re of [/\+62/, /0851/]) expect(blob).not.toMatch(re)
  })
  it('features four existing projects, each screenshot in public/', () => {
    expect(featuredProjectIds).toHaveLength(4)
    for (const id of featuredProjectIds)
      expect(projects.some((p) => p.id === id)).toBe(true)
    for (const p of projects)
      if (p.screenshot)
        expect(existsSync(join('public', p.screenshot.src))).toBe(true)
  })
  it('links the room project to room.satriko.dev', () => {
    expect(projects.find((p) => p.id === 'satrikos-room')?.links).toEqual([
      { label: 'Visit the room', href: 'https://room.satriko.dev' },
    ])
  })
  it('has well-formed recommendations', () => {
    expect(new Set(recommendations.map((r) => r.id)).size).toBe(
      recommendations.length,
    )
    for (const r of recommendations) {
      expect(r.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(r.paragraphs.length).toBeGreaterThan(0)
    }
  })
  it('has a drawable icon for every stack item', () => {
    for (const item of stack) expect(item.path.length).toBeGreaterThan(10)
  })
})

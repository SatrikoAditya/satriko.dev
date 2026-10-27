import {
  siDocker,
  siGit,
  siJavascript,
  siMongodb,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siRedis,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from 'simple-icons'

import type { IStackItem } from '@models/stack'
import { brandColor } from '@utils/brandColor'

const item = (icon: SimpleIcon, name = icon.title): IStackItem => ({
  name,
  path: icon.path,
  color: brandColor(icon.hex),
})

export const stack: readonly IStackItem[] = [
  item(siTypescript),
  item(siJavascript),
  item(siNodedotjs, 'Node.js'),
  item(siReact, 'React & React Native'),
  item(siNextdotjs, 'Next.js'),
  item(siNestjs, 'NestJS'),
  item(siTailwindcss, 'Tailwind CSS'),
  item(siPostgresql),
  item(siMysql),
  item(siMongodb),
  item(siRedis),
  item(siPrisma),
  item(siSupabase),
  item(siDocker),
  item(siGit),
  item(siVercel),
]

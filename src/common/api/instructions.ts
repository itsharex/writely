import { Instruction } from '@/options/types'
import { uniqueId } from 'lodash-es'
import { getSetting, saveSetting } from '../store/settings'

export const addOne = async (instruction: Instruction) => {
  const settings = await getSetting()

  settings.customInstructions.push({
    id: uniqueId(Date.now() + ''),
    ...instruction,
  })

  await saveSetting(settings)
}

export const update = async (instruction: Instruction) => {
  const settings = await getSetting()

  settings.customInstructions = settings.customInstructions.map((item) => {
    if (item.id === instruction.id) {
      return instruction
    }

    return item
  })

  await saveSetting(settings)
}

export const remove = async (id: string) => {
  const settings = await getSetting()

  settings.customInstructions = settings.customInstructions.filter((item) => {
    return item.id !== id
  })

  await saveSetting(settings)
}

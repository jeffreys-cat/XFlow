import { useMemo, useEffect } from 'react'
import { Selection } from '@antv/x6-plugin-selection'
import { useGraph } from '../graph'

const SelectionEventNames = [
  'cell:selected',
  'node:selected',
  'edge:selected',
  'cell:unselected',
  'node:unselected',
  'edge:unselected',
  'selection:changed',
]

export const useSelection = () => {
  const graph = useGraph()

  return useMemo(
    () => graph && graph.getPlugin<Selection>(Selection.name),
    [graph],
  )
}

export const useOnSelectionChanged = (
  callback: (args: Selection.EventArgs) => void,
) => {
  const selection = useSelection()

  useEffect(() => {
    if (selection) {
      SelectionEventNames.forEach((name) => {
        selection.on(name, callback)
      })

      return () => {
        SelectionEventNames.forEach((name) => {
          selection.off(name, callback)
        })
      }
    }
  }, [selection, callback])
}

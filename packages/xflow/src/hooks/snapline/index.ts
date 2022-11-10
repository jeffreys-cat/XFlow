import { useMemo } from 'react'
import { Snapline } from '@antv/x6-plugin-snapline'
import { useGraph } from '../graph'

export const useSnapline = () => {
  const graph = useGraph()

  return useMemo(
    () => graph && graph.getPlugin<Snapline>(Snapline.name),
    [graph],
  )
}

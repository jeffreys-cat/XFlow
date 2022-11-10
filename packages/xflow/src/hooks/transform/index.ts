import { useMemo } from 'react'
import { Transform } from '@antv/x6-plugin-transform'
import { useGraph } from '../../hooks/graph'

export const useTransform = () => {
  const graph = useGraph()

  return useMemo(
    () => graph && graph.getPlugin<Transform>(Transform.name),
    [graph],
  )
}

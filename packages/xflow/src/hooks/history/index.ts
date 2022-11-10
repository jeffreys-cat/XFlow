import { useMemo, useEffect } from 'react'
import { History } from '@antv/x6-plugin-history'
import { useGraph } from '../graph'

export const useHistory = (options?: History.Options) => {
  const graph = useGraph()

  return useMemo(() => {
    if (graph) {
      const history = graph.getPlugin<History>(History.name)

      if (options) {
        if (history) {
          // TODO: add setOptions function
          // history.setOptions(options)
        } else {
          const graphHistory = new History(options)

          graph.use(graphHistory)

          return graphHistory
        }
      }

      return history
    }
  }, [graph, options])
}

export const useOnHistoryUndo = (
  callback: (args: History.EventArgs['undo']) => void,
) => {
  const history = useHistory()

  useEffect(() => {
    if (history) {
      history.on('undo', callback)

      return () => {
        history.off('undo', callback)
      }
    }
  }, [history])
}

export const useOnHistoryRedo = (
  callback: (args: History.EventArgs['redo']) => void,
) => {
  const history = useHistory()

  useEffect(() => {
    if (history) {
      history.on('redo', callback)

      return () => {
        history.off('redo', callback)
      }
    }
  }, [history])
}

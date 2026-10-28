import { useSelector } from 'react-redux'
import Column, { type ColumnItem } from './Column'
import {
  selectTasksCompleted,
  selectTasksInProgress,
  selectTasksTodo,
  type Task,
} from '../tasksSlice'

interface BoardProps {
  searchInput: string
}

function Board({ searchInput }: BoardProps) {
  const todoTasks = useSelector(selectTasksTodo)
  const inProgressTasks = useSelector(selectTasksInProgress)
  const completedTasks = useSelector(selectTasksCompleted)

  const filterTasks = (tasks: Task[]) => {
    const query = searchInput.toLowerCase().trim()
    if (!query) return tasks

    return tasks.filter((t) =>
      String(t.title).toLowerCase().includes(query)
    )
  }

  const columns: ColumnItem[] = [
    {
      key: 'todo',
      title: 'To Do',
      dot: 'bg-stone-400',
      cards: filterTasks(todoTasks),
    },
    {
      key: 'in-progress',
      title: 'In Progress',
      dot: 'bg-amber-400',
      cards: filterTasks(inProgressTasks),
    },
    {
      key: 'done',
      title: 'Done',
      dot: 'bg-[#8AA787]',
      cards: filterTasks(completedTasks),
    },
  ]

  return (
    <div className="grid gap-4 border-t border-gray-200 bg-[#F7F6F2] p-4 sm:p-6 md:grid-cols-3">
      <Column columns={columns} />
    </div>
  )
}

export default Board
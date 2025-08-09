"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { supabase, type Task } from '@/lib/supabase'
import { Trash2 } from 'lucide-react'

interface TaskListProps {
  tasks: Task[]
  onTasksChange: () => void
}

export function TaskList({ tasks, onTasksChange }: TaskListProps) {
  const [loadingTasks, setLoadingTasks] = useState<Set<string>>(new Set())

  const toggleTask = async (task: Task) => {
    if (!supabase) return
    
    setLoadingTasks(prev => new Set(prev).add(task.id))
    
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: !task.completed })
        .eq('id', task.id)

      if (error) throw error
      onTasksChange()
    } catch (error) {
      console.error('Error updating task:', error)
    } finally {
      setLoadingTasks(prev => {
        const newSet = new Set(prev)
        newSet.delete(task.id)
        return newSet
      })
    }
  }

  const deleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?') || !supabase) return
    
    setLoadingTasks(prev => new Set(prev).add(taskId))
    
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)

      if (error) throw error
      onTasksChange()
    } catch (error) {
      console.error('Error deleting task:', error)
    } finally {
      setLoadingTasks(prev => {
        const newSet = new Set(prev)
        newSet.delete(taskId)
        return newSet
      })
    }
  }

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No tasks yet. Create your first task above!
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <Card key={task.id} className={task.completed ? 'opacity-60' : ''}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task)}
                disabled={loadingTasks.has(task.id)}
              />
              <div className="flex-1">
                <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-sm mt-1 ${task.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                    {task.description}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Created: {new Date(task.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                  disabled={loadingTasks.has(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
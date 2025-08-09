"use client"

import { useState, useEffect } from 'react'
import { TaskForm } from '@/components/TaskForm'
import { TaskList } from '@/components/TaskList'
import { supabase, type Task } from '@/lib/supabase'
import { CheckSquare } from 'lucide-react'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    if (!supabase) {
      setLoading(false)
      return
    }
    
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const completedTasks = tasks.filter(task => task.completed).length
  const totalTasks = tasks.length

  // Show configuration message if Supabase is not configured
  if (!supabase) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckSquare className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">TaskFlow</h1>
            </div>
            <p className="text-gray-600 text-lg mb-6">
              Modern task management with Supabase, ShadCN & Tailwind
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-yellow-800 mb-3">⚠️ Configuration Required</h2>
              <p className="text-yellow-700 mb-4">
                To use TaskFlow, please add your Supabase environment variables:
              </p>
              <div className="bg-yellow-100 p-4 rounded border text-sm font-mono text-left">
                <div>NEXT_PUBLIC_SUPABASE_URL=your_supabase_url</div>
                <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key</div>
              </div>
              <p className="text-yellow-700 mt-4 text-sm">
                Add these to your Vercel environment variables or .env.local file
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">TaskFlow</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Modern task management with Supabase, ShadCN & Tailwind
          </p>
          
          {/* Stats */}
          {totalTasks > 0 && (
            <div className="mt-6 flex justify-center gap-6 text-sm text-gray-500">
              <span>{totalTasks} total tasks</span>
              <span>{completedTasks} completed</span>
              <span>{totalTasks - completedTasks} pending</span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Task Form */}
          <div>
            <TaskForm onTaskCreated={fetchTasks} />
          </div>

          {/* Task List */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Your Tasks
              </h2>
              <p className="text-gray-600">
                {loading ? 'Loading tasks...' : `${tasks.length} tasks`}
              </p>
            </div>
            
            {loading ? (
              <div className="animate-pulse space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-lg h-20"></div>
                ))}
              </div>
            ) : (
              <TaskList tasks={tasks} onTasksChange={fetchTasks} />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Built with ❤️ using Next.js, Supabase, ShadCN/UI & Tailwind CSS
          </p>
          <div className="flex justify-center gap-2 mt-2 text-xs text-gray-400">
            <span>Real-time database</span>
            <span>•</span>
            <span>Beautiful UI components</span>
            <span>•</span>
            <span>Modern styling</span>
          </div>
        </div>
      </div>
    </div>
  )
}

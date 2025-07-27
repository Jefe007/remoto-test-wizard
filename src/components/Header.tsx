import { useAuth } from '@/hooks/useAuth'
import { Button } from './ui/button'
import { User, LogOut } from 'lucide-react'

export const Header = () => {
  const { user, signOut, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return null
  }

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Test Vocacional</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{user?.email}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={signOut}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
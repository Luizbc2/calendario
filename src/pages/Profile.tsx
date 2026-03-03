import { useTheme } from '@/hooks/useTheme';
import { mockUser } from '@/data/mockApi';
import { ArrowLeft, Sun, Moon, Mail, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function Profile() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-6 py-10">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground cal-transition mb-8">
          <ArrowLeft className="h-4 w-4" />
          Voltar ao calendário
        </Link>

        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
              {mockUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="text-xl font-semibold">{mockUser.name}</h1>
              <p className="text-sm text-muted-foreground">{mockUser.email}</p>
            </div>
          </div>

          <div className="border-t border-border pt-4 space-y-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Personalização</h2>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2">
                {isDark ? <Moon className="h-4 w-4 text-primary" /> : <Sun className="h-4 w-4 text-primary" />}
                <Label className="text-sm font-medium cursor-pointer">Modo Escuro</Label>
              </div>
              <Switch checked={isDark} onCheckedChange={toggle} />
            </div>
          </div>

          <div className="border-t border-border pt-4 space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Informações</h2>
            <div className="flex items-center gap-2 text-sm">
              <UserIcon className="h-4 w-4 text-muted-foreground" />
              <span>{mockUser.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{mockUser.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

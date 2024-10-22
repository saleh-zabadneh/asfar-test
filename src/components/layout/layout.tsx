import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../app-sidebar';
import Header from './header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="px-12">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

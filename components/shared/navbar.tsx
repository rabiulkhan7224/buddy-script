"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Bell, 
  House, 
  MessageCircle, 
  Users, 
  Menu, 
  LogOut, 
  Settings, 
  User,
  ChevronDown
} from "lucide-react";
import Image from "next/image";
import { useCurrentUser } from "@/lib/hooks/auth"; // your hook

export function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { user, isLoading } = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();

  const navlinks = [
    { label: "Home", href: "/", icon: <House className="w-5 h-5" /> },
    { label: "Friends", href: "/friends", icon: <Users className="w-5 h-5" /> },
    { label: "Messages", href: "/messages", icon: <MessageCircle className="w-5 h-5" /> },
  ];

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/auth");

  // Logout function (adjust based on your auth provider)
  const handleLogout = async () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
// window.location.reload();
window.location.href = "/login";
router.push("/login");
    
  };

  if (isLoading) {
    return (
      <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </header>
    );
  }

  // If not logged in → show minimal navbar or redirect (optional)
  

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border z-50 ">
        <div className="px-4 h-full flex items-center justify-between container mx-auto">

          {/* Left: Logo + Search */}
          <div className="flex items-center gap-6 flex-1">
            <Link href="/" className="flex-shrink-0">
              <Image 
                src="/images/logo.svg" 
                alt="Logo" 
                width={120} 
                height={40} 
                className="object-contain"
              />
            </Link>

            <div className="hidden md:block flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search people, posts..."
                  className="w-full bg-muted/70 hover:bg-muted text-foreground placeholder:text-muted-foreground rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Center: Desktop Icons */}
          <nav className="hidden lg:flex items-center gap-1">
            {navlinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative p-3 rounded-xl transition-all ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.icon}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Notifications + Profile */}
          <div className="flex items-center gap-3">

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-3 rounded-xl hover:bg-muted transition text-foreground"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-card" />
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-bold text-lg">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {/* Your notifications here */}
                    <p className="p-8 text-center text-muted-foreground text-sm">No new notifications</p>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown - BEST UI */}
           {user &&
          
           
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-all pr-4"
              >
                {/* image user */}
                <div className="">
                  <Image
                    src={user?.profilePicture || "/images/chat2_img.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>

                <div className="hidden sm:block text-left">
                  <p className="font-semibold text-sm text-foreground">{user?.firstName  || "User"} {user?.lastName}</p>
                  
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50">
                    <div className="p-4 border-b border-border">
                      <Link href="/profile" className="flex items-center gap-3 hover:bg-muted/50 -m-2 p-2 rounded-lg transition">
                        <div className="">
                  <Image
                    src={user?.profilePicture || "/images/chat2_img.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                        </div>
                        <div>
                          <p className="font-bold">{user?.firstName || "User"}</p>
                          <p className="text-sm text-muted-foreground">View profile</p>
                        </div>
                      </Link>
                    </div>

                    <div className="py-2">
                      <Link href="/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition">
                        <Settings className="w-5 h-5" />
                        <span>Settings & Privacy</span>
                      </Link>
                      <Link href="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition">
                        <User className="w-5 h-5" />
                        <span>My Profile</span>
                      </Link>
                    </div>

                    <div className="border-t border-border pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 text-red-600 transition"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Log Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
             }
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border z-50 lg:hidden">
        <div className="flex justify-around items-center py-2">
          {navlinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.icon}
                <span className="text-xs">{link.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground"
          >
            <Menu className="w-6 h-6" />
            <span className="text-xs">Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar (optional) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-card border-r border-border p-6 overflow-y-auto">
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="mb-8 text-2xl"
            >
              ×
            </button>
            {/* Add your sidebar links here */}
          </div>
        </div>
      )}
    </>
  );
}
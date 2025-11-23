"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const pathname = usePathname()

  // Check if user is on auth pages
  const isAuthPage = pathname === "/login" || pathname === "/register"

  return (
    <header className="border-b border-border bg-card sticky top-0 z-40">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8 flex-1">
          <Link href="/" className="font-bold text-xl text-primary hover:opacity-80 transition-opacity">
            <span className="text-foreground">Buddy</span>
            <span className="text-primary">Script</span>
          </Link>
          {!isAuthPage && (
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search people, posts..."
                  className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-full pl-4 pr-4 py-2 text-sm outline-none"
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          {!isAuthPage && (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
              aria-label="Menu"
            >
              ☰
            </button>
          )}

          {/* Desktop Navigation */}
          {!isAuthPage && (
            <button className="p-2 hover:bg-muted rounded-lg transition-colors hidden md:block text-foreground">
              🏠
            </button>
          )}
          {!isAuthPage && (
            <button className="p-2 hover:bg-muted rounded-lg transition-colors hidden md:block text-foreground">
              👥
            </button>
          )}

          {/* Notifications */}
          {!isAuthPage && (
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
                aria-label="Notifications"
              >
                🔔
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Notifications Popup */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-card border border-border rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-foreground">Notifications</h3>
                    <button
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <button className="px-3 py-1 border border-primary text-primary rounded text-xs font-semibold">
                      All
                    </button>
                    <button className="px-3 py-1 border border-border text-foreground rounded text-xs font-semibold hover:bg-muted">
                      Unread
                    </button>
                  </div>

                  {/* Notification Items */}
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-3 mb-4 pb-4 border-b border-border last:border-b-0">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        SJ
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">
                          <span className="font-semibold">Steve Jobs</span> posted a link in your timeline.
                        </p>
                        <p className="text-xs text-primary">42 minutes ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Marketplace */}
          {!isAuthPage && (
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors text-foreground">
              🛍️
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </button>
          )}

          {/* Profile */}
          {!isAuthPage && (
            <div className="flex items-center gap-2 pl-4 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                DF
              </div>
              <span className="hidden sm:inline text-sm font-medium text-foreground">Dylan Field</span>
            </div>
          )}

          {/* Auth buttons for login/register pages */}
          {isAuthPage && (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-6 py-2 text-foreground hover:bg-muted rounded-lg transition-colors text-sm font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {!isAuthPage && isSidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
          <div className="absolute left-0 top-full w-64 bg-card border border-border rounded-lg shadow-lg p-4 z-40 max-h-96 overflow-y-auto lg:hidden">
            <h3 className="font-bold text-foreground mb-4">Menu</h3>
            {[
              { icon: "📚", label: "Learning" },
              { icon: "💡", label: "Insights" },
              { icon: "👥", label: "Find friends" },
              { icon: "🔖", label: "Bookmarks" },
              { icon: "💬", label: "Group" },
              { icon: "🎮", label: "Gaming" },
              { icon: "⚙️", label: "Settings" },
              { icon: "💾", label: "Save post" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setIsSidebarOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-foreground mb-2"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </header>
  )
}

import { Button } from "@/components/ui/button"
import { Bookmark, ChartNoAxesColumn, CirclePlay, Gamepad2, Save, Settings, UserPlus, Users } from "lucide-react"

export default function Layout({ children }: { children: React.ReactNode }) {

    // sidebar navlinks data
   const navlinks = 
    [
                { icon: <CirclePlay />, label: "Learning",
                    href: "/Learning", isNew: true
                 },
                { icon: <ChartNoAxesColumn />, label: "Insights",
                    href: "/Insights", isNew: false
                 },
                { icon:  <UserPlus />, label: "Find friends" ,
                    href: "/Find-friends", isNew: false
                },
                { icon:    <Bookmark />, label: "Bookmarks",
                    href: "/Bookmarks", isNew: false
                },
                { icon: <Users/>, label: "Group",
                    href: "/Group", isNew: false

                },
                { icon: <Gamepad2 />, label: "Gaming" ,
                    href: "/Gaming", isNew: true,
                },
                { icon:     <Settings />, label: "Settings",
                    href: "/Settings", isNew: false

                 },
                { icon:  <Save />, label: "Save post"
                    , href: "/Save-post", isNew: false
                 },
              ]

  return (
    <div className="flex w-full justify-center bg-[#F0F2F5]">
      <div className="w-full max-w-[1400px] flex">

        {/* LEFT SIDEBAR (Desktop & Large Tablet) */}
        <aside className="hidden lg:block w-64 shrink-0 p-4 ">
          {/* LeftSidebar component here */}
          <div className="bg-white border-r border-border p-4 rounded-lg shadow-sm">
            {navlinks.map((item) => (
               <Button
                key={item.label}
                variant="ghost"
                size="sm"
                className="w-full justify-start mb-2"
                >
                <span className="mr-2">{item.icon}</span>
                <span>{item.label}</span>
                {item.isNew && (
                    <span className="ml-auto text-xs text-white font-medium bg-green-400 px-2 py-0.5 rounded-full">
                        New
                    </span>
                )}
              </Button>
              ))}
</div>

        </aside>
        
        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 p-4">
          {children}
        </main>
        {/* RIGHT SIDEBAR (Desktop Only) */}
        <aside className="hidden xl:block w-72 shrink-0 p-4">
          {/* RightSidebar component here */}
        </aside>

      </div>
    </div>
  )
}

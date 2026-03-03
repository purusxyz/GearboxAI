import { useState } from 'react'
import { Link } from "react-router"
import { clsx } from 'clsx';


const Sidepanel = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={clsx("h-screen transition-all duration-150 flex flex-col overflow-scroll bg-gray-50 border-r border-gray-200", 
    collapsed ? "w-14" : "w-65")}>
      <div className="sticky top-0 z-1 bg-gray-50">
        <div className="flex justify-between p-4 group">
          <button className={
            clsx("cursor-pointer",
              {
                " shrink-0 group-hover:hidden":  collapsed
              }
            )
          }>
             
            <img
              src="/chatgpt.png"
              alt="Chat-GPT Logo"
              width={24}
              height={24}
              
              />

          </button>
          <button className={
            clsx("cursor-pointer",
              {
                " shrink-0 hidden group-hover:block": collapsed
              }
            )
          } onClick={() => setCollapsed(!collapsed)}>
            
            <img
              src="/sidebartoggle.svg"
              alt="Settings Icon"
              width={24}
              height={24}
              
            />
          </button>
        </div>
         <div className="px-2 ">
              <Link to="#" className="flex gap-3 p-2 text-md w-full hover:bg-gray-200 ">
                 <div className=" flex shrink-0">
                <img
                  src="/new.png"
                  alt="Sidebar Icon"
                  width={24}
                  height={24}
                  
                />
                </div>
                <span className={
                  clsx({
                    "hidden": collapsed
                  })
                }>New Chat</span>
              </Link>
              <Link to="#" className="flex gap-3 p-2 text-md w-full hover:bg-gray-200 ">
                <div className=" flex shrink-0">
                <img
                  src="/search.svg"
                  alt="Sidebar Icon"
                  width={24}
                  height={24}
                  
                />
                </div>
                <span className={
                  clsx({
                    "hidden": collapsed
                  })
                }>Search chats</span>
              </Link>
              <Link to="#" className="flex gap-3 p-2 text-md w-full hover:bg-gray-200 ">
                <div className=" flex shrink-0">
                    <img
                  src="/stack.svg"
                  alt="Sidebar Icon"
                  width={24}
                  height={24}
                  
                />
                </div>
                
                <span className={
                  clsx({
                    "hidden": collapsed
                  })
                }>Library</span>
              </Link>
         </div>
      </div>
      <div className={
        clsx("my-6 mx-2",
          {
            "hidden": collapsed
          }
        )
      }>
        {/* render chat list here */}
        <p className="px-2 text-gray-500 text-md">Chats</p>
        <div className="px-2">
          {
            Array.from({ length: 100 }).map((_, index: number) => {
              return (
                <Link key={index} to={"#"} className="block p-2 text-md rounded-sm hover:bg-gray-200 truncate">Solve HCV Problem {index + 1}</Link>
           )
     })
          }
        </div>
      </div>
      <div className="sticky bottom-0 z-1 mt-auto bg-gray-50 p-2 border-t border-gray-200">
        <div className="flex items-center justify-between">
           <div className="flex gap-2 items-center">
              <div className="rounded-full w-7 h-7 bg-blue-400 text-white flex items-center justify-center">P</div>
              <div className={
                clsx("flex flex-col gap-0.5",{
                  "hidden": collapsed
                })
              }>
                  <span className="text-sm">Purus</span>
                  <span className="text-xs text-gray-500">Free</span>
              </div>
           </div>
           <div className={
            clsx({"hidden": collapsed
            })
          }>
            <button className=" bg-white border border-gray-300 px-2 py-1 text-xs rounded-2xl font-medium cursor-pointer">
               Upgrade
            </button> 
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Sidepanel

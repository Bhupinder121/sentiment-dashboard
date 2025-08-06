"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { createGlobalState } from 'react-hooks-global-state';

export const { setGlobalState, useGlobalState } = createGlobalState({ openGlobal: false })

import data from "./data.json"
import { Suspense, useState } from "react"
import { Content } from "./content"

export let done: boolean = false;


export default function Page() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(true);

  function notify() {
    console.log("test")
    setDone(true)
  }


  return (
    <SidebarProvider>
      <AppSidebar variant="inset" check={notify}/>
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <Content></Content>
          {/* {done && <Content></Content>}
          {!done && <p>Please Create a new one</p>} */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
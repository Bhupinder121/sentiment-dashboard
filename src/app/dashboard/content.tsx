import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"


import data from "./data.json"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

async function getSentiment() {
  const response = await fetch("http://192.168.0.118:8000/getSenti", { method: "POST", body: "NEWS.TXT" });
  return await response.json();
}

export function Content() {
  // const chartData = await getSentiment();
  let chartData = [{ 'label': 'Neutral', 'score': 0.5350404381752014 }, { 'label': 'Very Positive', 'score': 0.6519945859909058 }, { 'label': 'Negative', 'score': 0.330020010471344 }, { 'label': 'Very Negative', 'score': 0.450946569442749 }, { 'label': 'Very Positive', 'score': 0.4215574860572815 }, { 'label': 'Neutral', 'score': 0.2743145823478699 }, { 'label': 'Positive', 'score': 0.44534313678741455 }, { 'label': 'Very Positive', 'score': 0.31854867935180664 }, { 'label': 'Neutral', 'score': 0.5536362528800964 }, { 'label': 'Very Positive', 'score': 0.6231381893157959 }, { 'label': 'Very Positive', 'score': 0.33017805218696594 }, { 'label': 'Positive', 'score': 0.4341926872730255 }, { 'label': 'Negative', 'score': 0.27675679326057434 }, { 'label': 'Very Negative', 'score': 0.3172951936721802 }, { 'label': 'Neutral', 'score': 0.46073806285858154 }, { 'label': 'Very Negative', 'score': 0.6046202778816223 }, { 'label': 'Neutral', 'score': 0.38560792803764343 }, { 'label': 'Negative', 'score': 0.4160356819629669 }, { 'label': 'Very Negative', 'score': 0.2756672501564026 }, { 'label': 'Negative', 'score': 0.4333688020706177 }, { 'label': 'Very Positive', 'score': 0.5944105982780457 }, { 'label': 'Positive', 'score': 0.5475254058837891 }, { 'label': 'Positive', 'score': 0.42372632026672363 }, { 'label': 'Very Negative', 'score': 0.6697090268135071 }, { 'label': 'Neutral', 'score': 0.3763212263584137 }, { 'label': 'Positive', 'score': 0.4135507345199585 }, { 'label': 'Negative', 'score': 0.30418336391448975 }, { 'label': 'Very Negative', 'score': 0.5987350344657898 }, { 'label': 'Neutral', 'score': 0.4269371032714844 }, { 'label': 'Neutral', 'score': 0.3749651312828064 }, { 'label': 'Very Positive', 'score': 0.6646533012390137 }, { 'label': 'Very Negative', 'score': 0.3700026273727417 }, { 'label': 'Negative', 'score': 0.3445760905742645 }, { 'label': 'Very Positive', 'score': 0.486636221408844 }, { 'label': 'Positive', 'score': 0.33907681703567505 }, { 'label': 'Neutral', 'score': 0.38875964283943176 }, { 'label': 'Very Positive', 'score': 0.6869351863861084 }, { 'label': 'Positive', 'score': 0.3728587031364441 }, { 'label': 'Very Negative', 'score': 0.3210156559944153 }, { 'label': 'Positive', 'score': 0.705622673034668 }, { 'label': 'Very Negative', 'score': 0.3400382697582245 }, { 'label': 'Very Positive', 'score': 0.4067472219467163 }, { 'label': 'Very Positive', 'score': 0.3322307765483856 }, { 'label': 'Very Negative', 'score': 0.38821643590927124 }, { 'label': 'Very Positive', 'score': 0.411906361579895 }, { 'label': 'Very Positive', 'score': 0.39683303236961365 }, { 'label': 'Very Negative', 'score': 0.45100077986717224 }, { 'label': 'Neutral', 'score': 0.47585445642471313 }, { 'label': 'Negative', 'score': 0.4522406756877899 }, { 'label': 'Very Negative', 'score': 0.4095294773578644 }, { 'label': 'Neutral', 'score': 0.3714666962623596 }, { 'label': 'Very Negative', 'score': 0.4431219696998596 }, { 'label': 'Neutral', 'score': 0.5988075733184814 }, { 'label': 'Very Negative', 'score': 0.3576655685901642 }, { 'label': 'Neutral', 'score': 0.28283634781837463 }, { 'label': 'Neutral', 'score': 0.39866384863853455 }, { 'label': 'Negative', 'score': 0.44729143381118774 }, { 'label': 'Neutral', 'score': 0.4074874818325043 }, { 'label': 'Very Negative', 'score': 0.45719394087791443 }, { 'label': 'Neutral', 'score': 0.5915586352348328 }, { 'label': 'Very Negative', 'score': 0.8008206486701965 }, { 'label': 'Very Negative', 'score': 0.3513331413269043 }, { 'label': 'Neutral', 'score': 0.33278247714042664 }, { 'label': 'Positive', 'score': 0.25794005393981934 }, { 'label': 'Very Positive', 'score': 0.4634513258934021 }, { 'label': 'Neutral', 'score': 0.3419156074523926 }, { 'label': 'Very Positive', 'score': 0.6101502776145935 }, { 'label': 'Positive', 'score': 0.28325629234313965 }, { 'label': 'Neutral', 'score': 0.31272920966148376 }, { 'label': 'Neutral', 'score': 0.45635515451431274 }, { 'label': 'Very Negative', 'score': 0.3470362424850464 }, { 'label': 'Neutral', 'score': 0.30465415120124817 }, { 'label': 'Neutral', 'score': 0.4321610927581787 }, { 'label': 'Neutral', 'score': 0.4402463436126709 }, { 'label': 'Very Positive', 'score': 0.4454667866230011 }, { 'label': 'Neutral', 'score': 0.29548192024230957 }, { 'label': 'Neutral', 'score': 0.3714420199394226 }, { 'label': 'Very Negative', 'score': 0.5136404037475586 }, { 'label': 'Very Negative', 'score': 0.631496787071228 }, { 'label': 'Neutral', 'score': 0.3898080289363861 }, { 'label': 'Very Positive', 'score': 0.674524188041687 }, { 'label': 'Neutral', 'score': 0.28753337264060974 }, { 'label': 'Negative', 'score': 0.4484516680240631 }, { 'label': 'Neutral', 'score': 0.3317733705043793 }, { 'label': 'Neutral', 'score': 0.3616424798965454 }, { 'label': 'Very Positive', 'score': 0.5492669343948364 }, { 'label': 'Positive', 'score': 0.31629320979118347 }, { 'label': 'Very Negative', 'score': 0.40938884019851685 }, { 'label': 'Very Positive', 'score': 0.3746304512023926 }, { 'label': 'Neutral', 'score': 0.39403945207595825 }, { 'label': 'Very Positive', 'score': 0.6424761414527893 }, { 'label': 'Very Positive', 'score': 0.6002310514450073 }, { 'label': 'Neutral', 'score': 0.31500622630119324 }, { 'label': 'Neutral', 'score': 0.3271709382534027 }, { 'label': 'Neutral', 'score': 0.41438600420951843 }, { 'label': 'Very Positive', 'score': 0.5633660554885864 }, { 'label': 'Very Negative', 'score': 0.3212246000766754 }, { 'label': 'Neutral', 'score': 0.4319547414779663 }, { 'label': 'Neutral', 'score': 0.3526938259601593 }, { 'label': 'Very Positive', 'score': 0.23644880950450897 }]

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        
        <SectionCards></SectionCards>
        <Suspense fallback={<p className="text-center">Loading chart...</p>}>
          
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive chartData={chartData} />
          </div>
        </Suspense>
      </div>
    </div>
  )
}

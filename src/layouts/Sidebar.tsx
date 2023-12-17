import { ChevronDown, ChevronUp, Clapperboard, Clock, Film, Flame, History, Home, Library, Lightbulb, ListVideo, Music2, Newspaper, PlaySquare, Podcast, Radio, Repeat, Shirt, ShoppingBag, Trophy } from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button, buttonStyles } from "../components/Button";
import { playlists, subscriptions } from "../data/sidebar";
import { useSidebarContext } from "../contexts/SidebarContext";
import { PageHeaderFirstSection } from "./PageHeader";

export function Sidebar() {
    const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
    return <>
        <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${isLargeOpen ? "lg:hidden" : "lg:flex"}`}>
            <SmallSidebarItem Icon={Home} title="Home" url="/" />
            <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
            <SmallSidebarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions" />
            <SmallSidebarItem Icon={Library} title="Library" url="/library" />
        </aside>
        {isSmallOpen && (
            <div onClick={close} className="lg:hidden fixed inset-0 z-[999] bg-secondary dark opacity-50"></div>
        )}
        <aside className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${isLargeOpen ? "lg:flex" : "lg-hidden"} ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}>
            <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
                <PageHeaderFirstSection />
            </div>
            <LargeSidebarSection visibleItemCount={1}>
                <LargeSidebarItem isActive={true} IconOrImg={Home} title="Home" url="/" />
                <LargeSidebarItem IconOrImg={Clapperboard} title="Subscriptions" url="/subscriptions" />
            </LargeSidebarSection>
            <hr />
            <LargeSidebarSection visibleItemCount={5}>
                <LargeSidebarItem IconOrImg={Library} title="Library" url="/library" />
                <LargeSidebarItem IconOrImg={History} title="History" url="/history" />
                <LargeSidebarItem IconOrImg={PlaySquare} title="Your Videos" url="/your-videos" />
                <LargeSidebarItem IconOrImg={Clock} title="Watch Later" url="/playlist?list=WL" />
                {playlists.map(playlist => (
                    <LargeSidebarItem key={playlist.id} IconOrImg={ListVideo} title={playlist.name} url={`/playlist?list=${playlist.id}`} />
                ))}
            </LargeSidebarSection>
            <hr />
            <LargeSidebarSection title="Subscriptions" visibleItemCount={5}>
                {subscriptions.map(subscription => (
                    <LargeSidebarItem IconOrImg={subscription.imgUrl} title={subscription.channelName} url={`/subscription?sub=${subscription.id}`} />
                ))}
            </LargeSidebarSection>
            <hr />
            <LargeSidebarSection title="Explore">
                <LargeSidebarItem IconOrImg={Flame} title="Trending" url="/trending" />
                <LargeSidebarItem IconOrImg={ShoppingBag} title="Shopping" url="/shopping" />
                <LargeSidebarItem IconOrImg={Music2} title="Music" url="/music" />
                <LargeSidebarItem IconOrImg={Film} title="Movies & Tv" url="/movies-tv" />
                <LargeSidebarItem IconOrImg={Radio} title="Live" url="/live" />
                <LargeSidebarItem IconOrImg={Newspaper} title="News" url="/news" />
                <LargeSidebarItem IconOrImg={Trophy} title="Sports" url="/sports" />
                <LargeSidebarItem IconOrImg={Lightbulb} title="Learning" url="/learning" />
                <LargeSidebarItem IconOrImg={Shirt} title="Fashion & Beauty" url="/fashion-beauty" />
                <LargeSidebarItem IconOrImg={Podcast} title="Podcasts" url="/podcasts" />
            </LargeSidebarSection>
        </aside>
    </>
}

type SmallSidebarItemProps = {
    Icon: ElementType,
    title: string,
    url: string
}

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
    return (
        <a href={url} className={twMerge(buttonStyles({ variant: "ghost" }), "py-4 px-1 flex flex-col items-center rounded-lg gap-1")}>
            <Icon className="h-6 w-6" />
            <div className="text-sm">{title}</div>
        </a>
    )
}

type LargeSidebarSectionProps = {
    children: ReactNode
    title?: string
    visibleItemCount?: number
}

function LargeSidebarSection({ children, title, visibleItemCount = Number.POSITIVE_INFINITY }: LargeSidebarSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const childrenArray = Children.toArray(children).flat()
    const showExpandButton = childrenArray.length > visibleItemCount;
    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount);
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

    return <div>
        {title &&
            <div className="ml-4 mt-2 text-lg mb-1">{title}</div>
        }
        {visibleChildren}
        {showExpandButton && (
            <Button onClick={() => setIsExpanded(e => !e)} variant="ghost" className="w-full flex items-center rounded-lg gap-4 p-3">
                <ButtonIcon className="w-6 h-6" />
                <div>{isExpanded ? "Show Less" : "Show More"}</div>
            </Button>
        )}
    </div>
}

type LargeSidebarItemProps = {
    IconOrImg: ElementType | string,
    title: string,
    url: string,
    isActive?: boolean
}
function LargeSidebarItem({ IconOrImg, title, url, isActive }: LargeSidebarItemProps) {
    return <a href={url} className={twMerge(buttonStyles({ variant: "ghost" }), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined}`)}>
        {typeof (IconOrImg) == "string" ?
            <img src={IconOrImg} alt="" className="h-6 w-6 rounded-full" /> :
            <IconOrImg className="h-6 w-6" />
        }
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
    </a>
}
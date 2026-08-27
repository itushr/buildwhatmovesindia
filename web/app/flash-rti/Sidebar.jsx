import { ChevronRight, ChevronRightSquareIcon, EllipsisVertical, Expand, Search } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="w-75 shadow-[inset_-0.1px_0_0_0_#000000] h-dvh">
            <div className="shadow-[inset_0_-0.1px_0_0_#000000] h-15 flex items-center px-3 gap-1">
                <Link href="/">
                    <span className="uppercase hover:underline cursor-pointer">RTI Online</span>
                </Link>
                <ChevronRight />
                <span>flashRTI</span>
            </div>
            <div className="p-3">
                <div>
                    <p className="text-gray-500 text-sm font-semibold">Account</p>
                    <div className="shadow-[inset_0_0_0_0.5px_#aaa] rounded-lg px-3 py-2 mt-2 text-sm text-gray-500 flex gap-2 justify-between items-center">
                        <span className="flex-1 overflow-hidden">testuser@gmail.com</span>
                        <EllipsisVertical size={15} />
                    </div>
                </div>
                <div className="mt-5">
                    <p className="text-gray-500 text-sm font-semibold">History</p>
                    <div className="mt-2 bg-white shadow-[inset_0_0_0_0.5px_#aaa] rounded-lg w-full px-3 py-2 text-sm flex items-center gap-2">
                        <Search size={15} className="stroke-gray-500" />
                        <input className="flex-1 outline-none" placeholder="Search by title/query" />
                    </div>
                    <div className="flex flex-col gap-1 mt-3 text-gray-800">
                        <HistoryItem title="New Session" active={true} />
                        <HistoryItem title="Income tax MH" />
                        <HistoryItem title="Corporate tax 2025-25" />
                        <HistoryItem title="This is super long title need to be handled" />
                    </div>
                </div>
            </div>
        </div>
    )
}

const HistoryItem = ({ active, title }) => {
    return (
        <div
            className={`text-sm p-2 hover:bg-slate-200/50 rounded-sm cursor-pointer ${active && "bg-slate-200/50"
                }`}
        >
            <p>{title.length > 35 ? title.slice(0, 35) + "..." : title}</p>
        </div>
    )
}
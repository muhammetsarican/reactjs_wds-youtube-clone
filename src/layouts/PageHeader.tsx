import { Menu } from "lucide-react";
import logo from "../assets/react.svg"

export function PageHeader(){
    return (
        <div className="flex gap-10 lg:gap-20 justify-between">
            <div className="flex gap-4 items-center flex-shrink-0">
                <button>
                    <Menu />
                </button>
                <a href="">
                    <img src={logo} alt="" />
                </a>
            </div>
            <div></div>
            <div></div>
        </div>
    )
}
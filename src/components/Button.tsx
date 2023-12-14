import { cva } from "class-variance-authority"

const buttonStyles=cva(["hover:bg-secondary-hover", "transition"])

export function Button(){
    return <button />
}
export enum Auth {
    admin, // 어드민
    user,  // 매니저
    guest  // 뷰어
}

export interface IGNBButtonProps {
    buttonText : string
    active : boolean
    onClick : () => void
}

export interface IGNBIndex {
    index : number
}
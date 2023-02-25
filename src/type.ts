export enum Auth {
    admin, // 어드민
    user,  // 매니저
    viewer  // 뷰어
}

export interface IGNBButtonProps {
    buttonText : string
    active : boolean
    onClick : () => void
    type: "title" | "GNB" | "user"
    buttonId: string
}

export interface IGNBIndex {
    index : number
}

export interface IBaseResponse<T> {
    content: Array<T>
    size: number
    total_elements:number
    total_pages: number 
    last?: boolean
    number?: number
    first?: boolean
    empty?: boolean
    number_of_elements?:number
}

export interface IGetRequestParams {
    page:number
    size:number
}
export interface IGetCampaignData {
    id:number
    name: string
    enabled:boolean
    campaign_objective:CampaignObjectiveType
    impressions:number
    clicks:number
    ctr:number
    video_views:number
    vtr:number
}
export interface IGetUserData {
    id:number
    name: string
    email:string
    last_login_at:string
}
export interface IUserModalProps {
    isOpen: boolean
    toggle: ()=> void
    user?:IGetUserData
}

export interface IUserModalForm {
    inputId:string
    inputPW: string
    inputConfirmPW: string
    inputName:string
}

export type CampaignObjectiveType = "WEBSITE_CONVERSIONS" |
"WEBSITE_TRAFFIC"|
"SALES"|
"APP_INSTALLATION"|
"LEAD"|
"BRAND"|
"VIDEO_VIEWS"
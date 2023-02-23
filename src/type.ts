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
}

export interface IGetCampaignDataRequestParams {
    page:number
    size:number
}
export interface IGetCampaignData {
    id:number
    name: string,
    enabled:boolean,
    campaign_objective:string,
    impressions:number,
    clicks:number,
    ctr:number,
    video_views:number,
    vtr:number
}
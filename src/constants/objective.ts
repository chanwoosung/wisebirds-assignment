import { CampaignObjectiveType } from "../type";

export const CAMPAIGN_OBJECTIVE = {
    "WEBSITE_CONVERSIONS": "웹사이트 전환",
    "WEBSITE_TRAFFIC": "웹사이트 트래픽",
    "SALES": "판매",
    "APP_INSTALLATION": "앱설치",
    "LEAD": "리드",
    "BRAND": "브랜드 인지도 및 도달 범위",
    "VIDEO_VIEWS": "동영상 조회",
} as {[key in CampaignObjectiveType] : string}
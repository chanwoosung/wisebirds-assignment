import { IGetCampaignData, IBaseResponse } from './../type';
export const campaignData:IBaseResponse<IGetCampaignData> = {
    "content":[
       {
          "id":1,
          "name":"캠페인1",
          "enabled":true,
          "campaign_objective":"WEBSITE_TRAFFIC",
          "impressions":384057,
          "clicks":1974,
          "ctr":0.8752,
          "video_views":948,
          "vtr":0.95123
       },
       {
          "id":2,
          "name":"캠페인2",
          "enabled":true,
          "campaign_objective":"LEAD",
          "impressions":705575,
          "clicks":6726,
          "ctr":0.8733,
          "video_views":40,
          "vtr":0.135
       },
       {
          "id":3,
          "name":"캠페인3",
          "enabled":true,
          "campaign_objective":"LEAD",
          "impressions":538086,
          "clicks":1171,
          "ctr":0.3833,
          "video_views":512,
          "vtr":0.2512
       },
    ],
    "size": 25,
    "total_elements": 2,
    "total_pages": 1, 
}
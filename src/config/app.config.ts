export type AppConfig = {
  branchKey: string;
  branchIODesktopUrl: string;
  branchIOAndroidUrl: string;
  secretKey: string;
  isUATServer: boolean;
  cleverTabAccountId: any;
  cleverTabAccountToken: any;
  cleverTabAccountRegion: any;
};

const appConfig: AppConfig = {
  branchKey:
    process.env.NEXT_PUBLIC_UAT_SERVER === "True"
      ? process.env.NEXT_PUBLIC_UAT_BRANCH_KEY || ""
      : process.env.NEXT_PUBLIC_PROD_BRANCH_KEY || "",
  branchIODesktopUrl:
    process.env.NEXT_PUBLIC_UAT_SERVER === "True"
      ? process.env.NEXT_PUBLIC_UAT_BRANCH_IO_DESKTOP_URL || ""
      : process.env.NEXT_PUBLIC_PROD_BRANCH_IO_DESKTOP_URL || "",
  branchIOAndroidUrl:
    process.env.NEXT_PUBLIC_UAT_SERVER === "True"
      ? process.env.NEXT_PUBLIC_UAT_BRANCH_IO_ANDROID_URL || ""
      : process.env.NEXT_PUBLIC_PROD_BRANCH_IO_ANDROID_URL || "",
  secretKey: process.env.NEXT_PUBLIC_BRANCH_IO_SECRET_KEY || "",
  isUATServer: process.env.NEXT_PUBLIC_UAT_SERVER === "True",
  cleverTabAccountId: process.env.NEXT_PUBLIC_CLEVERTAP_ACCOUNT_ID,
  cleverTabAccountToken: process.env.NEXT_PUBLIC_CLEVERTAP_ACCOUNT_TOKEN,
  cleverTabAccountRegion: process.env.NEXT_PUBLIC_CLEVERTAP_REGION,
};

export const base_uri = process.env.NEXT_PUBLIC_API_BASE_URL;
export const job_listing_base_uri = process.env.NEXT_PUBLIC_JOBLISTING_BASE_URL;
export const google_map_api_key = process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY;

export default appConfig;

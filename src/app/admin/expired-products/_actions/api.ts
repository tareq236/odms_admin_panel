import { FetchApiJSON } from "@/lib/helper";

const expiredAPI = new FetchApiJSON();
expiredAPI.setBaseUrl(process.env.NEXT_PUBLIC_EXPIRED_PRODUCT_API as string);

export { expiredAPI };

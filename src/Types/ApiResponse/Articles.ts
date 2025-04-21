interface ArticleResponse {
    code: number,
    result: {
        articles: ArticleCard[],
        total_articles: number
    }
}
interface ArticleCard {
    cover_photo: "https://kaam-uat-files.s3.ap-south-1.amazonaws.com/kaampedev/companyLogo/articles_1.png",
    id: "4",
    name: "Sreeradha Basu",
    posted_date: "2025-03-07",
    short_description: "Among Tier-1 cities, Delhi/NCR leads the hiring for women, with its job share increasing from 21% in February 2024 to 22% in February 2025.",
    title: "Job opportunities for women surge by 48% in 2025: Report",
    user_photo: "",
}
interface ArticleDetail extends ArticleCard{
    description: any
}
interface ArticleDetailResponse{
    code: number;
    result:{
        article: any;
        featured_articles: ArticleCard[]
    }
}
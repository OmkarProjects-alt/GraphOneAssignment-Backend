import { getNews, getTrendingNews } from "../services/news.service.js";
export const listNews = async (req, res) => {
    const result = await getNews(req.query);
    res.json({
        data: result.data,
        meta: result.meta,
        error: null,
    });
};
export const trendingNews = async (req, res) => {
    const data = await getTrendingNews();
    res.json({
        data,
        meta: null,
        error: null,
    });
};
//# sourceMappingURL=news.controller.js.map
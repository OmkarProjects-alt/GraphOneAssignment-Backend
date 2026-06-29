import type { Request, Response } from "express";
import { getNews, getTrendingNews } from "../services/news.service.js";

export const listNews = async (
  req: Request,
  res: Response
) => {

  const result = await getNews(req.query);

  res.json({
    data: result.data,
    meta: result.meta,
    error: null,
  });

};

export const trendingNews = async (
  req: Request,
  res: Response
) => {

  const data = await getTrendingNews();

  res.json({
    data,
    meta: null,
    error: null,
  });

};
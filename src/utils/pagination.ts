export const getPagination = (query: any) => {
  const page = Math.max(parseInt(query.page as string) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit as string) || 10, 1), 100);

  const skip = (page - 1) * limit;

  return { page, limit, skip };
};
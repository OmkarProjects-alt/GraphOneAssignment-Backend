export const buildCompanyFilters = (query: any) => {
  const {
    category,
    stage,
    country,
    search,
    minFunding,
    maxFunding,
  } = query;

  return {
    ...(category && { category }),
    ...(stage && { stage }),
    ...(country && { hqCountry: country }),

    ...(search && {
      name: {
        contains: search,
        mode: "insensitive",
      },
    }),

    ...(minFunding || maxFunding
      ? {
          fundingTotal: {
            ...(minFunding && { gte: BigInt(minFunding) }),
            ...(maxFunding && { lte: BigInt(maxFunding) }),
          },
        }
      : {}),
  };
};
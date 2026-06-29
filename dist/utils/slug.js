import slugify from "slugify";
export const generateSlug = (name) => slugify(name, {
    lower: true,
    strict: true,
    trim: true,
});
//# sourceMappingURL=slug.js.map
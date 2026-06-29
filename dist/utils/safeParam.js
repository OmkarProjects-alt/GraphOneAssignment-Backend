export const getStringParam = (req, key) => {
    const value = req.params[key];
    if (!value || Array.isArray(value))
        return null;
    return value;
};
//# sourceMappingURL=safeParam.js.map
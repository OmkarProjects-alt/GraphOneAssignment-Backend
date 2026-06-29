import type { Request } from "express";

export const getStringParam = (req: Request, key: string): string | null => {
    const value = req.params[key];

    if(!value || Array.isArray(value)) return null;

    return value;
}
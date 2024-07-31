import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array();
    const invalidFields = errors.reduce((err, curr: any) => {
        const key = curr.param || curr.location || '';
        return { ...err, [key]: [...(err[key] || []), curr.msg] };
    }, {} as Record<string, string[]>);
    errors.length > 0 ? res.status(400).json({ message: 'Validation failed', invalidFields }) : next();
};
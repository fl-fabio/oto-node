import { body, ValidationChain } from "express-validator";
import { GenderEnum } from "../../types/gender.enum";
import { ROLE } from "../../types/role.enum";

export const userValidationRules: ValidationChain[] = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .bail()
        .isString()
        .withMessage('Name must be a string')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long')
        .bail()
        .isLength({ max: 50 })
        .withMessage('Name must be at most 50 characters long')
        .bail(),

    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Email must be a valid email address')
        .bail(),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .bail()
        .isString()
        .withMessage('Password must be a string')
        .bail()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .bail()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
        .bail(),

    body('gender')
        .optional()
        .bail()
        .isString()
        .withMessage('Gender must be a string')
        .bail()
        .custom(value => Object.values(GenderEnum).includes(value))
        .withMessage('Gender must be one of the following: MALE, FEMALE, OTHER, NOTPROVIDED')
        .customSanitizer(value => value ? value.toUpperCase() : GenderEnum.NOTPROVIDED),

    body('role')
        .notEmpty()
        .withMessage('Role is required')
        .bail()
        .isString()
        .withMessage('Role must be a string')
        .bail()
        .isIn(Object.values(ROLE))
        .withMessage('Role must be one of the following: ADMIN, USER, GUEST, CEO, DIRECTOR, MANAGER, EMPLOYEE, CUSTOMER')
        .bail()
        .customSanitizer(value => value ? value.toUpperCase() : ROLE.USER)
];

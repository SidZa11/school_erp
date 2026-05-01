import { formErrorHandler } from "@middlewares/error.middleware";
import { userCreation } from "@services/user/createUser.service";
import { userList } from "@services/user/userList.service";
import { NextFunction, Request, Response } from "express";




export const getUserList = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const result = await userList(req);
        res.json(result);
    } catch (error) {
        console.log("Failed to get user list: ", error)
    }
};


export const createUser = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const result = await userCreation(req);
        res.json(result);
    } catch (error) {
        formErrorHandler(error, res);
    }
}
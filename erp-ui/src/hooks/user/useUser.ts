import { useState } from "react";
import api from "../../api/api";



type ListRequest = {
    search : string;
    active : number;
    page : number;
    pageSize : number;
}

type ListResponse = {
    iu_ID : number;
    iu_UserID : string;
    iu_Username: string;
    PasswordHash: string;
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    Gender: String;
    iu_RoleID: number;
    RoleName: String;
    IsActive: boolean;
    IsApproved: number;
    ApprovedDate: Date;
    ApprovedBy: number;
    Remark: String;
    CreatedDate: Date;
    DOB : Date;
}

type PaginationResponse = {
    TotalPages: number;
    PageNumber: number;
    PageSize: number;
}

type UserFormData = {
    iu_Username: string;
    FirstName: string;
    LastName: string;
    Gender: 'M' | 'F' | 'O'; // You can adjust or expand as needed
    DOB: string; // ISO format string like '2025-03-31T18:30:00.000Z'
    iu_UserID: string;
    iu_RoleID: number;
    PasswordHash: string;
    Email: string;
    PhoneNumber: string;
    IsActive: 0 | 1;
  };

export const useUser = () => {
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState< {status : number, message: string} | null>(null);

    const getUserList = async ({
        search,
        active,
        page,
        pageSize
    } : ListRequest) : Promise<{status : number, message: string, pagination : PaginationResponse, data : ListResponse[]} | undefined> => {
        
        setLoading(true);
        setError(null);
        try {
            const response = await api.post<{status : number, message: string, pagination : PaginationResponse, data : ListResponse[]}>('/user/getList', {
                search,
                active,
                page,
                pageSize
            });
            return {
                status: response.data.status,
                message: response.data.message,
                pagination: response.data.pagination,
                data : response.data.data
            }
        } catch (error : any) {
            setError({
                status : error?.response?.data?.status || 400,
                message: error?.response?.data?.message || 'Database Error!'
            })
        } finally {
            setLoading(false);
        }
    };

    const createUser = async ({
        iu_Username,
        FirstName,
        LastName,
        Gender,
        DOB,
        iu_UserID,
        iu_RoleID,
        PasswordHash,
        Email,
        PhoneNumber,
        IsActive
    } : UserFormData) : Promise<{status : number, message: string} | undefined> => {
        
        setLoading(true);
        setError(null);
        try {
            const response = await api.post<{status : number, message: string}>('/user/createUser', {
                iu_Username,
                FirstName,
                LastName,
                Gender,
                DOB,
                iu_UserID,
                iu_RoleID,
                PasswordHash,
                Email,
                PhoneNumber,
                IsActive
            });
            return {
                status: response.data.status,
                message: response.data.message
            }
        } catch (error : any) {
            setError({
                status : error?.response?.data?.status || 403,
                message: error?.response?.data?.message || 'Internal Server Error!'
            })
        } finally {
            setLoading(false);
        }
    };

    return {
        getUserList,
        createUser,
        loading,
        error
    }
}

export interface Error {
    message: string;
}

export interface APIResponse<D> {
    StatusCode:6000 | 6001;
    data:{
        title: string;
        message?: string;
        data?:D;
    }
}
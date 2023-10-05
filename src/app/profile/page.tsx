import LogoutButton from '@/components/shared/LogoutButton'
import { UserType } from '@/models/user';
import { APIResponse } from '@/types/api'
import axios from 'axios'


const fetchData = async ()=>{
    let error;
    let data: UserType | null = null;

    try {
        const res = await axios.get("/api/v1/profile")
        const { StatusCode,data:profileData }: APIResponse<UserType> = await res.data

        if (StatusCode === 6000){
            
            if (profileData.data){
                data = profileData.data
            }    
        }else{
            error = profileData.message
        }
    } catch (err: any) {
        error = err.message
    }

    return { error, data };
}

const Profile = async () => {
    const { data, error } = await fetchData()
    

    return (
        <div 
            className="flex justify-center items-center h-[100vh] flex-col"
        >
            <h4 className="mb-2">
                {data && data.name}
                {error && error}
            </h4>
            <LogoutButton />
        </div>
    )
}

export default Profile
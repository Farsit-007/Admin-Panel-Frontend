import UpdateProfile from "@/components/modules/profile/update-profile/UpdateProfile";
import { getMe } from "@/services/AuthServices";

const page = async() => {
    const {data} = await getMe()
    return (
        <div className="min-h-[60vh] flex justify-center items-center">
            <UpdateProfile data={data}/>
        </div>
    );
};

export default page;
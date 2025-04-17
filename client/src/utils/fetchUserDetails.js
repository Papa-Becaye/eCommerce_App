import Axios from "./Axios";
import summaryApi from "../common/SummaryApi";

const fetchUserDetails = async () => {
    try {
        const res = await Axios({
            ...summaryApi.userDetails,
        });
        return res.data.data;
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
    }
}

export default fetchUserDetails;
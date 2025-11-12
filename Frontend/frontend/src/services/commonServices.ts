import { COMMON_API } from '@/apiConstants/commonApi'
import axios from '../config/axiosConfig'

export const verifyToken = async () => {
    try {
       return await axios.post(COMMON_API.VERIFY_TOKEN)
    } catch (error) {
        throw error
    }
}
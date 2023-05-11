import { useEffect, useState } from "react"
import axios from "axios"

const useFetch = (url, accessToken) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`https://bookingapiv1.onrender.com/api` + url, { headers: { token: `Bearer ${accessToken}` } })
                setData(res.data)
            }
            catch (err) {
                setError(true)
            }
            setLoading(false)
        }
        fetchData()
    }, [url, accessToken])


    const reFetch = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`https://bookingapiv1.onrender.com/api` + url);
            // const res = await axios.get(url);
            setData(res.data)
        }
        catch (err) {
            setError(true)
        }
        setLoading(false)
    }
    return { data, loading, error, reFetch }
}

export default useFetch
import { useCallback } from "react";
const f1 = () => {
    console.log(1);
    return null;
}
export const useHttp = () => {
    // const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = f1(), headers = {'Content-Type': 'application/json'}) => {

        // setProcess('loading');

        try {
            const response = await fetch(url, {method, body, headers});
            console.log(method)
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            // if (method === 'DELETE') {
               
            // }
            const data = await response.json();
            return data;
        } catch(e) {
            // setProcess('error');
            throw e;
        }
    }, []);

    // const clearError = useCallback(() => {
        // setProcess('loading');
    // }, []);

    return {request, 
            // clearError, 
            // process, 
            // setProcess
        }
}
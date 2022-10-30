type PropertiesFetch<U> = {
    isLoading: boolean;
    error: null | U;
};
type UseFetchReturn<T, U> = {
    data: null | T;
    properties: PropertiesFetch<U>;
};
const useFetch = async <T, U extends object>(
    url: string,
    config: object = {}
): Promise<UseFetchReturn<T, U>> => {
    let data = null;
    let isLoading = true;
    let error = null;

    const fetchData = async () => {
        try {
            const response = await fetch(
                `http://localhost:4000/api${url}`,
                config
            );
            const result = await response.json();
            data = result;
        } catch (error: unknown) {
            const { message } = error as Error;
            error = message;
        }
        isLoading = false;
    };

    await fetchData();

    return { data, properties: { isLoading, error } };
};

export default useFetch;

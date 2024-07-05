import { useEffect, useState } from "react"


export const useDebounce = <T>(value: T, delay=500) => {
    const [debouncedValue, setDebouncedvalue] = useState<T>(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedvalue(value)
        }, delay);

        return () => {
            clearTimeout(timeout);
        }
    }, [value, delay])

    return debouncedValue
}
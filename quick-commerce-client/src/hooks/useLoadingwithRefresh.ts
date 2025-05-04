import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/user.slice';
import { User } from '../types';
import { refresh } from '../http/auth';

export function useLoadingWithRefresh() {
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRefreshToken = async () => {
            try {
                const response: AxiosResponse = await refresh();
                const { data: user }: { data: User } = response.data;
                dispatch(setUser(user));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching refresh token:', error);
                setLoading(false);
            }
        };

        fetchRefreshToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { loading };
}

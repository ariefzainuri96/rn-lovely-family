import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../../hooks/networking/use-axios';
import { ImageResponse } from '../types/image-response';

export function useDashboard() {
  const axios = useAxios();

  const queryImage = useQuery({
    queryKey: ['image'],
    queryFn: async () => {
      return (await axios.get<ImageResponse>('/image/')).data.data;
    },
  });

  return {
    queryImage,
  };
}

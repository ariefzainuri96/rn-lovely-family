import { MenuModel } from '@/features/(app)/index/types/menu-model';
import IcManajemenInventaris from '@/assets/icons/ic-manajemen-inventaris.svg';
import IcManajemenBarangPakaiHabis from '@/assets/icons/manajemen-barang-habis-pakai.svg';
import IcManajemenAset from '@/assets/icons/manajemen-aset.svg';
import IcTaskApproval from '@/assets/icons/ic-task-approval.svg';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../../hooks/networking/use-axios';
import { PengumumanResponse } from '@/features/(app)/index/types/pengumuman-response';

export function useDashboard() {
  const axios = useAxios();
  const menus: MenuModel[] = [
    {
      title: 'Manajemen Inventaris',
      icon: IcManajemenInventaris,
      bgColor: '#438AF7',
    },
    {
      title: 'Manajamen Barang Pakai Habis',
      icon: IcManajemenBarangPakaiHabis,
      bgColor: '#5856D6',
    },
    {
      title: 'Manajemen Aset',
      icon: IcManajemenAset,
      bgColor: '#06B6D4',
    },
    {
      title: 'Task Approval',
      icon: IcTaskApproval,
      bgColor: '#1FA836',
    },
  ];

  const queryPengumuman = useQuery({
    queryKey: ['pengumuman'],
    queryFn: async () => {
      return (await axios.get<PengumumanResponse>('/pengumuman')).data.data;
    },
  });

  return {
    menus,
    queryPengumuman,
  };
}

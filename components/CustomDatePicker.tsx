import React from 'react';
import Column from './Column';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { twMerge } from 'tailwind-merge';
import Row from './Row';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

type CustomDatePickerProps = {
  label?: string;
  enable?: boolean;
  value?: Date;
  className?: string;
  dateFormat?: string;
  onDateChange: (value: Date) => void;
};

export default function CustomDatePicker({
  label,
  onDateChange,
  value,
  enable = true,
  className,
  dateFormat,
}: CustomDatePickerProps) {
  const [show, setShow] = React.useState(false);

  return (
    <Column className={className}>
      {label && <Text className='sfPro400-14 line-clamp-1 leading-none text-gray3'>{label}</Text>}
      <TouchableOpacity onPress={() => setShow(true)}>
        <Row
          className={twMerge(
            'mt-1 h-[3.25rem] w-full gap-2 rounded-[4px] border border-[#E0E0E0] px-4',
            !enable && 'bg-[#F8F8F8]'
          )}
        >
          <Text className='sfPro300-14 line-clamp-1 flex-1 leading-none'>
            {format(value ?? new Date(), dateFormat ?? 'dd/MM/yyyy') ?? `Pilih ${label}`}
          </Text>
          <Ionicons name='chevron-down' size={16} color='#333333' />
        </Row>
      </TouchableOpacity>
      {show && (
        <RNDateTimePicker
          value={value ?? new Date()}
          mode='date'
          display='default'
          onChange={(_, date) => {
            setShow(false);
            if (date) onDateChange(date);
          }}
        />
      )}
    </Column>
  );
}

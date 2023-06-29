import React from 'react'
import {DateRange, DayContentProps, DayPicker, SelectRangeEventHandler} from 'react-day-picker';

import 'react-day-picker/dist/style.css';
import styles from './RangeDatePicker.module.scss';

interface IProps {
    selected?: DateRange
    change: (range?: DateRange) => void
}

const RangeDatePicker: React.FC<IProps> = ({ selected, change }) => {
    const handleChange: SelectRangeEventHandler = (newDateRange) => {
        change(newDateRange);
    }

    const DayContent = (day: DayContentProps) => {
        const {date} = day;

        return (
            <div className={styles.dayCell}>
                <div>{date.getDate()}</div>
                <div className={styles.price}>${20 + date.getDate()}</div>
            </div>
        )
    }

    const nextYear = () => {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);

        return date;
    }

    return (
        <div className={styles.wrapper}>
            <DayPicker
                mode={'range'}
                modifiers={{ from: { after: new Date() } }}
                disabled={[
                    new Date(2023, 5, 12),
                    {
                        after: nextYear(),
                        before: new Date(),
                    },
                ]}
                defaultMonth={selected?.from}
                numberOfMonths={window.innerWidth > 768 ? 2 : 12}
                pagedNavigation={false}
                selected={selected}
                onSelect={handleChange}
                components={{
                    DayContent
                }}
            />
        </div>
    );
}

export default RangeDatePicker;

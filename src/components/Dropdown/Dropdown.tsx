import React, {useState} from 'react'
import {DateRange} from 'react-day-picker';

import RangeDatePicker from '../RangeDatePicker';
import { initialDateRangeState } from '../../App';

import styles from './Dropdown.module.scss'

interface IProps {
    close: () => void
    apply: (dates: DateRange) => void
    selected: DateRange
}

const Dropdown: React.FC<IProps> = ({ close, apply, selected }) => {
    const [dates, setDates] = useState<DateRange>(selected || initialDateRangeState)
    const [tab, setTab] = useState<'range' | 'flexible'>('range')

    const handleRangeChange = (newDateRange?: DateRange) => {
        if (!newDateRange) {
            setDates(initialDateRangeState)
        } else if (
            newDateRange?.from &&
            dates?.from &&
            newDateRange.from < dates.from
        ) {
            setDates({ from: newDateRange.from, to: undefined })
        } else {
            setDates(newDateRange)
        }
    }

    const handleApply = () => {
        apply(dates)
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.tabs}>
                    <div
                        className={`${styles.tab} ${tab === 'range' ? styles.tabActive : ''}`}
                        onClick={() => setTab('range')}>
                        Choose dates
                    </div>
                    <div
                        className={`${styles.tab}  ${tab === 'flexible' ? styles.tabActive : ''}`}
                        onClick={() => setTab('flexible')}>
                        I&apos;m flexible
                    </div>
                </div>

                <RangeDatePicker selected={dates} change={handleRangeChange} />

                <div className={styles.footer}>
                    <button className={styles.buttonCancel} onClick={close}>Cancel</button>
                    <button className={styles.buttonSave} onClick={handleApply}>Apply</button>
                </div>
            </div>
            <div className={styles.backdrop} onClick={close}></div>
        </>
    )
}

export default Dropdown

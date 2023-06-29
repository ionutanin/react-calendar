import React, {useState} from 'react'
import {DateRange} from 'react-day-picker';

import RangeDatePicker from '../RangeDatePicker';
import Flexible from '../Flexible';
import {IFlexibleDates, initialDateRange, initialFlexibleDates} from '../../App';

import styles from './Dropdown.module.scss'

interface IProps {
    close: () => void
    apply: (dates: DateRange) => void
    applyFlexible: (dates: IFlexibleDates) => void
    selected: DateRange
    selectedFlexible: IFlexibleDates
    type: 'range' | 'flexible'
}

const Dropdown: React.FC<IProps> = ({ close, apply, applyFlexible, selected, selectedFlexible, type }) => {
    const [dates, setDates] = useState<DateRange>(selected || initialDateRange)
    const [tab, setTab] = useState<'range' | 'flexible'>(type || 'range')
    const [flexibleDates, setFlexibleDates] = useState<IFlexibleDates>(selectedFlexible || initialFlexibleDates)

    const handleRangeChange = (newDateRange?: DateRange) => {
        if (!newDateRange) {
            setDates(initialDateRange)
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

    const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name} = event.target;

        setFlexibleDates(prevState => {
            if (prevState.months.includes(name))
                return {
                    ...prevState,
                    months: prevState.months.filter(month => month !== name),
                };
            else return {
                ...prevState,
                months: [...prevState.months, name],
            };
        });
    }

    const handleSelectedRange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setFlexibleDates(prevState => ({
            ...prevState,
            range: value,
        }));
    }

    const handleApply = () => {
        apply(dates)
        if (tab === 'flexible') {
            applyFlexible(flexibleDates)
        } else {
            apply(dates)
        }
    }

    const changeTab = (tab: 'range' | 'flexible') => () => {
        setTab(tab);
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.tabs}>
                    <div
                        className={`${styles.tab} ${tab === 'range' ? styles.tabActive : ''}`}
                        onClick={changeTab('range')}>
                        Choose dates
                    </div>
                    <div
                        className={`${styles.tab}  ${tab === 'flexible' ? styles.tabActive : ''}`}
                        onClick={changeTab('flexible')}>
                        I&apos;m flexible
                    </div>
                </div>

                {tab === 'range' && <RangeDatePicker selected={dates} change={handleRangeChange} />}
                {tab === 'flexible' && (
                    <Flexible
                        selected={flexibleDates}
                        changeMonths={handleMonthChange}
                        changePeriod={handleSelectedRange}
                    />
                )}

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

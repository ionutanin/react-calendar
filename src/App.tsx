import React, {useMemo, useState} from 'react';

import {Dropdown} from './components/Dropdown';

import styles from './App.module.scss';
import {DateRange} from 'react-day-picker';

export const initialDateRange: DateRange = {
    from: undefined,
    to: undefined,
}

export interface IFlexibleDates {
    months: string[]
    range: string
}

export const initialFlexibleDates: IFlexibleDates = {
    months: [],
    range: '',
}

const App: React.FC = () => {
    const [selected, setSelected] = useState(initialDateRange)
    const [flexible, setFlexible] = useState(initialFlexibleDates)
    const [dropdown, setDropdown] = useState(false)
    const [selectType, setSelectType] = useState<'range' | 'flexible'>('range')

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

    const applyDates = (dates: DateRange) => {
        setFlexible(initialFlexibleDates)
        toggleDropdown()

        if (selectType !== 'range')
            setSelectType('range');

        setSelected(dates);
    }

    const applyFlexibleDates = (dates: IFlexibleDates) => {
        setSelected(initialDateRange)
        toggleDropdown()

        if (selectType !== 'flexible')
            setSelectType('flexible');

        setFlexible(dates);
    }

    const formattedDates = useMemo(() => {
        if (selected.from && selected.to) {
            const from = selected.from.toLocaleDateString()
            const to = selected.to.toLocaleDateString()

            return `${from} - ${to}`
        }

        if (flexible.months.length > 0 && flexible.range) {
            const months = flexible.months.join(', ')
            const range = flexible.range

            return `${range} - ${months}`
        }

        return 'Select dates'
    }, [selected, flexible]);

    console.log(flexible)

    return (
        <div className={styles.wrapper}>
            <div className={styles.picker} onClick={toggleDropdown}>{formattedDates}</div>
            {dropdown && (
                <Dropdown
                    type={selectType}
                    close={toggleDropdown}
                    apply={applyDates}
                    applyFlexible={applyFlexibleDates}
                    selected={selected}
                    selectedFlexible={flexible}
                />
            )}
        </div>
    );
}

export default App;

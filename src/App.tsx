import React, {useMemo, useState} from 'react';

import {Dropdown} from './components/Dropdown';

import styles from './App.module.scss';
import {DateRange} from 'react-day-picker';

export const initialDateRangeState: DateRange = {
    from: undefined,
    to: undefined,
}

const App: React.FC = () => {
    const [selected, setSelected] = useState(initialDateRangeState)
    const [dropdown, setDropdown] = useState(false)

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

    const applyDates = (dates: DateRange) => {
        toggleDropdown()
        setSelected(dates)
        console.log('dates', dates)
    }

    const formattedDates = useMemo(() => {
        if (!selected.from || !selected.to) {
            return 'Select dates'
        }

        const from = selected.from.toLocaleDateString()
        const to = selected.to.toLocaleDateString()

        return `${from} - ${to}`
    }, [selected]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.picker} onClick={toggleDropdown}>{formattedDates}</div>
            {dropdown && <Dropdown close={toggleDropdown} apply={applyDates} selected={selected} />}
        </div>
    );
}

export default App;

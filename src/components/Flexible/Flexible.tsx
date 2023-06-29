import React, {memo} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import { getMonthNamesForOneYear } from '../../utils';

import 'swiper/swiper.css';
import styles from './Flexible.module.scss'

const range = ['3 days', 'week', '2 weeks+'];

interface IProps {
    selected: {
        range: string
        months: string[]
    }
    changeMonths: (event: React.ChangeEvent<HTMLInputElement>) => void
    changePeriod: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Flexible: React.FC<IProps> = ({ selected, changeMonths, changePeriod }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.section}>
                <div className={styles.title}>How long would like to travel?</div>
                <div className={styles.range}>
                    {range.map((item, index) => (
                        <label className={`${styles.option} ${selected.range === item ? styles.activeOption : ''}`} key={index}>
                            <input
                                type="radio"
                                name="range"
                                value={item}
                                checked={selected.range === item}
                                onChange={changePeriod}
                            />
                            <span>{item}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.title}>When would you like to travel?</div>
                <Swiper
                    spaceBetween={16}
                    navigation
                    slidesPerView={'auto'}
                >
                    {getMonthNamesForOneYear().map(({month, year}, index) => (
                        <SwiperSlide key={index}>
                            <label className={`${styles.option} ${selected.months.includes(`${month}-${year}`) ? styles.activeOption : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={selected.months.includes(`${month}-${year}`)}
                                    name={`${month}-${year}`}
                                    onChange={changeMonths}
                                />
                                <div>
                                    <b>{month}</b>
                                    <span>{year}</span>
                                </div>
                            </label>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>
    )
}

export default memo(Flexible);

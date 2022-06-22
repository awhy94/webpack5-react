import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import moment from 'moment';

import qrcodeImg from '../../asset/images/qrcode.jpg';

import Test from '../test/test';
import("../sync-test/syncTest");

import VirtualList from './virtualized';

import { aUtil1 } from '../utils';

import css from './index.scss';

const App = (props: any) => { 
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(0);

    // useEffect(() => { 
    //     setIsLoading(true);
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 2000)
    // }, [])
    
    /**
     * clickCount 事件
     */
    const clickCount = () => { 
        dayjs('2018-08-08');
        moment('2018-08-08')

        console.log('wenai-onclick088');
        const num = aUtil1();
        const newCount = count + num;
        setCount(newCount)

        const arr = [1, 2, 3];
        console.log('wenai--arr', arr.at(-1))

        Promise.resolve().finally();

        const p = new Promise((resolve, reject) => {
            resolve(100);
        })

        const q = new Promise((resolve, reject) => {
            resolve(100);
        })
    }

    return <div className={css.appWrap}>
        {/* {isLoading ? 'loading' : '1123'} */}
        <div className={css.box}>test开始22</div>
        <div onClick={clickCount} >click44{count}</div>
        {/* <img src={qrcodeImg} alt="" /> */}

        <Test />

        <VirtualList />

        23
    </div>
}

export default App;

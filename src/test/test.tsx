import React, { useEffect, useState } from 'react';

import css from './test.scss';

const Test = (props: any) => { 

    const testFun = () => { 
        const num = 3;
        const p = new Promise((resolve, reject) => {
            resolve(100);
        })
        return num;
    }

    return <div className={css.boxBFC} onClick={testFun}>
            <div className={css.box1}>1</div>
            <div className={css.box2}>2</div>
        </div>
}

export default Test;

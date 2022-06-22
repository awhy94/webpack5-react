import React, { useEffect, useState } from 'react';

import css from './test.scss';

const SyncTest = (props: any) => { 

    const testFun = () => { 
        return 5;
    }

    return <div className={css.boxBFC} onClick={testFun}>
            <div className={css.box1}>1</div>
            <div className={css.box2}>2</div>
        </div>
}

export default SyncTest;

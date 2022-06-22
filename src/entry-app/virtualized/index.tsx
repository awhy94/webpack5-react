import React, { useEffect, useState } from 'react';

// import { List as VList, AutoSizer } from 'react-virtualized';
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";

import qrcodeImg from '../../../asset/images/qrcode.jpg';

import css from './index.scss';

const VirtualList = (props: any) => { 
    const [list, setList] = useState([]);

    useEffect(() => {
        const _data = [];

        for (let i = 0; i < 100000; i++) {
            _data.push({ id: i, name: `字段${i}`, value: `哈哈哈大笑${i}` })
        }

        setList(_data)
    }, []);

    const rowRenderer = ({
        index, // Index of row within collection
        style, // Style object to be applied to row (to position it)
    }) => {
        console.log(index, style)
        const item = list[index];
        return (
            <div key={index} style={style} className={css.item}>
                <img src={qrcodeImg} className={ css.imgage} />
                <span>{item.name}: </span>
                <span>{item.value}</span>
            </div>
        );
      }

    return (
        <>
            <div className={css.position}>定位到其中一条</div>
            <div className={css.VListBox}>
                {
                    list.length ?
                        <AutoSizer>
                            {({ height, width }) => { 
                                console.log('wenai---height', height, width)
                                return (
                                    <FixedSizeList
                                        height={height}
                                        itemCount={list.length}
                                        itemSize={70}
                                        width={width}
                                    >
                                        {rowRenderer}
                                    </FixedSizeList>
                                )
                            }
                            }
                        </AutoSizer>
                        : '数据加载中'
                }
            </div>
        </>
    )
}

export default VirtualList;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import * as data from './dataSource';
import {handlerDictionaries, IGetDictionDataAssist} from '../init';

/** 字典数据 */
const {getDictionData} = handlerDictionaries(
    Object.keys(data).map((key) => {
        return {
            Type: `${key}TypeData`,
            Selects: (data as TObj)[key],
        };
    }),
);

/** 类型数据转 map对象 */
const typeDataToMap = (data: Record<string, string | number>[], keys = ['title', 'value']) => {
    const [titleKey, valueKey] = keys;
    return data.reduce((map, item) => {
        map[item[valueKey]] = item[titleKey];
        map[item[titleKey]] = item[valueKey];
        return map;
    }, {});
};

const mapData = Object.keys(data).reduce((map, key) => {
    const item = (data as TObj)[key];
    map[`${key}MapData`] = typeDataToMap(item);

    return map;
}, {} as Record<string, Record<string, string | number>>);


function getTypeOrMapData (key: `${TKeyData}TypeData`, config: {toLabel: true} & IGetDictionDataAssist): {label: string, value: string | number}[];
function getTypeOrMapData (key: `${TKeyData}TypeData`): {title: string, value: string | number}[];
function getTypeOrMapData (key: `${TKeyData}MapData`): Record<string, string | number>;

/** 获取写死的字典配置 */
function getTypeOrMapData (key: any, config?: any) {
    if (key.endsWith('TypeData')) {
        return config ? getDictionData(key, config) : getDictionData(key);
    }

    return mapData[key];
}

export {
    getTypeOrMapData,
};


// getTypeOrMapData('reasonNumberTypeData', {assignValues: []});
// getTypeOrMapData('reasonNumberMapData');


type TKeyData = keyof typeof data;

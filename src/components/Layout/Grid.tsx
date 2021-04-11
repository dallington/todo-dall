// import React from "react";
// import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { isNumber, isString, isObject } from "Utils/functions"

import { Declaration } from "Utils/styles"

const customBreakpoints: { [key: string]: number } = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};

const theme: { [key: string]: { [key: string]: number } } = {
    breakpoints: { ...customBreakpoints }
};

const media = (bp: string = 'sm') => { return `@media (min-width: ${customBreakpoints[bp]}px)` };


type breakpointMap = { [name: string]: number };


type alignContent = "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly" | "stretch";
type alignSelf = "start" | "end" | "center" | "baseline" | "stretch";

type alignItems = "start" | "end" | "center" | "stretch";
type justifyItems = alignItems;
type justifyContent = alignContent;

// const usingSpacePrefix = (value: string) :string => /between|around|evenly/.test(value) ? `space-${value}` : value;

// custom: {min: string, max: string}
type customType = number | object | customQuery[];

type customQuery = {
    min?: string | number,
    max?: string | number,
    value: string | number
}

type PropsInResponsive = {
    [name: string]: number | string
}

type StringOrObject = { [name: string]: number | string } | string
type StringOrNumberOrObject = StringOrObject | number;

type Columns = PropsInResponsive | string | number;

interface PropsGrid {
    columns: Columns,
    direction?: StringOrNumberOrObject
    alignItems?: StringOrObject,
    justifyItems?: StringOrObject,
    alignContent?: StringOrObject,
    justifyContent?: StringOrObject,
    gap?: StringOrObject
}
interface PropsColumn {
    start?: string,
    end?: string,
    span: [number, breakpointMap],
}

// const positionsItems : {[key: string]: string} = {
//     'start':'start',
//     'end':'end',
//     'center': 'center',
//     'stretch': 'stretch',
//     'default': 'center'
// }

const getKeyValue = function <MyObj extends object, myKey extends keyof MyObj>(obj: MyObj, key: myKey) { return obj[key] }

const gridTemplateCols = (totalCols: number | string = 12, min: string = '0', max: string = '1fr') => `repeat(${totalCols}, minmax(${min}, ${max}));`

const setPropCss = (prop: string, value: string | number | Function): string => `${prop}:${value}`;

const mediaQueries = (key: keyof typeof customBreakpoints) => {
    return (style: TemplateStringsArray | String) =>
        `@media (min-width: ${customBreakpoints[key]}px) { ${style} }`;
};

const MediaQuery = (breakpoint: string, properties: string) => {
    return `${mediaQueries(breakpoint)(properties)}`;
}

const mapBreakpoint = (object: PropsInResponsive, property: { propName: string, propValue?: Function }): string => {
    let myReturn: string = '';
    const { propName, propValue } = property;

    for (const [breakpoint, value] of Object.entries(object)) {
        console.log(value)
        myReturn += MediaQuery(breakpoint, setPropCss(propName, (propValue) ? propValue(value) : value));
    }
    return myReturn;
}
// todo: CHECK possibilidade de trocar for object entries to array reducer
const makeCols = (columns: number | string | object) => {
    if (isNumber(columns)) {
        return setPropCss('grid-template-columns', gridTemplateCols(columns as number));
    }
    if (isString(columns)) {
        return setPropCss('grid-template-columns', gridTemplateCols(columns as string));
    }
    if (isObject(columns)) {
        return mapBreakpoint(columns as PropsInResponsive, { propName: 'grid-template-columns', propValue: gridTemplateCols });
    }
}

// const RuleSet = (ruleName: string, ruleValue: StringOrObject ) => {
//     if(isNumber(ruleValue)) {
//         alert('number');
//         return setPropCss(ruleName, ruleValue);
//     }
//     if(isString(ruleValue)) {
//         alert('str');
//         return setPropCss(ruleName, ruleValue);
//     }
//     if(isObject(ruleValue)) {
//         alert('obj');
//         return mapBreakpoint(ruleValue, {propName:ruleName});
//     }
// }
/* 
const propsPermitied: Array<string> = []
const headers: Array<any> = Object.keys(oi).map(key => {
    return propsPermitied.push(key)
});

function getPropsDeclared(PropsGrid) {

}

const myProps: Array<string> = []
const newArray: Array<any> = Object.keys(teste).map(key => {
    console.log(propsPermitied.includes(key));
   (propsPermitied.includes(key)) ? myProps.push(key) : '';
}); */
const convertStringToKebebCase = (str:any):string => str && str
  .match(/[0-9]{1,}(?=\b)|[A-Z]{2,}(?=[A-Z][a-z]+|[0-9]|\b|_)|[A-Z]?[a-z]+|[A-Z]|[0-9]+/g)
  .map((x:string) => x.toLowerCase())
  .join('-')

function convertStringToKebab(string: string): string {
    return string.replace(/\B(?:([A-Z])(?=[a-z]))|(?:(?<=[a-z0-9])([A-Z]))/g, '-$1$2').toLowerCase();
};


function removeFromProps(props: Array<any>, regex: RegExp = /children|theme|howdy/) {
    const filtered = Object.fromEntries(
        Object.entries(props).filter(
            ([key, score]) => (regex.test(key) === false)
        )
    );
    return filtered;
}
const replaceAliases: PropsInResponsive = {
    columns: 'grid-template-columns',
    direction: 'grid-auto-flow',
}

const propertyCss = (prop: string): string => (replaceAliases[prop!] as string) || prop

function replaceAliasToProperty(obj: any, aliasProperty: any): object {
    const keyValues = Object.keys(obj).map(key => {
        const newKey = aliasProperty[key] || key;
        return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
}

// const Stylesheet = (statements) => [PRELUDE].concat(statements.map(Ruleset)).join('\n\n');

function DeclarationBlock(props: object | Array<any>): any {
    let myProps: { [name: string]: any } = props as object;
    props = removeFromProps(props as Array<any>);
    const styles = Object.keys(props)
        .map((property) => {
            if (isObject(myProps[property])) {
                return (property === 'columns') 
                ? makeCols(myProps[property]) : 
                mapBreakpoint(myProps[property], {propName: convertStringToKebebCase(propertyCss(property))}) ; 
            }
            return Declaration({ property: propertyCss(property), value: myProps[property]})
        }
        ).join('\n\n');

    return styles;
}


export const Grid = styled.div<PropsGrid>`
    display: grid;
    ${PropsGrid => DeclarationBlock(PropsGrid)};
`

export const Column = styled.div<PropsColumn>`
    display: flex;
    grid-column: ${PropsColumn => `span ${PropsColumn.span} / span ${PropsColumn.span}`};
    grid-column-start: ${PropsColumn => PropsColumn.start};
    grid-column-end: ${PropsColumn => PropsColumn.end};
`

export default Grid;

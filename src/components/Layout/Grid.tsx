import React from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";

const customBreakpoints:{[key: string]: number} = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};

const theme: { [key: string]: {[key: string]: number} } = {
    breakpoints:  {...customBreakpoints}
};

const media = (bp: string = 'sm') => { return `@media (min-width: ${customBreakpoints[bp]}px)`};


function isNumber(x: any): x is number {
    return typeof x === "number";
  }
  
function isString(x: any): x is string {
    return typeof x === "string";
}

function isObject(x: any): x is string {
    return typeof x === "object";
  }

type breakpointMap = { [name: string]: number };



// custom: {min: string, max: string}
type customType = number | object | customQuery[];

type customQuery = {
    min?: string | number, 
    max?: string | number,
    value: string | number
}

type PropsInResponsive = {
    [name: string]: number
}

type Columns = PropsInResponsive | string | number;

interface PropsGrid  {
    columns: Columns,
    alignItems?: string,
    justifyItems?: string,
    gap?: string
}

interface PropsColumn {
    start?: string,
    end?: string,
    span: [number, breakpointMap],
}

const positionsItems : {[key: string]: string} = {
    'start':'start',
    'end':'end',
    'center': 'center',
    'stretch': 'stretch',
    'default': 'center'
}

const getKeyValue = function<MyObj extends object, myKey extends keyof MyObj> (obj: MyObj, key: myKey) { return obj[key] }
        
const gridTemplateCols = (totalCols: number | string = 12, min: string = '0', max: string = '1fr') => `repeat(${totalCols}, minmax(${min}, ${max}));`

const setPropCss = (prop: string, value: string | number | Function) : string => `${prop}:${value}`

const mediaQueries = (key: keyof typeof customBreakpoints) => {
    return (style: TemplateStringsArray | String) =>
      `@media (min-width: ${customBreakpoints[key]}px) { ${style} }`;
  };

const MediaQuery = (breakpoint: string, properties: string) => {
    return `${mediaQueries(breakpoint)(properties)}`;
}

const mapBreakpoint = (object: PropsInResponsive, property: {propName: string, propValue?: Function}) :string => {
    let myReturn : string = '';
    const { propName, propValue } = property;

    for (const [breakpoint, value] of Object.entries(object)) {
        myReturn += MediaQuery(breakpoint, setPropCss(propName, (propValue) ? propValue(value) : value ) );
    }
    return myReturn;
} 
// todo: CHECK possibilidade de trocar for object entries to array reducer
const makeCols = (columns: Columns) => {
    if(isNumber(columns)) {
        return setPropCss('grid-template-columns', gridTemplateCols(10));
    }
    if(isString(columns)) {
        return setPropCss('grid-template-columns', gridTemplateCols('500px'));
    }
    if(isObject(columns as PropsInResponsive)) {
        return mapBreakpoint(columns, {propName:'grid-template-columns', propValue: gridTemplateCols});
    }
}
export const Grid = styled.div<PropsGrid>`
    display: grid;
    ${ PropsGrid => PropsGrid.columns && makeCols(PropsGrid.columns) }
`


export const Column = styled.div<PropsColumn>`
    display: flex;
    grid-column: ${PropsColumn => `span ${PropsColumn.span} / span ${PropsColumn.span}` };
    grid-column-start: ${PropsColumn => PropsColumn.start};
    grid-column-end: ${PropsColumn => PropsColumn.end};
`

export default Grid;

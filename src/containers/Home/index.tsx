import React, { Component } from 'react'
import { Grid, Column } from 'Components/Layout/Grid';

const divStyle = {
    border: '1px solid red',
  };

const columsnGrid = {
    sm:2,
    md: 4,
    lg: 6,
    xl: 12,
    // custom: {min: 720, max: 1080, value: 6}
}

const justifyContent = {
    sm:'center',
    md: 'space-between',
    // custom: {min: 720, max: 1080, value: 6}
}

export default class index extends Component {
    render() {
        return (
            <div>
                <Grid columns={columsnGrid} direction={"column"} justifyContent={justifyContent} gap={{x: "10px"}}>
                    <div style={divStyle}>1</div>
                    <div style={divStyle}>2</div>
                    <div style={divStyle}>3</div>
                    <div style={divStyle}>4</div>
                    <div style={divStyle}>5</div>
                    <div style={divStyle}>6</div>
                    <div style={divStyle}>7</div>
                    <div style={divStyle}>8</div>
                    <div style={divStyle}>9</div>
                    <div style={divStyle}>10</div>
                    <div style={divStyle}>11</div>
                    <div style={divStyle}>12</div>
                    {/* <Column span="{xs:4, sm: 8, md: 1}">col 1</Column>
                    <Column span="4">col 2</Column>
                    <Column span="3">col 2</Column> */}
                </Grid>
            </div>
        )
    }
}

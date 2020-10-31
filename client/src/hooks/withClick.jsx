import React, { Component } from 'react'

const withClick = (WrappedComponent) => props => {
    return (
        <div onClick={props.onClick}>
            <WrappedComponent {...props} />
        </div>
    );
}

export default withClick;
import React from 'react'
import styled from 'styled-components'
import './button.css'

interface ButtonProps {
  warning?: boolean,
  selectable?: boolean
}
export const Button = styled.div`
  cursor: ${
    ( { selectable=true }: ButtonProps ) => selectable ? `pointer`: undefined 
  };
  border-radius: 1em;
  padding: 0.5em;
  margin: 0.5em 0;
  text-align: center;
  font-weight: bold;
  color: ${ 
    ( { selectable=true }: ButtonProps ) =>  selectable ? 
      `var(--color-buttontext)` : `var(--color-text)`
  };
  background-color: ${ ( { warning, selectable=true}: ButtonProps ) => { 
    if (warning) { return `var(--color-red)`; }
    if (!selectable) { return `var(--color-background)`; }
    return `var(--color-blue)`;
  } };
  border: ${ 
    ( { warning, selectable=true }: ButtonProps ) => {
      if (warning) { return `1px solid var(--color-red)`; }
      if (!selectable) { return `1px solid var(--color-text)`; }
      return `1px solid var(--color-blue)`;
    }
  };
  opacity: ${ 
    ( { selectable=true }: ButtonProps ) => selectable ? 
      undefined : `10%` 
  };
  :hover { color: ${ 
    ( { selectable=true }: ButtonProps ) => selectable ? 
      `var(--color-a)`: undefined
    };
  }
`

export const LoadingButton = ( props: ButtonProps ) => <Button {...props}>
  <div style={{height:`27px`}}>
    <svg 
      viewBox="0 0 10 5" 
      width="100%" 
      height="100%" 
      preserveAspectRatio="XmaxYMax"
    >
      <circle className="loading-circle-1" fill={`var(--color-buttontext)`} cx="1" cy="2.5" r="1"/>
      <circle className="loading-circle-2" fill={`var(--color-buttontext)`} cx="5" cy="2.5" r="1"/>
      <circle className="loading-circle-3" fill={`var(--color-buttontext)`} cx="9" cy="2.5" r="1"/>
    </svg>
  </div>
</Button>

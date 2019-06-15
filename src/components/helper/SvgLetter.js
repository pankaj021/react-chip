import React from 'react';
const SvgLetter = ({letter, isSmallSvg}) => {
    let svgSize = '48';
    let fontSize = '24';
    if(isSmallSvg) {
        svgSize = '32';
        fontSize = '16';
    }
    return (
        <svg width={svgSize} height={svgSize}>
            <circle cx={svgSize / 2} cy={svgSize / 2} r={(svgSize - 2 )/ 2} fill="darkviolet" />
            <text 
                x = "50%" y = "50%" dy = ".3em"
                textAnchor = "middle" fill = "white" 
                fontSize = {fontSize} fontFamily = "Arial" fontWeight = '500'
            >
                {letter}
            </text>
            Opps
        </svg>
    )
}

export default SvgLetter;
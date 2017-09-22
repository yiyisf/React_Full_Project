/**
 * Created by zgx on 2017-9-22.
 */

import React, {Component} from 'react';


class Svg extends Component {
    componentDidMount() {
        
    }


    render() {
        return (
            <div>
                <svg width={500} height={300}>
                    <rect id="my-rect"  x="20" y={20} width={200} height={100} fill="#f06"/>
                    <circle id="my-circle" r="30" cx="50" cy="50" fill="orange" />
                    <animate
                        xlinkHref="#my-circle"
                        attributeName="cx"
                        from="50"
                        to="450"
                        dur="1s"
                        begin="click"
                        fill="freeze"/>
                    <animate
                        xlinkHref="#my-rect"
                        attributeName="x"
                        from="30"
                        to="400"
                        dur="4s"
                        begin="click"
                        fill="remove"/>
                </svg>
            </div>
        )
    }
}

export default Svg;

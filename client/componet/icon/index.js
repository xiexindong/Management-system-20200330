import React  from "react"
import {Icon} from "antd"
import PhoneSvg from './phone.svg'; 

export default function Icons(props){
    console.log(`${props.type}Svg`)
    return<Icon component={`${props.type}Svg`} />
}

 
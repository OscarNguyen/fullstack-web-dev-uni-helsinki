import React from 'react'
import { useDispatch, connect } from 'react-redux'

import { changeFilter } from '../../actions/filter'

const Filter = (props) => {

    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        props.changeFilter(event.target.value)
        // console.log(event.target.value)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    changeFilter
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter
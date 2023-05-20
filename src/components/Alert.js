import React from 'react'

const Alert = (props) => {
    return (
        <section  className='alert'>
            {props.message}
        </section>
    )
}

export default Alert;
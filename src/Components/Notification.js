import React from 'react'

const Notification = ({ text, type }) => {
const applyStyle = {
    backgroundColor: type === 'success'? 'green' : type === 'error'?'red' : 'yellow',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    marginLeft: '10px',
    width: '300px',
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: '1000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center' 
}
    return
    (<div style={applyStyle}>
        {text}
    </div>)
}

export default Notification

const WebsiteLayout=(props)=>{

    return(
        <>
            <h1>WebsiteLayout Header</h1>
            {
                props.children
            }
            <h3>WebsiteLayout Footer</h3>
        </>
    )
}

export default WebsiteLayout
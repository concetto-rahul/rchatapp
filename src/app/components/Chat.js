const Chat=()=>{

    return(
        <>
        <div className="section-header">
            <img alt="" className="mr-3 rounded-circle" width="50" src="/img/avatar/avatar-1.png" />
            <div className="media-body">
                <div className="mt-0 mb-1 font-weight-bold">Hasan Basri</div>
                <div className="text-success text-small font-600-bold"><i className="fas fa-circle"></i> Online</div>
            </div>
        </div>
        <div className="section-body">
            <div className="row align-items-center justify-content-center">
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card chat-box card-success" id="mychatbox2">
                        <div className="card-header">
                            <h4><i className="fas fa-circle text-success mr-2" title="Online" data-toggle="tooltip"></i> Chat with Ryan</h4>
                        </div>
                        <div className="card-body chat-content">
                        </div>
                        <div className="card-footer chat-form">
                            <form id="chat-form2" method="post">
                                <input type="text" className="form-control" placeholder="Type a message" />
                                <button className="btn btn-primary">
                                    <i className="far fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Chat
const Dashboard=()=>{

    return(
        <>
        <div className="section-header">
            <h1>Chats</h1>
        </div>
        <div className="section-body">
            <div className="row align-items-center justify-content-center">
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <ul className="list-unstyled list-unstyled-border">
                      <li className="media">
                        <img alt="" className="mr-3 rounded-circle" width="50" src="/img/avatar/avatar-1.png" />
                        <div className="media-body">
                          <div className="mt-0 mb-1 font-weight-bold">Hasan Basri</div>
                          <div className="text-success text-small font-600-bold"><i className="fas fa-circle"></i> Online</div>
                        </div>
                      </li>
                      <li className="media">
                        <img alt="" className="mr-3 rounded-circle" width="50" src="/img/avatar/avatar-2.png" />
                        <div className="media-body">
                          <div className="mt-0 mb-1 font-weight-bold">Bagus Dwi Cahya</div>
                          <div className="text-small font-weight-600 text-muted"><i className="fas fa-circle"></i> Offline</div>
                        </div>
                      </li>
                      <li className="media">
                        <img alt="" className="mr-3 rounded-circle" width="50" src="/img/avatar/avatar-3.png" />
                        <div className="media-body">
                          <div className="mt-0 mb-1 font-weight-bold">Wildan Ahdian</div>
                          <div className="text-small font-weight-600 text-success"><i className="fas fa-circle"></i> Online</div>
                        </div>
                      </li>
                      <li className="media">
                        <img alt="" className="mr-3 rounded-circle" width="50" src="/img/avatar/avatar-4.png" />
                        <div className="media-body">
                          <div className="mt-0 mb-1 font-weight-bold">Rizal Fakhri</div>
                          <div className="text-small font-weight-600 text-success"><i className="fas fa-circle"></i> Online</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard
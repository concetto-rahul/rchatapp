const AdminNavProfile=(props)=>{
    console.log("AdminNavProfile",props);
    let { profileName,profilePhotoURL }=props.profileData

    const profileIcon=profilePhotoURL?profilePhotoURL:""
    return(
        <>
            <img alt="" src={profileIcon} className="rounded-circle mr-1"/>
            <div className="d-sm-none d-lg-inline-block">Hi, {profileName}</div>
        </>
    )
}

export default AdminNavProfile;
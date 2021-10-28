import Loader from "react-loader-spinner";
const PageLoader=()=>{
    return(
        <>
        <div id="pageLoader">
            <Loader type="Circles" color="#6777ef" height={100} width={100} />
        </div>
        </>
    )
}
export default PageLoader;
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loading = () => (
    <span>
        <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
    </span>
)
export default Loading;
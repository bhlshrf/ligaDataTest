import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Loading = ({ className }) => <Loader
    className={className}
    type='TailSpin'
    color='#00BFFF'
    height={80}
    width={80}
/>

export default Loading;
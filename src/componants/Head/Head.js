import styles from "../../assets/head.module.css";
import {Home,Person,Lock} from '@mui/icons-material';
import { Link } from 'react-router-dom'

const Head = ({page_name}) =>{
    return(
        <div className={styles.head}>
            <h4 className="m-0">{page_name}</h4>
            <div className="d-flex d-md-none">
                <div className={styles.headIcon}>
                    <Link to="/"><Home/></Link>
                </div>
                <div className={styles.headIcon}>
                <Link to="/profile"><Person/></Link>
                </div>
                <div className={styles.headIcon}>
                    <Link to="/signout"><Lock/></Link>
                </div>
            </div>
        </div>
    )
}

export default Head
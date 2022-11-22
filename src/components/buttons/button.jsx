
import "./button.css"
const Button = ({butname}) => {
    return (
        
        <div className="button-container">
            <button id='button-home' className={butname}>{butname} <i className="arrow right"></i></button>
        </div>
     );
}
 
export default Button;
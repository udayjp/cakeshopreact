import axios from 'axios';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

function CartItem(props) {
    const removeCartItem = (event) => {
        axios({
            // url: "https://apibyashu.herokuapp.com/api/removecakefromcart",
            url:"http://68.183.80.25:8007/api/removecartitem/"+props.cartid,
            method: "delete",         
            headers: {
                Authorization: "Token "+localStorage.token
            }
        }).then((response) => {
            props.removefromcart(props.key)
            toast.success("Removed from cart successfully!");

        }, (err) => {
            console.log("Error from API ", err)
        })

    }
    return (
        <div className="row" style={{margin:"10px 0"}}>
            <div className="col">
                <img src={props.cart.image} onError={(e)=>e.target.src="./images/noimage.jpg"} className="left" height="100" width="100" alt={props.cart.name} />
            </div>
            <div className="col">
              {props.cart.name}
            </div>
            <div className="col">
                {props.cart.price}
            </div>
            <div className="col">
                <Link to="/cart" onClick={removeCartItem}>
                    <i class="fas fa-trash-alt"></i>
                </Link>
            </div>
        </div>
    );
}
export default CartItem
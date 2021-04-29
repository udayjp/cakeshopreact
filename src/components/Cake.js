import { withRouter } from "react-router-dom"

function Cake(props) {
    var cakeDetails = () => {
        var url = "/cakedetails/" + props.cake.id
        props.history.push(url)
    }

    return (
        <div className="card" style={{ marginBottom: "10px" }}>
            <img onClick={cakeDetails} src={props.cake.image} onError={(e)=>e.target.src="./images/noimage.jpg"} className="card-img-top" height="200" alt={props.cake.name} />
            <div className="card-body">
                <h5 className="card-title">{props.cake.name} </h5>
                <p className="card-text">
                    <span style={{ color: "red" }}> Rs. {props.cake.price} </span>
                </p>
                <button onClick={cakeDetails} className="btn btn-primary">View Details</button>
            </div>
        </div>
    )
}
export default withRouter(Cake);
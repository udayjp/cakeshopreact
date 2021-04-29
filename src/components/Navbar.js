import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

function chkAlphaSpace(str) {
    const regx = /^[a-zA-Z ]*$/;
    return regx.test(str);
}

const Navbar = (props) => {
    var logOut = () => {
        alert("Log out successfull")
        localStorage.clear()
        window.location.href = "/"
    }
    var text
    var url

    function getSearchText(event) {

        text = event.target.value
    }

    function searchCakes(e) {
        e.preventDefault()
        console.log("text", text)
        if (text && text.length) {
            if (!chkAlphaSpace(text)) {
                alert("Kindly valid search text")
            }
            else{
                url = "/search?q=" + text
                alert(url)
                props.history.push(url)
                document.getElementById('searchtxt').value = "";
            }
            
        }
        else {
            alert("Kindly enter search text")
        }
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand"><i class="fas fa-birthday-cake"></i> Cake Shop</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarColor02">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link to="/" class="nav-link active" aria-current="page"><i class="fas fa-home"></i> Home</Link>
                        </li>
                        {
                            props.isloggedin && <li class="nav-item">
                                <Link to="/addcake" class="nav-link" aria-current="page">Add Cake</Link>
                            </li>

                        }
                        {
                            props.isloggedin && <li class="nav-item">
                                <Link to="/cart" class="nav-link" aria-current="page"><i class="fas fa-shopping-cart"></i>Cart</Link>
                            </li>

                        }
                        {
                            props.isloggedin && <li class="nav-item">
                                <Link to="/orders" class="nav-link" aria-current="page"><i class="fas fa-shopping-bag"></i>My Orders</Link>
                            </li>

                        }
                    </ul>
                    <form class="d-flex">
                        <input onChange={getSearchText} class="form-control me-2" id="searchtxt" type="text" placeholder="Search cake" aria-label="Search" />
                        <Link to={url} onClick={searchCakes} class="btn btn-outline-light" type="submit"><i class="fas fa-search"></i> </Link>
                    </form> &nbsp;&nbsp;
                     {
                        !props.isloggedin && <Link to="/login" className="btn btn-outline-light"><i class="fas fa-sign-in-alt"></i> Login </Link>
                    }
                    {
                        props.isloggedin && <Link to="/" className="btn btn-outline-light btn-danger" onClick={logOut}> <i class="fas fa-power-off"></i> Logout </Link>
                    }
                </div>
            </div>
        </nav>
    )
}

var navbar=withRouter(Navbar)
export default connect(function(state){
    return{
        isloggedin:state.isloggedin
    }
})(navbar)
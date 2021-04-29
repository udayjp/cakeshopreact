import { Link } from 'react-router-dom';

function PageNotFound(){
    return (
        <div>
            <div className="alert alert-warning">Page Not Found</div>
            <Link to="/" className="btn btn-primary">Go to Home Page</Link>
        </div>
    )
}

export default PageNotFound;
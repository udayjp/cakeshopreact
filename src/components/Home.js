import CakeList from './CakeList'
import Carousel from './Carousel'

const Home = () => {
    return (
        <div>
            <div className="fluid-container">
                <Carousel />
            </div>
            <div className="container" style={{"margin-top":"10px"}}>
                <CakeList />
            </div>
        </div>

    )
}
export default Home
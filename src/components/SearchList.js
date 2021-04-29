import queryparser from 'query-string'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import Search from './Search'

function SearchList(props) {
    var query = queryparser.parse(props.location.search)
    var searchtext = query.q
    var [cakes, setCakes] = useState({})
    useEffect(function () {
        var apiurl="http://68.183.80.25:8007/api/search/"+searchtext+"/"
        console.log(apiurl)
        axios({
            url: apiurl,
            method: "get",
        }).then((response) => {
            console.log("Response from API", response.data)
            setCakes(response.data)

        }, (err) => {
            console.log("Error from API", err)
        })
    }, [searchtext])
    return (
        <div>
            {!cakes.length > 0 && <div className="alert alert-warning">

                <h1>Opps! No cakes found for your search</h1>
            </div>
            }
            {cakes.length > 0 && <div className="container">

                <h2 className="text-center" style={{ margin: "20px 0" }}>Search results</h2>
                {
                    cakes.map((each) => {
                        return <Search search={each} />
                    })}
            </div>

            }
        </div>
    )

}

export default SearchList
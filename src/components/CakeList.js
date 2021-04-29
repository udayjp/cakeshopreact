import React, { useState } from 'react';
import axios from 'axios';
import Cake from './Cake';
import Data from   './Data';

const CakeList = () => {
    var [cakes, setCakes] = useState(Data.cakes)
   
    if (!cakes.length > 0 ) {
        axios({
            url: "http://68.183.80.25:8007/api/cakes",
            // url: "https://apibyashu.herokuapp.com/api/allcakes",
            method: "get",
        }).then((response) => {
            console.log("Response from CakeList API ==== ", response.data)
            Data.cakes=response.data
            setCakes(response.data)              
        }, (err) => {
            console.log("Error from API ", err)
        })
    }

    return (
        <div className="row">
            { cakes.length > 0 &&
                cakes.map(
                    (cake) => {
                        return (
                            <div className="col-md-3">
                                <Cake cake={cake} />
                            </div>
                        )
                    }
                )
            }
        </div>
    );
}


export default CakeList;
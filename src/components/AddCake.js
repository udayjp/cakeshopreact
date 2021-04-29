import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function chkAlphaSpace(str) {
    const regx = /^[a-zA-Z ]*$/;
    return regx.test(str);
}
function chkOnlyNumbers(str) {
    const regx = /^[0-9]+$/;
    return regx.test(str);
}

var formData = new FormData()

class AddCake extends Component {
    constructor() {
        super();
        this.state = {
            errorMsessage: {},
            imagesrc: {},
        }
    }
    
    uploadImage = (event) => {
        event.preventDefault();        
        this.setState({
            imageUrl: URL.createObjectURL(event.target.files[0]),
            file : event.target.files[0]
        });
        formData.append("image", event.target.files[0],event.target.files[0].name)       
    }

    showErrorMessage = (event) => {
        event.preventDefault();
        var errors = {};
        const cakeName = document.getElementById('cakeName').value
        if (!cakeName) {
            errors.errCakeName = "Kindly enter cake name";
        }
        else if (!chkAlphaSpace(cakeName)) {
            errors.errCakeName = "Only Alphabets and spaces are allowed ";
        }
        else {
            formData.append("name", cakeName)
        }

        const cakePrice = document.getElementById('cakePrice').value
        if (!cakePrice) {
            errors.errCakePrice = "Kindly enter price";
        }
        else if (!chkOnlyNumbers(cakePrice)) {
            errors.errCakePrice = "Only numeric values are allowed ";
        }
        else {
            formData.append("price", cakePrice)
        }

        const cakeDiscount = document.getElementById('cakeDiscount').value

        if (!cakeDiscount) {
            errors.errCakeDiscount = "Kindly enter discount";
        }
        else if (!chkOnlyNumbers(cakeDiscount)) {
            errors.errCakeDiscount = "Only numbers are allowed ";
        }
        else {
            formData.append("discount", cakeDiscount)
        }

        const cakeRating = document.getElementById('cakeRating').value
        if (!cakeRating) {
            errors.errCakeRating = "Kindly enter rating";
        }
        else if (!chkOnlyNumbers(cakeRating)) {
            errors.errCakeRating = "Only numeric values are allowed ";
        }
        else {
            formData.append("rating", cakeRating)
        }

        const cakeWeight = document.getElementById('cakeWeight').value
        if (!cakeWeight) {
            errors.errCakeWeight = "Kindly enter Weight";
        }
        else if (!chkOnlyNumbers(cakeWeight)) {
            errors.errCakeWeight = "Only numeric values are allowed ";
        }
        else {
            formData.append("weight", cakeWeight)
        }        
        const eggless = document.getElementById('eggless')
        if (eggless.checked)
            formData.append("eggless", true)
        else
            formData.append("eggless", false)

        const cakeDescription = document.getElementById('cakeDescription').value
        if (!cakeDescription) {
            errors.errCakeDescription = "Kindly enter description";
        }
        else if (!chkAlphaSpace(cakeDescription)) {
            errors.errCakeDescription = "Only Alphabets and spaces are allowed ";
        }
        else {
            formData.append("description", cakeDescription)
        }
        const cakeImg = document.getElementById('cakeImg').value
        if (!cakeImg) {
            errors.errCakeImg = "Kindly select image";
        }
        
        this.setState({
            errorMsessage: errors,
        })

        if (Object.keys(errors).length === 0) {
            toast("No error");
            console.log("Entered values are ", formData);
            axios({
                // url: "https://apibyashu.herokuapp.com/api/addcake",
                url: "http://68.183.80.25:8007/api/addcake",
                method: "post",
                data: formData,
                headers: {
                    'content-type': 'multipart/form-data',
                    // authtoken: localStorage.token
                    Authorization: "Token "+localStorage.token
                }
            }).then((response) => {
                console.log("Response from API", response)

            }, (err) => {
                console.log("Error from API", err)
            })

        }
        else
            toast("Form have errors");
    }

    render() {
        return (
            <div class="row justify-content-center align-items-center">
                <div class="col-md-5">
                    <h2 className="text-center" style={{ margin: "20px 0" }}> Add Cake</h2>
                    <form className="form-control">
                        <div class="form-group" style={{ margin: "5px 0" }}>
                            <label for="cakeName">Cake Name:</label><br />
                            <input type="text" name="cakeName" class="form-control" id="cakeName"
                                placeholder="Cake name" />
                            {
                                this.state.errorMsessage.errCakeName && <div> <label className="text-danger">
                                    {this.state.errorMsessage.errCakeName} </label> </div>
                            }
                        </div>
                        <div class="form-group" style={{ margin: "5px 0" }}>
                            <label for="cakePrice">Cake Price:</label><br />
                            <input type="text" name="cakePrice" class="form-control" id="cakePrice"
                                placeholder="Cake price" />
                            {
                                this.state.errorMsessage.errCakePrice && <div> <label className="text-danger">
                                    {this.state.errorMsessage.errCakePrice} </label> </div>
                            }
                        </div>
                        <div class="form-group" style={{ margin: "5px 0" }}>
                            <label for="cakeDiscount">Discount:</label><br />
                            <input type="text" name="cakeDiscount" class="form-control" id="cakeDiscount"
                                placeholder="Discount" />
                            {
                                this.state.errorMsessage.errCakeDiscount && <div> <label className="text-danger">
                                    {this.state.errorMsessage.errCakeDiscount} </label> </div>
                            }
                        </div>
                        <div class="form-group" style={{ margin: "5px 0" }}>
                            <label for="cakeRating">Rating:</label><br />
                            <input type="number" name="cakeRating" class="form-control" id="cakeRating"
                                placeholder="Rating" min="0" max="5" />
                            {
                                this.state.errorMsessage.errCakeRating && <div> <label className="text-danger">
                                    {this.state.errorMsessage.errCakeRating} </label> </div>
                            }
                        </div>
                        <div class="form-group" style={{ margin: "5px 0" }}>
                            <label for="cakeWeight">Weight:</label><br />
                            <input type="text" name="cakeWeight" class="form-control" id="cakeWeight"
                                placeholder="Weight" />
                            {
                                this.state.errorMsessage.errCakeWeight && <div> <label className="text-danger">
                                    {this.state.errorMsessage.errCakeWeight} </label> </div>
                            }
                        </div>
                        
                        <div class="form-group" style={{ margin: "5px 0" }}>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="cakeCategory" id="eggless" />
                                <label class="form-check-label" for="eggless">
                                    Eggless
                                    </label>
                            </div>
                        </div>
                        <div class="form-group" style={{ margin: "5px 0" }}>
                            <label for="cakeDescription">Description:</label><br />
                            <textarea class="form-control" id="cakeDescription" rows="3" placeholder="Description"></textarea>
                            {
                                this.state.errorMsessage.errCakeDescription && <div> <label className="text-danger">
                                    {this.state.errorMsessage.errCakeDescription} </label> </div>
                            }
                        </div>
                        <div class="form-group" style={{ margin: "5px 0" }}>
                            <label for="cakeImg">Cake Image:</label><br />
                            <input onChange={this.uploadImage} type="file" class="custom-file-input" name="cakeImg" id="cakeImg"
                                placeholder="Cake Image" />                            
                            {
                                this.state.errorMsessage.errCakeImg && <div> <label className="text-danger">
                                    {this.state.errorMsessage.errCakeImg} </label> </div>
                            }
                            {this.state.imagesrc && <div id="imagePreview"> <img src={this.state.imageUrl} alt=""></img> </div>}

                        </div>
                        <div class="form-group" style={{ margin: "5px 0" }}>
                            <button onClick={this.showErrorMessage} type="submit" class="btn btn-primary">Add Cake</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddCake;
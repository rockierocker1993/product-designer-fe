import React from "react";

function Images(){
    return <div className="col column text-white menu-detail">
            <h5>Tshirt All Over Print <span className="badge bg-secondary">10.00€</span></h5>
            <button className="btn btn-light btn-sm mb-3">CHANGE PRODUCT</button>

            <h6>Printing</h6>
            <div className="border bg-white p-2 text-dark mb-3">
                <strong>Number of stages</strong>
            </div>

            <h6>Product Color:</h6>
            <div className="d-flex product-color mb-3">
                <div className="active" style={{background:'#000'}}></div>\
                <div style={{background:'#3f51b5'}}></div>
                <div style={{background:'#03a9f4'}}></div>
                <div style={{background:'#e91e63'}}></div>
            </div>

            <h6>Quantity:</h6>
            <div className="mb-2">
                <label className="form-label text-white">S</label>
                <input type="number" className="form-control form-control-sm" />
            </div>
            <div className="mb-2">
                <label className="form-label text-white">M</label>
                <input type="number" className="form-control form-control-sm" />
            </div>
            <div className="mb-2">
                <label className="form-label text-white">XL</label>
                <input type="number" className="form-control form-control-sm" />
            </div>
        </div>
    }

export default Images;
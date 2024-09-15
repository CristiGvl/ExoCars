import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap"; 
import { Link} from "react-router-dom";
function Car({ car, fromdate, todate }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='row box-shadow'>
            <div className="col-md-5">
                <img src={car.imageurls[0]} className='smallimg' />
            </div>
            <div className="col-md-7">
                <h1>{car.name}</h1>
                <p>Max Count : {car.maxcount}</p>
                <b>
                    {" "}
                    <p>Phone Number : {car.phonenumber}</p>
                    <p>Type : {car.type}</p>
                    <p>Description : {car.description}</p>
                </b>
                <div style={{ float: "right" }}>

                {(fromdate && todate) && (
                <Link to={`/book/${car._id}/${fromdate}/${todate}`}>

                    <button className="btn btn-primary m-2">Book Now</button>
                    </Link>
                    )}
                    <button className="btn btn-primary" onClick={handleShow}>View Details</button>
                </div>

            </div>


            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header>
                    <Modal.Title>{car.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel fade>
                       
                       {car.imageurls.map(url=>{
                        return <Carousel.Item>
                            <img
                            className="d-block w-100 bigimg "
                            src={url}
                            />
                        </Carousel.Item>
                       })}


                    </Carousel>
                    <p>{car.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Car
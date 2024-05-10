import React, { useState, useEffect } from 'react';
import { MdStars } from 'react-icons/md';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import '../config';
var baseUrl = global.config.wishes.inPoints.url;

var token = localStorage.getItem('token');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const FragmentPerfil = () => {
    var username = localStorage.getItem('username');
    const [listName, setListName] = useState([]);
    const [listImg, setListImg] = useState([]);
    const [selectedFile, setSelectedFile] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        try {
            axios.get(baseUrl+'/users/api/profile/' + username + '/', { headers })
                .then((response) => {
                    setListName(response.data[0][0]);
                    setListImg(response.data[1][0]);

                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setListName], [setListImg])

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleSubmitImage = (event) => {
        event.preventDefault()
        let formData = new FormData();
        formData.append('image', selectedFile)

        try {
            axios.post(baseUrl+'/users/api/update_profile/' + username + '/',
                formData
                , { headers })
                .then((response) => {
                    //console.log(response);
                    window.location.href = "/miperfil/";

                })
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <div className="l-navbar" id="nav-bar">
                <nav className="nav">
                    <div>
                        <div className="nav_list">
                            <a href="/home/" className="nav_link"> <i className='bx bx-home nav_icon'></i></a>
                            <a href="/misregalos/" className="nav_link"> <i className='bx bx-gift nav_icon'></i></a>
                            <a href="/miperfil/" style={{ color: "blueviolet" }} className="nav_link"> <i className='bx bx-user bx-tada nav_icon'></i></a>
                            <a href="/misdirecciones/" className="nav_link"> <i className='bx bx-directions nav_icon' ></i> </a>
                            <a href="/logout/" className="nav_link"> <i className='bx bx-log-out-circle nav_icon'></i></a>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="height-100">
                <div className="container">
                    <div>
                        <h4 style={{ fontWeight: 300, paddingTop: 15 }}>Mi</h4>
                        <h3 style={{ fontSize: 34, fontWeight: "bold" }}>Perfil</h3>
                    </div>
                </div>
                <div className="container" style={{ backgroundColor: "#BFB3CF" }}>
                    <div className="row">
                        <div style={{ position: "relative" }} className="col-sm">
                            <Button style={{ position: "absolute", backgroundColor: "#7B3E90", borderColor: "#7B3E90" }} onClick={() => { handleShow() }}>Cambiar imagen</Button>
                            {
                                (listImg.image) === ''
                                    ? <img style={{ width: "80%" }} alt='' src="https://wishesinpointsbucket.s3.amazonaws.com/assets/ProfilePic1.jpg"></img>
                                    : <img style={{ width: "80%" }} alt='' src={'https://wishesinpointsbucket.s3.amazonaws.com/' + listImg.image}></img>
                            }

                        </div>
                        <div style={{ paddingTop: 10, paddingBottom: 10, textAlign: "center", alignSelf: "center" }} className="col-sm">
                            <h3 style={{ fontSize: 34, fontWeight: "bold" }}>{listName.first_name + " " + listName.last_name}</h3>
                        </div>
                        <div style={{ paddingTop: 10, paddingBottom: 10, textAlign: "right" }} className="col-sm">
                            <h4 style={{ fontSize: 34, fontWeight: "bold" }}><MdStars style={{ color: "#7B3E90" }} />{listImg.points + " pts"}</h4>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div>
                        <h4 style={{ fontWeight: 300, paddingTop: 15 }}>{"Correo: " + listName.email}</h4>
                        <div className="row">
                            <div className="col">
                                <h4 style={{ fontWeight: 300, paddingTop: 15 }}>{"Telefono: " + listImg.phone}</h4>
                            </div>
                            <div style={{ textAlign: "right" }} className="col">
                                <button style={{ borderRadius: 15, backgroundColor: "#7B3E90", color: "white" }} className="btn" onClick={event => window.location.href = '/actualizar-perfil'} >Editar informacion</button>
                            </div>

                        </div>
                    </div>
                    <hr style={{ height: 9 }}></hr>
                </div>
            </div>

            <Modal show={show} size="md" onHide={handleClose} >
                <Modal.Body style={{ margin: 20 }}>
                    <div>
                        <h4>Cambiar foto de perfil</h4>
                        <form onSubmit={handleSubmitImage}>
                            <input type="file" onChange={handleFileSelect} /><br></br><br></br>
                            <Button type="submit" value="Upload File" style={{ backgroundColor: "#7B3E90", borderColor: "#7B3E90" }}>Cambiar imagen</Button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    )

}
export default FragmentPerfil;
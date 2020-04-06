import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import axios from "axios";
import './filestore.css';
import MultiFileStore from './MultiFileStore';
class FileStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: ''
        }
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onFileChange = e => {
        this.setState({ selectedFile: e.target.files[0] })
    }
    onSubmit = e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('selectedFile', this.state.selectedFile)
        axios.post("http://localhost:8000/upload", formData, {
        }).then(res => {
            console.log(res)
        })
    }

    render() {
        return (
            <div className="container">
                <h1>File Uploader Using ReactJS,Multer</h1>
                <div className="row">

                    <form onSubmit={this.onSubmit}>
                        <h1>Single File Uploader</h1>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
                <MultiFileStore></MultiFileStore>
            </div>

        );
    }
}

export default FileStore;
import React, { Component } from 'react';
import axios from "axios";
class MultiFileStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: []
        }
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onFileChange = e => {
        this.setState({ selectedFile: e.target.files })
    }
    onSubmit = e => {
        e.preventDefault();
        var data = new FormData();
        console.log(this.state.selectedFile.length);

        for (var x = 0; x < this.state.selectedFile.length; x++) {
            data.append('selectedFile', this.state.selectedFile[x])
        }
        axios.post("http://localhost:8000/multiple", data, {
        }).then(res => {
            console.log(res)
        }).catch(err => console.log(err.message));
    }

    render() {
        return (


            <div className="row">

                <form onSubmit={this.onSubmit}>
                    <h1>Multiple File Uploader</h1>
                    <div className="form-group">
                        <input type="file" onChange={this.onFileChange} multiple />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Upload</button>
                    </div>
                </form>
            </div>

        );
    }
}

export default MultiFileStore;
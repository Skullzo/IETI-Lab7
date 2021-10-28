import React, {Component} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { withStyles } from "@material-ui/core/styles";
import {Button, TextField, Card, CardContent} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2'

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {items: [],
            text: '',
            password: '',
            confirmPassword: '',
            email: '',
            profileIsEddited: false
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    componentDidMount(){
        this.setState({text : localStorage.getItem('name')});
        this.setState({email : localStorage.getItem('email')});
        this.setState({password : localStorage.getItem('password')});
        this.setState({confirmPassword : localStorage.getItem('password')});
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.profileIsEddited && <Redirect to="/dashboard" />}
                <Card className={classes.card} variant="outlined">
                    <CardContent>
                        <form>
                        <h3>Edit Profile</h3>
                        <br/>
                        <br/>
                                <div>
                                    <div>
                                        <label htmlFor="text" className="right-margin">
                                            Full Name
                                        </label>
                                        <br/>
                                        <br/>
                                    </div>
                                </div>
                                
                                
                                        <TextField
                                            required
                                            label="Text"
                                            id="outlined-margin-none"
                                            defaultValue="Default Value"
                                            className={classes.textField}
                                            variant="outlined"
                                            onChange={this.handleTextChange}
                                            value={this.state.text}
                                        />
                                
                        <br/>
                        <br/>
                        <br/>
                        <div>
                            <div>
                                <label htmlFor="text" className="right-margin">
                                    Email
                                </label>
                            </div>
                            <br/>
                                <TextField
                                    required
                                    id="standard-number22s2"
                                    type="text"
                                    value={this.state.email}
                                    className={classes.textField}
                                    variant="outlined"
                                    onChange={this.handleEmailChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <div>
                                <label htmlFor="text" className="right-margin">
                                    Password
                                </label>
                            </div>
                            <br/>
                            <TextField
                                    error = {this.state.confirmPassword !== this.state.password}
                                    helperText = {
                                        (this.state.confirmPassword !== this.state.password)
                                        && "Passwords do not match"}
                                    required
                                    id="standard-number222ss"
                                    type="text"
                                    value={this.state.password}
                                    className={classes.textField}
                                    variant="outlined"
                                    onChange={this.handlePasswordChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <div>
                                <label htmlFor="text" className="right-margin">
                                    Confirm Password
                                </label>
                            </div>
                            <br/>
                            <TextField
                                    error = {this.state.confirmPassword !== this.state.password}
                                    helperText = {
                                        (this.state.confirmPassword !== this.state.password)
                                        && "Passwords do not match"}
                                    required
                                    id="standard-number2dd22ss"
                                    type="text"
                                    value={this.state.confirmPassword}
                                    className={classes.textField}
                                    variant="outlined"
                                    onChange={this.handleConfirmPasswordChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                        </div>
                        <br/>
                        <br/>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick ={this.handleSubmit}
                        >
                            Save Changes
                        </Button>
                    </form>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handleConfirmPasswordChange(e) {
        this.setState({
            confirmPassword: e.target.value
        });
    }

    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.text.length ||
            !this.state.password.length ||
            !this.state.confirmPassword.length ||
            !this.state.email.length){
            Swal.fire('Error', 'Please fill all fields', 'error')
        }
        else if (this.state.confirmPassword !== this.state.password){
            Swal.fire('Error', 'Passwords do not match', 'error')
        }
        else if (!this.state.email.includes('@')){
            Swal.fire('Error', 'Please enter a valid email', 'error')
        }
        
        else{
            localStorage.setItem('name', this.state.text);
            localStorage.setItem('email', this.state.email);
            localStorage.setItem('password', this.state.password);

            Swal.fire('Done', 'Profile edited successfully', 'success')
            this.setState({profileIsEddited:true})

        }
    }

}

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    card: {
        width: '500px',
        margin: 'auto',
        marginTop: "10px"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default withStyles(styles, { withTheme: true })(UserProfile);
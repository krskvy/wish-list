import React, { useEffect, useState } from 'react';
import './ProfileForm.scss'
import { TextField, Button, Divider } from '@mui/material';
import Typography from '@mui/joy/Typography';


const ProfileForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [isSentRequest, setIsSentRequest] = useState<boolean>(false);

  const processProfileUpdate = () => { 
    
  }

  return(    
    <form className='profile-form' onSubmit={processProfileUpdate}>
      <div className="form-input">
        <TextField
          id='profile-form__username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          required/>
      </div>
      <div className="form-input">
        <TextField
          id='profile-form__email'
          value={email}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          required/>
      </div>
      <Divider/>
      <span className="heading-h3">
        <Typography level="h3">Update the password</Typography>       
      </span>
			<div className="form-input">
        <TextField
          id='profile-form__oldpassword'
          value={oldPassword}
          label='Old Password'
          onChange={(e) => setOldPassword(e.target.value)}
          type="password"
          required/>
      </div>
      <div className="form-input">
        <TextField
          id='profile-newpassword'
          value={newPassword}
          label='New Password'
          onChange={(e) => setNewPassword(e.target.value)}
          type="password"
          required/>
      </div>
      <Button
        disabled={isSentRequest}
        variant="outlined"
        type="submit">
        Login
      </Button>
    </form>
  )
}

export default ProfileForm;
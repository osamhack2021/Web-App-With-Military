import {InputLabel, TextField} from '@mui/material';

const RegisterInput = ({label, value, onChange, error}) => {
  return(
    <>
      <InputLabel>{label}</InputLabel>
      <TextField
                variant="outlined"
                fullWidth 
                required
                name="email"
                sx={{ my: 1 }}
                value={value}
                onChange={onChange}
                error={error}
                helperText={error&&"이미 사용중인 이메일입니다"}
            />
    </>
  )
}
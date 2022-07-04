import { useState, useCallback } from 'react';
import { LoginService } from '../services/UserService';
import { useHistory } from 'react-router-dom';
import { push } from 'connected-react-router';
import * as actions from '../store/actions';
import { connect } from 'react-redux';

const Login = (props) => {
    let history = useHistory();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [data, setData] = useState({
        email: "",
        password: ""
      }
    );

    const handleOnChange = useCallback(event => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
      }
    );

    
    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        let res = await LoginService(data.email, data.password);

        if (res && res.errCode === 0) {
          props.userLoginSuccess(res.user, res.access_token);
        }
        setMessage(res.message);
        setLoading(false);
      } catch (error) {
        setMessage('Catch error');
      }
    };

    return (
        <div className="col-md-12">
          <div className="card col-md-3 d-flex justify-content-center card-container">
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            />
              {/* <form> */}
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input name="email" type="text" onChange={handleOnChange} className="form-control" />
                  {/* <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  /> */}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input name="password" type="password" onChange={handleOnChange} className="form-control" />
                  {/* <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  /> */}
                </div>
                <div className="form-group d-flex justify-content-center my-3">
                  <button type="submit" onClick={handleLogin} className="btn btn-primary btn-block">
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
                </div>
                {/* {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )} */}
              {/* </form> */}
          </div>
        </div>
      );
}

const mapStateToProps = (state) => {
  return {
    // language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo, token) => dispatch(actions.userLoginSuccess(userInfo, token)),
    // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
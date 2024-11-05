import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import imageForm from '../../assets/vector.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { loginUser } from '@/store/slices/UserSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch(); // Khởi tạo dispatch
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      setErrorMessage("Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, and a special character.");
      return;
    }

    setErrorMessage(""); // Clear error message if password is valid

    try {
      // Gọi action đăng nhập
      const resultAction = await dispatch(loginUser(formData));

      // Kiểm tra nếu đăng nhập thành công
      if (loginUser.fulfilled.match(resultAction)) {
        // Lấy thông tin người dùng
        const user = resultAction.payload.user; // Giả định rằng bạn có thông tin người dùng ở đây
        const userRole = user.role; // Lấy vai trò của người dùng

        // Chuyển hướng về trang tương ứng dựa vào vai trò
        if (userRole === 'admin') {
          navigate('/admin');
        } 
        else if (userRole === 'buyer') {
          navigate('/'); 
        } 
        else if (userRole === 'seller') {
          navigate('/seller'); 
        } 
        else if (userRole === 'delivery') {
          navigate('/delivery'); 
        } else {
          setErrorMessage("User role not recognized. Please contact support.");
        }
      } else {
        // Hiển thị thông báo lỗi nếu đăng nhập thất bại
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.log("Error during login:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden'>
      <div className='bg-white rounded-lg shadow-form overflow-hidden'>
        <div className='grid grid-cols-2'>
          {/* Left content */}
          <div className='p-12 flex flex-col gap-6'>
            <h2 className='text-3xl font-bold mb-4 text-primary text-center'>Login</h2>
            <div className='mb-4 flex flex-col justify-center'>
              <button className='text-bold text-lg border border-1 border-primary rounded-lg transition-all hover:text-white hover:bg-primary py-1 duration-300'>
                Login with Google
              </button>
              <p className='text-primary text-lg text-center mt-2'>or sign in with:</p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleOnChange}
                className='w-full p-2 border border-secondary rounded mb-4 focus:border-primary focus:outline-none focus:shadow-xl focus:shadow-primary transition-shadow duration-300'
                required
              />

              <div className='relative mb-4'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleOnChange}
                  className='w-full p-2 border border-secondary rounded mb-4 focus:border-primary focus:outline-none focus:shadow-xl focus:shadow-primary transition-shadow duration-300'
                  required
                />
                <Eye
                  className='absolute right-3 top-2 cursor-pointer text-secondary'
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
              )}

              {/* Checkbox */}
              <label className='flex items-center mb-4'>
                <input
                  type='checkbox'
                  className='mr-2'
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className={`transition-colors duration-100 ${rememberMe ? 'text-primary' : 'text-black'}`}>
                  Remember password.
                </span>
              </label>

              <div className='flex items-center justify-between'>
                <button
                  type="submit"
                  className='bg-primary text-white border border-transparent px-4 py-2 rounded mr-2 flex-1 hover:border-primary transition-all duration-300 hover:scale-95'
                >
                  Sign In
                </button>

                <Link to='/register-buyer'
                  className='bg-white text-primary border border-primary px-4 py-2 rounded text-center flex-1 transition-all duration-100 hover:scale-95 hover:border-l-4 hover:border-b-4 hover:border-primary'
                >
                  Sign Up
                </Link>
              </div>
            </form>

            <div className='text-center pt-8'>
              <a href="#" className='text-primary hover:text-secondary'>Forgot Password?</a>
            </div>
          </div>
          {/* Right image section */}
          <div>
            <div className='auth-image'>
              <img src={imageForm} alt="Auth" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

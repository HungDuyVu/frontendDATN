import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import imageForm from '../../assets/vector.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerBuyer } from '@/store/slices/UserSlice';

const RegisterBuyer = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [policy, setPolicy] = useState(false);
  
  const dispatch = useDispatch(); // Khởi tạo useDispatch
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert("Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      alert("Passwords do not match!");
      return;
    }

    if (!policy) {
      alert("You must agree to the terms and conditions to proceed.");
      return;
    }

    try {
      const response = await dispatch(registerBuyer(formData)); 
      if (response.meta.requestStatus === 'fulfilled') { // Kiểm tra đăng ký thành công
        navigate('/login'); // Chuyển hướng đến trang login
      }
    } catch (error) {
      console.log("Registration error:", error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden'>
      <div className='bg-white rounded-lg shadow-form m-4'>
        <div className='grid grid-cols-2'>
          {/* Left content */}
          <div className='p-12 flex flex-col gap-2'>
            <h2 className='text-3xl font-bold mb-4 text-primary text-center'>Register</h2>
            <div className='mb-2 flex flex-col justify-center gap-2'>
              <button className='text-bold text-lg border border-1 border-primary rounded-lg transition-all hover:text-white hover:bg-primary py-1 duration-300'>
                Login with Google
              </button>
              <p className='text-primary text-lg text-center mt-2'>or sign in with:</p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <input
                type='text'
                name='username'
                placeholder='username'
                value={formData.username}
                onChange={handleOnChange}
                className='w-full p-2 border border-secondary rounded mb-4 focus:border-primary focus:outline-none focus:shadow-xl focus:shadow-primary transition-shadow duration-300'
                required
              />
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleOnChange}
                className='w-full p-2 border border-secondary rounded mb-4 focus:border-primary focus:outline-none focus:shadow-xl focus:shadow-primary transition-shadow duration-300'
                required
              />
              <input
                type='tel'
                name='phone'
                placeholder='Phone'
                value={formData.phone}
                onChange={handleOnChange}
                className='w-full p-2 border border-secondary rounded mb-4 focus:border-primary focus:outline-none focus:shadow-xl focus:shadow-primary transition-shadow duration-300'
                required
              />
              <div className='relative mb-2'>
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
              <div className='relative mb-4'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='password_confirmation'
                  placeholder='Confirm Password'
                  value={formData.password_confirmation}
                  onChange={handleOnChange}
                  className='w-full p-2 border border-secondary rounded mb-4 focus:border-primary focus:outline-none focus:shadow-xl focus:shadow-primary transition-shadow duration-300'
                  required
                />
                <Eye
                  className='absolute right-3 top-2 cursor-pointer text-secondary'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </div>
              <label className='flex justify-start items-center mb-4'>
                <input
                  type='checkbox'
                  className='mr-2'
                  checked={policy}
                  onChange={(e) => setPolicy(e.target.checked)}
                />
                <p className='flex gap-1'>
                  I agree to the
                  <span className={`transition-colors duration-100 ${policy ? 'text-primary' : 'text-secondary'}`}>
                    <Link to="/">Terms</Link>
                  </span>
                  and
                  <span className={`transition-colors duration-100 ${policy ? 'text-primary' : 'text-secondary'}`}>
                    <Link to="/">Privacy Policy</Link>
                  </span>
                </p>
              </label>
              <button
                type="submit"
                className='bg-primary text-white border border-transparent px-4 py-2 rounded-lg mr-2 flex-1 hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 hover:scale-95 hover:border-l-4 hover:border-b-4'
              >
                Register
              </button>
            </form>
            <div className='text-center pt-6'>
              <Link to="/login" className='text-primary hover:text-secondary'>Already have an account!</Link>
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

export default RegisterBuyer;

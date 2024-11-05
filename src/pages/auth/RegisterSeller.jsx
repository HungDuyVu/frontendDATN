import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProvinces,
  fetchDistricts,
  fetchWards,
  setSelectedProvince,
  setSelectedDistrict,
  setSelectedWard
} from '../../store/slices/AddressSlice';
import { registerSeller } from '@/store/slices/UserSlice';

const RegisterSeller = () => {
  const dispatch = useDispatch();
  const { provinces, districts, wards, selectedProvince, selectedDistrict, selectedWard } = useSelector((state) => state.address);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // Thêm trường số điện thoại
    password: '',
    password_confirmation: '',
    unit_name: '',
    description: '',
    address: '', // Chỉ sử dụng trường này
    taxCode: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [policy, setPolicy] = useState(false);

  useEffect(() => {
    dispatch(fetchProvinces());
  }, [dispatch]);

  const handleProvinceChange = (selectedOption) => {
    dispatch(setSelectedProvince(selectedOption.value));
    dispatch(fetchDistricts(selectedOption.value));
    dispatch(setSelectedDistrict(null));
    dispatch(setSelectedWard(null));
    setFormData((prev) => ({
      ...prev,
      storeAddress: '', // Reset store address when province changes
    }));
  };

  const handleDistrictChange = (selectedOption) => {
    dispatch(setSelectedDistrict(selectedOption.value));
    dispatch(fetchWards(selectedOption.value));
    dispatch(setSelectedWard(null));
    setFormData((prev) => ({
      ...prev,
      storeAddress: '', // Reset store address when district changes
    }));
  };

  const handleWardChange = (selectedOption) => {
    dispatch(setSelectedWard(selectedOption.value));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const provinceName = provinces.find((p) => p.code === selectedProvince)?.name || '';
    const districtName = districts.find((d) => d.code === selectedDistrict)?.name || '';
    const wardName = wards.find((w) => w.code === selectedWard)?.name || '';
    const specificAddress = name === 'specificAddress' ? value : prev.storeAddress.split(' ')[0]; // Giữ lại địa chỉ cụ thể nếu cần

    setFormData((prev) => ({
      ...prev,
      storeAddress: `${specificAddress} ${wardName}, ${districtName}, ${provinceName}`.trim(),
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

    if (!policy) {
      alert('You must agree to the terms and privacy policy!');
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await dispatch(registerSeller(formData));
      if (response.meta.requestStatus === 'fulfilled') {
        navigator("/login");
      }
    } catch (error) {
      console.log("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-12 py-16 overflow-hidden">
      <div className="bg-white rounded-lg shadow-lg p-12 max-w-5xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">
          Register as Seller
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8">
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleOnChange}
              className="w-full p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow duration-300"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleOnChange}
              className="w-full p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow duration-300"
              required
            />
            <input
              type="text"
              name="phone" // Thêm trường cho số điện thoại
              placeholder="Phone Number"
              value={formData.phone} // Cập nhật giá trị từ state
              onChange={handleOnChange} // Gọi hàm xử lý khi có thay đổi
              className="w-full p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow duration-300"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleOnChange}
                className="w-full p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow duration-300"
                required
              />
              <Eye
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="password_confirmation"
                placeholder="Confirm Password"
                value={formData.password_confirmation}
                onChange={handleOnChange}
                className="w-full p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow duration-300"
                required
              />
              <Eye
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            <input
              type="text"
              name="storeName"
              placeholder="Store Name"
              value={formData.storeName}
              onChange={handleOnChange}
              className="w-full p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow duration-300"
              required
            />
          </div>

          {/* Column 2 - Store Information */}
          <div className="flex flex-col gap-6">
            <textarea
              name="storeDescription"
              placeholder="Store Description"
              value={formData.storeDescription}
              onChange={handleOnChange}
              className="w-full h-48 p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow duration-300"
              required
            />
            <Select
              placeholder="Select Province"
              options={provinces.map((province) => ({
                value: province.code,
                label: province.name,
              }))}
              onChange={handleProvinceChange}
            />
            <Select
              placeholder="Select District"
              options={districts.map((district) => ({
                value: district.code,
                label: district.name,
              }))}
              onChange={handleDistrictChange}
              isDisabled={!selectedProvince}
            />
            <Select
              placeholder="Select Ward"
              options={wards.map((ward) => ({
                value: ward.code,
                label: ward.name,
              }))}
              onChange={handleWardChange}
              isDisabled={!selectedDistrict}
            />
            <input
              type="text"
              name="specificAddress"
              className="w-full p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow duration-300"
              placeholder="Specific Address"
              value={formData.specificAddress} // Lấy giá trị từ state
              onChange={handleOnChange} // Gọi hàm xử lý khi có thay đổi
            />
            <input
              type="text"
              name="taxCode"
              placeholder="Tax Code"
              value={formData.taxCode}
              onChange={handleOnChange}
              className="w-full p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow duration-300"
              required
            />
          </div>

          <div className="col-span-2 flex items-center mt-4">
            <input
              type="checkbox"
              checked={policy}
              onChange={() => setPolicy(!policy)}
              className="mr-2"
            />
            <label className='text-gray-700'>I agree to the terms and privacy policy.</label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="col-span-2 bg-primary text-white p-4 rounded-md transition-colors duration-300 hover:bg-primary-dark">
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-primary hover:underline">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterSeller;

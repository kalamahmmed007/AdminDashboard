import React, { useState } from "react";
import {
    User, Mail, Phone, MapPin, Calendar, Lock, Upload,
    X, Save, ArrowLeft, Camera, Building, Globe, CreditCard,
    Award, Shield, CheckCircle, AlertCircle, Users, Tag,
    DollarSign, Package, Image
} from 'lucide-react';

const AddUser = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Bangladesh',
        plan: 'basic',
        status: 'active',
        role: 'customer',
        company: '',
        website: '',
        notes: ''
    });

    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setProfileImage(null);
        setImagePreview(null);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);
            }, 1500);
        }
    };

    const InputField = ({ label, name, type = "text", placeholder, icon: Icon, required = false, error }) => (
        <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                {Icon && <Icon className="h-4 w-4 text-gray-600" />}
                {label}
                {required && <span className="text-red-600">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                placeholder={placeholder}
                className={`w-full rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200`}
            />
            {error && (
                <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                </p>
            )}
        </div>
    );

    const SelectField = ({ label, name, options, icon: Icon, required = false }) => (
        <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                {Icon && <Icon className="h-4 w-4 text-gray-600" />}
                {label}
                {required && <span className="text-red-600">*</span>}
            </label>
            <select
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-[1200px]">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-3">
                            <button className="rounded-lg border border-gray-300 bg-white p-2 transition-colors hover:bg-gray-50">
                                <ArrowLeft className="h-5 w-5 text-gray-600" />
                            </button>
                            <h1 className="text-3xl font-bold text-gray-900">Add New User</h1>
                        </div>
                        <p className="text-gray-600">Create a new user account with complete information</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50">
                            <X className="h-4 w-4" />
                            Cancel
                        </button>
                    </div>
                </div>

                {showSuccess && (
                    <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                        <CheckCircle className="h-6 w-6 text-red-600" />
                        <div>
                            <h3 className="font-semibold text-red-900">User Created Successfully!</h3>
                            <p className="text-sm text-red-700">The new user has been added to the system.</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-6">
                            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                                    <Camera className="h-5 w-5 text-red-600" />
                                    Profile Picture
                                </h2>
                                <div className="space-y-4">
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="h-48 w-full rounded-lg object-cover"
                                            />
                                            <button
                                                onClick={removeImage}
                                                className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white transition-colors hover:bg-red-700"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                                            <div className="text-center">
                                                <Image className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                                                <p className="text-sm text-gray-600">No image uploaded</p>
                                            </div>
                                        </div>
                                    )}
                                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-red-700">
                                        <Upload className="h-4 w-4" />
                                        Upload Image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="text-xs text-gray-500">
                                        Recommended: Square image, at least 400x400px
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-lg font-semibold text-gray-900">Account Summary</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                        <div className="flex items-center gap-2">
                                            <div className="rounded-lg bg-red-100 p-2">
                                                <Award className="h-4 w-4 text-red-600" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">Plan</span>
                                        </div>
                                        <span className="font-semibold capitalize text-gray-900">{formData.plan}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                        <div className="flex items-center gap-2">
                                            <div className="rounded-lg bg-red-100 p-2">
                                                <Shield className="h-4 w-4 text-red-600" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">Status</span>
                                        </div>
                                        <span className="font-semibold capitalize text-gray-900">{formData.status}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                        <div className="flex items-center gap-2">
                                            <div className="rounded-lg bg-red-100 p-2">
                                                <Users className="h-4 w-4 text-red-600" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">Role</span>
                                        </div>
                                        <span className="font-semibold capitalize text-gray-900">{formData.role}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 lg:col-span-2">
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-gray-900">
                                <User className="h-5 w-5 text-red-600" />
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <InputField
                                    label="First Name"
                                    name="firstName"
                                    placeholder="Enter first name"
                                    icon={User}
                                    required
                                    error={errors.firstName}
                                />
                                <InputField
                                    label="Last Name"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    icon={User}
                                    required
                                    error={errors.lastName}
                                />
                                <InputField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    placeholder="user@example.com"
                                    icon={Mail}
                                    required
                                    error={errors.email}
                                />
                                <InputField
                                    label="Phone Number"
                                    name="phone"
                                    type="tel"
                                    placeholder="+880 1XXX-XXXXXX"
                                    icon={Phone}
                                    required
                                    error={errors.phone}
                                />
                                <InputField
                                    label="Date of Birth"
                                    name="dateOfBirth"
                                    type="date"
                                    icon={Calendar}
                                />
                                <SelectField
                                    label="Gender"
                                    name="gender"
                                    icon={User}
                                    options={[
                                        { value: '', label: 'Select Gender' },
                                        { value: 'male', label: 'Male' },
                                        { value: 'female', label: 'Female' },
                                        { value: 'other', label: 'Other' }
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-gray-900">
                                <Lock className="h-5 w-5 text-red-600" />
                                Account Security
                            </h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <InputField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter password"
                                    icon={Lock}
                                    required
                                    error={errors.password}
                                />
                                <InputField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Re-enter password"
                                    icon={Lock}
                                    required
                                    error={errors.confirmPassword}
                                />
                            </div>
                            <div className="mt-4 rounded-lg bg-gray-50 p-4">
                                <p className="mb-2 text-sm font-semibold text-gray-700">Password Requirements:</p>
                                <ul className="space-y-1 text-sm text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-gray-400" />
                                        At least 8 characters long
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-gray-400" />
                                        Contains uppercase and lowercase letters
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-gray-400" />
                                        Contains at least one number
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-gray-900">
                                <MapPin className="h-5 w-5 text-red-600" />
                                Address Information
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="md:col-span-2">
                                    <InputField
                                        label="Street Address"
                                        name="address"
                                        placeholder="Enter street address"
                                        icon={MapPin}
                                    />
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <InputField
                                        label="City"
                                        name="city"
                                        placeholder="Enter city"
                                        icon={Building}
                                    />
                                    <InputField
                                        label="State/Province"
                                        name="state"
                                        placeholder="Enter state"
                                        icon={Building}
                                    />
                                    <InputField
                                        label="ZIP/Postal Code"
                                        name="zipCode"
                                        placeholder="Enter ZIP code"
                                        icon={Tag}
                                    />
                                    <SelectField
                                        label="Country"
                                        name="country"
                                        icon={Globe}
                                        options={[
                                            { value: 'Bangladesh', label: 'Bangladesh' },
                                            { value: 'India', label: 'India' },
                                            { value: 'Pakistan', label: 'Pakistan' },
                                            { value: 'USA', label: 'United States' },
                                            { value: 'UK', label: 'United Kingdom' }
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-gray-900">
                                <Shield className="h-5 w-5 text-red-600" />
                                Account Settings
                            </h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <SelectField
                                    label="Plan Type"
                                    name="plan"
                                    icon={Award}
                                    options={[
                                        { value: 'basic', label: 'Basic' },
                                        { value: 'premium', label: 'Premium' },
                                        { value: 'enterprise', label: 'Enterprise' }
                                    ]}
                                />
                                <SelectField
                                    label="Account Status"
                                    name="status"
                                    icon={CheckCircle}
                                    options={[
                                        { value: 'active', label: 'Active' },
                                        { value: 'inactive', label: 'Inactive' },
                                        { value: 'pending', label: 'Pending' }
                                    ]}
                                />
                                <SelectField
                                    label="User Role"
                                    name="role"
                                    icon={Users}
                                    options={[
                                        { value: 'customer', label: 'Customer' },
                                        { value: 'admin', label: 'Admin' },
                                        { value: 'manager', label: 'Manager' },
                                        { value: 'staff', label: 'Staff' }
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-gray-900">
                                <Building className="h-5 w-5 text-red-600" />
                                Additional Information
                            </h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <InputField
                                    label="Company Name"
                                    name="company"
                                    placeholder="Enter company name"
                                    icon={Building}
                                />
                                <InputField
                                    label="Website"
                                    name="website"
                                    type="url"
                                    placeholder="https://example.com"
                                    icon={Globe}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Package className="h-4 w-4 text-gray-600" />
                                    Notes
                                </label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    placeholder="Add any additional notes or comments..."
                                    rows="4"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <button
                                onClick={(e) => e.preventDefault()}
                                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                <X className="h-4 w-4" />
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-red-700 disabled:bg-gray-400"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        Create User
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
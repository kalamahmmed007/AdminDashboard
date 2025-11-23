import React, { useState } from "react";
import {
    Shield, Users, Edit, Trash2, Plus, Search, Settings,
    CheckCircle, XCircle, Eye, Lock, Unlock, Crown, Briefcase,
    Headphones, Monitor, UserCog, Save, X, AlertCircle,
    TrendingUp, Database, FileText, ShoppingCart, Package,
    DollarSign, BarChart, Mail, MessageSquare, Image as ImageIcon,
    Award, Star, Target, Activity, Copy, MoreVertical
} from 'lucide-react';

const Roles = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Role definitions with permissions
    const [roles, setRoles] = useState([
        {
            id: 1,
            name: 'Admin',
            icon: Crown,
            color: 'red',
            bgColor: 'bg-red-600',
            lightBg: 'bg-red-100',
            textColor: 'text-red-600',
            users: 3,
            description: 'Full system access with all permissions',
            permissions: {
                users: { view: true, create: true, edit: true, delete: true },
                products: { view: true, create: true, edit: true, delete: true },
                orders: { view: true, create: true, edit: true, delete: true },
                reports: { view: true, create: true, edit: true, delete: true },
                settings: { view: true, create: true, edit: true, delete: true },
                finance: { view: true, create: true, edit: true, delete: true },
                content: { view: true, create: true, edit: true, delete: true },
                analytics: { view: true, create: true, edit: true, delete: true }
            }
        },
        {
            id: 2,
            name: 'Manager',
            icon: Briefcase,
            color: 'black',
            bgColor: 'bg-black',
            lightBg: 'bg-gray-800',
            textColor: 'text-black',
            users: 8,
            description: 'Manage operations and team members',
            permissions: {
                users: { view: true, create: true, edit: true, delete: false },
                products: { view: true, create: true, edit: true, delete: false },
                orders: { view: true, create: true, edit: true, delete: false },
                reports: { view: true, create: true, edit: false, delete: false },
                settings: { view: true, create: false, edit: true, delete: false },
                finance: { view: true, create: false, edit: false, delete: false },
                content: { view: true, create: true, edit: true, delete: false },
                analytics: { view: true, create: false, edit: false, delete: false }
            }
        },
        {
            id: 3,
            name: 'Staff',
            icon: Users,
            color: 'gray',
            bgColor: 'bg-gray-600',
            lightBg: 'bg-gray-200',
            textColor: 'text-gray-600',
            users: 15,
            description: 'Handle daily operations and customer service',
            permissions: {
                users: { view: true, create: false, edit: false, delete: false },
                products: { view: true, create: false, edit: true, delete: false },
                orders: { view: true, create: true, edit: true, delete: false },
                reports: { view: true, create: false, edit: false, delete: false },
                settings: { view: false, create: false, edit: false, delete: false },
                finance: { view: false, create: false, edit: false, delete: false },
                content: { view: true, create: true, edit: true, delete: false },
                analytics: { view: true, create: false, edit: false, delete: false }
            }
        },
        {
            id: 4,
            name: 'Digital',
            icon: Monitor,
            color: 'red',
            bgColor: 'bg-red-500',
            lightBg: 'bg-red-50',
            textColor: 'text-red-500',
            users: 6,
            description: 'Manage digital content and marketing',
            permissions: {
                users: { view: true, create: false, edit: false, delete: false },
                products: { view: true, create: true, edit: true, delete: false },
                orders: { view: true, create: false, edit: false, delete: false },
                reports: { view: true, create: true, edit: false, delete: false },
                settings: { view: false, create: false, edit: false, delete: false },
                finance: { view: false, create: false, edit: false, delete: false },
                content: { view: true, create: true, edit: true, delete: true },
                analytics: { view: true, create: true, edit: false, delete: false }
            }
        },
        {
            id: 5,
            name: 'Support',
            icon: Headphones,
            color: 'gray',
            bgColor: 'bg-gray-700',
            lightBg: 'bg-gray-100',
            textColor: 'text-gray-700',
            users: 12,
            description: 'Customer support and issue resolution',
            permissions: {
                users: { view: true, create: false, edit: false, delete: false },
                products: { view: true, create: false, edit: false, delete: false },
                orders: { view: true, create: false, edit: true, delete: false },
                reports: { view: false, create: false, edit: false, delete: false },
                settings: { view: false, create: false, edit: false, delete: false },
                finance: { view: false, create: false, edit: false, delete: false },
                content: { view: true, create: false, edit: false, delete: false },
                analytics: { view: false, create: false, edit: false, delete: false }
            }
        }
    ]);

    const permissionCategories = [
        {
            key: 'users',
            label: 'User Management',
            icon: Users,
            description: 'Manage user accounts and profiles'
        },
        {
            key: 'products',
            label: 'Products',
            icon: Package,
            description: 'Manage product catalog'
        },
        {
            key: 'orders',
            label: 'Orders',
            icon: ShoppingCart,
            description: 'Handle customer orders'
        },
        {
            key: 'reports',
            label: 'Reports',
            icon: FileText,
            description: 'Access and generate reports'
        },
        {
            key: 'settings',
            label: 'Settings',
            icon: Settings,
            description: 'System configuration'
        },
        {
            key: 'finance',
            label: 'Finance',
            icon: DollarSign,
            description: 'Financial data and transactions'
        },
        {
            key: 'content',
            label: 'Content',
            icon: ImageIcon,
            description: 'Media and content management'
        },
        {
            key: 'analytics',
            label: 'Analytics',
            icon: BarChart,
            description: 'View analytics and insights'
        }
    ];

    const permissionActions = [
        { key: 'view', label: 'View', icon: Eye },
        { key: 'create', label: 'Create', icon: Plus },
        { key: 'edit', label: 'Edit', icon: Edit },
        { key: 'delete', label: 'Delete', icon: Trash2 }
    ];

    const stats = [
        { title: 'Total Roles', value: '5', change: 0, icon: Shield, trend: 'neutral' },
        { title: 'Total Users', value: '44', change: 12.5, icon: Users, trend: 'up' },
        { title: 'Active Permissions', value: '84', change: 8.2, icon: CheckCircle, trend: 'up' },
        { title: 'Restricted Access', value: '36', change: -5.3, icon: Lock, trend: 'down' }
    ];

    const StatCard = ({ title, value, change, icon: Icon, trend }) => (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
                <div className={`p-3 rounded-lg ${trend === 'up' ? 'bg-red-100' : trend === 'down' ? 'bg-gray-100' : 'bg-gray-50'}`}>
                    <Icon className={`w-6 h-6 ${trend === 'up' ? 'text-red-600' : trend === 'down' ? 'text-gray-600' : 'text-gray-500'}`} />
                </div>
                {change !== 0 && (
                    <div className={`flex items-center gap-1 text-sm font-semibold ${trend === 'up' ? 'text-red-600' : 'text-gray-600'}`}>
                        {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingUp className="h-4 w-4 rotate-180" />}
                        {Math.abs(change)}%
                    </div>
                )}
            </div>
            <h3 className="mb-1 text-sm font-medium text-gray-600">{title}</h3>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    );

    const togglePermission = (roleId, category, action) => {
        setRoles(prev => prev.map(role => {
            if (role.id === roleId) {
                return {
                    ...role,
                    permissions: {
                        ...role.permissions,
                        [category]: {
                            ...role.permissions[category],
                            [action]: !role.permissions[category][action]
                        }
                    }
                };
            }
            return role;
        }));
    };

    const countPermissions = (role) => {
        let total = 0;
        let active = 0;
        Object.values(role.permissions).forEach(perms => {
            Object.values(perms).forEach(value => {
                total++;
                if (value) active++;
            });
        });
        return { active, total };
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-[1600px]">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">Roles & Permissions</h1>
                    <p className="text-gray-600">Manage user roles and access control across the system</p>
                </div>

                {/* Stats Cards */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, idx) => (
                        <StatCard key={idx} {...stat} />
                    ))}
                </div>

                {/* Search and Actions */}
                <div className="mb-6 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search roles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
                        />
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
                    >
                        <Plus className="h-4 w-4" />
                        Add New Role
                    </button>
                </div>

                {/* Roles Grid */}
                <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {roles.map((role) => {
                        const { active, total } = countPermissions(role);
                        const percentage = Math.round((active / total) * 100);

                        return (
                            <div key={role.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                                {/* Role Header */}
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-3 rounded-lg ${role.lightBg}`}>
                                            <role.icon className={`h-6 w-6 ${role.textColor}`} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                                            <p className="text-sm text-gray-600">{role.users} users</p>
                                        </div>
                                    </div>
                                    <button className="rounded-lg p-2 hover:bg-gray-100">
                                        <MoreVertical className="h-5 w-5 text-gray-400" />
                                    </button>
                                </div>

                                <p className="mb-4 text-sm text-gray-600">{role.description}</p>

                                {/* Permission Stats */}
                                <div className="mb-4 rounded-lg bg-gray-50 p-4">
                                    <div className="mb-2 flex items-center justify-between text-sm">
                                        <span className="font-medium text-gray-700">Permissions</span>
                                        <span className="font-semibold text-gray-900">{active}/{total}</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-gray-200">
                                        <div
                                            className={`h-2 rounded-full ${role.bgColor}`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="mt-2 text-xs text-gray-600">{percentage}% permissions enabled</p>
                                </div>

                                {/* Quick Permission Overview */}
                                <div className="mb-4 grid grid-cols-2 gap-2">
                                    {permissionCategories.slice(0, 4).map((cat) => {
                                        const hasAnyPermission = Object.values(role.permissions[cat.key]).some(v => v);
                                        return (
                                            <div key={cat.key} className="flex items-center gap-2 text-sm">
                                                <cat.icon className={`h-4 w-4 ${hasAnyPermission ? role.textColor : 'text-gray-400'}`} />
                                                <span className={hasAnyPermission ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                                                    {cat.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setSelectedRole(role)}
                                        className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                                    >
                                        <Eye className="mr-1 inline h-4 w-4" />
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedRole(role);
                                            setIsEditing(true);
                                        }}
                                        className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                                    >
                                        <Edit className="mr-1 inline h-4 w-4" />
                                        Edit
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Detailed Permissions Table */}
                {selectedRole && (
                    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-lg ${selectedRole.lightBg}`}>
                                    <selectedRole.icon className={`h-6 w-6 ${selectedRole.textColor}`} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">{selectedRole.name} Permissions</h2>
                                    <p className="text-sm text-gray-600">{selectedRole.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {isEditing && (
                                    <>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                                        >
                                            <X className="h-4 w-4" />
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
                                        >
                                            <Save className="h-4 w-4" />
                                            Save Changes
                                        </button>
                                    </>
                                )}
                                {!isEditing && (
                                    <button
                                        onClick={() => setSelectedRole(null)}
                                        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                                    >
                                        <X className="h-4 w-4" />
                                        Close
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="px-4 py-3 text-left">
                                            <div className="font-semibold text-gray-700">Permission Category</div>
                                        </th>
                                        {permissionActions.map((action) => (
                                            <th key={action.key} className="px-4 py-3 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <action.icon className="h-4 w-4 text-gray-600" />
                                                    <span className="font-semibold text-gray-700">{action.label}</span>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {permissionCategories.map((category) => (
                                        <tr key={category.key} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${selectedRole.lightBg}`}>
                                                        <category.icon className={`h-5 w-5 ${selectedRole.textColor}`} />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{category.label}</p>
                                                        <p className="text-xs text-gray-600">{category.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            {permissionActions.map((action) => {
                                                const isEnabled = selectedRole.permissions[category.key][action.key];
                                                return (
                                                    <td key={action.key} className="px-4 py-4 text-center">
                                                        <button
                                                            onClick={() => isEditing && togglePermission(selectedRole.id, category.key, action.key)}
                                                            disabled={!isEditing}
                                                            className={`mx-auto flex h-8 w-8 items-center justify-center rounded-lg transition-all ${isEnabled
                                                                    ? `${selectedRole.bgColor} text-white`
                                                                    : 'bg-gray-200 text-gray-400'
                                                                } ${isEditing ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
                                                        >
                                                            {isEnabled ? (
                                                                <CheckCircle className="h-5 w-5" />
                                                            ) : (
                                                                <XCircle className="h-5 w-5" />
                                                            )}
                                                        </button>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {isEditing && (
                            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                                    <div>
                                        <h4 className="font-semibold text-red-900">Important Notice</h4>
                                        <p className="text-sm text-red-700">
                                            Changes to role permissions will affect all users assigned to this role. Please review carefully before saving.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Role Comparison */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-lg font-semibold text-gray-900">Permission Comparison Matrix</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                                    {roles.map((role) => (
                                        <th key={role.id} className="px-4 py-3 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <role.icon className={`h-5 w-5 ${role.textColor}`} />
                                                <span className="font-semibold text-gray-900">{role.name}</span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {permissionCategories.map((category) => (
                                    <tr key={category.key} className="border-b border-gray-100">
                                        <td className="px-4 py-3 font-medium text-gray-900">{category.label}</td>
                                        {roles.map((role) => {
                                            const perms = role.permissions[category.key];
                                            const count = Object.values(perms).filter(v => v).length;
                                            return (
                                                <td key={role.id} className="px-4 py-3 text-center">
                                                    <div className="flex items-center justify-center gap-1">
                                                        {count > 0 ? (
                                                            <>
                                                                <CheckCircle className={`h-4 w-4 ${role.textColor}`} />
                                                                <span className="text-xs font-semibold text-gray-700">{count}/4</span>
                                                            </>
                                                        ) : (
                                                            <XCircle className="h-4 w-4 text-gray-400" />
                                                        )}
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Roles;
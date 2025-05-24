import React, { useState } from 'react';
import SettingsSection from '@/features/settings/components/SettingsSection';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Icon from '@/components/atoms/Icon';
import { useAuth } from '@/context/AuthContext';

/**
 * Profile settings component
 */
const ProfileSettings: React.FC = () => {
  const { user, updateProfile } = useAuth();
  
  const [form, setForm] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    department: 'Computer Science',
    studentId: 'CS2023001',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateProfile) {
      updateProfile({
        displayName: form.displayName,
      });
    }
  };

  return (
    <SettingsSection
      title="Profile Settings"
      description="Manage your personal information and preferences"
    >
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
          <Icon name="User" size={32} className="text-gray-500" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{form.displayName}</h3>
          <p className="text-sm text-gray-600">{form.email}</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            label="Display Name"
            name="displayName"
            value={form.displayName}
            onChange={handleChange}
            fullWidth
          />
          
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled
            fullWidth
          />
          
          <Input
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            fullWidth
          />
          
          <Input
            label="Student ID"
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            fullWidth
          />
        </div>
        
        <div className="mt-6 flex space-x-3">
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
          
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </SettingsSection>
  );
};

export default ProfileSettings;
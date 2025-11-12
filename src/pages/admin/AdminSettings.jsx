import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card.jsx";
import { Input } from "../../components/ui/Input.jsx";
import { Label } from "../../components/ui/Input.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Textarea } from "../../components/ui/Textarea.jsx";
import { useToast } from "../../hooks/use-toast.js";
import { useState } from "react";
import firestoreService from "../../services/firestoreService";
import "../../styles/AdminSettings.css";

const AdminSettings = () => {
  const { toast } = useToast();
  const [adminForm, setAdminForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSave = () => {
    toast({ title: "Settings saved successfully!" });
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    
    if (adminForm.password !== adminForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    try {
      await firestoreService.addAdmin({
        fullName: adminForm.fullName,
        email: adminForm.email,
        password: adminForm.password
      });
      
      alert('Admin added successfully!');
      setAdminForm({ fullName: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error adding admin:', error);
      alert('Failed to add admin');
    }
  };

  const handleInputChange = (e) => {
    setAdminForm({ ...adminForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage platform configuration and preferences</p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Update platform information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="platformName">Platform Name</Label>
              <Input id="platformName" defaultValue="OnCode" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" defaultValue="Learn. Build. Get Certified." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                defaultValue="OnCode is a modern e-learning platform for coding and technology courses."
                rows={4}
              />
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Update contact details displayed on the website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="contact@oncode.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                type="tel" 
                defaultValue="1234567890" 
                maxLength="10"
                pattern="[0-9]{10}"
                title="Please enter exactly 10 digits"
                onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="123 Learning Street, Tech City, TC 12345" />
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
            <CardDescription>Update social media profile links</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input id="facebook" placeholder="https://facebook.com/oncode" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input id="linkedin" placeholder="https://linkedin.com/company/oncode" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="youtube">YouTube</Label>
              <Input id="youtube" placeholder="https://youtube.com/@oncode" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="twitter">Twitter/X</Label>
              <Input id="twitter" placeholder="https://twitter.com/oncode" />
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Admin Management */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Admin</CardTitle>
            <CardDescription>Create a new administrator account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName"
                  value={adminForm.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter full name" 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  value={adminForm.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address" 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  value={adminForm.password}
                  onChange={handleInputChange}
                  placeholder="Enter password" 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password" 
                  value={adminForm.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password" 
                  required 
                />
              </div>
              <Button type="submit">Add Admin</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;

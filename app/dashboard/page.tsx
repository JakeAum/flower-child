"use client";

import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/libs/supabase/client";
import ButtonAccount from "@/components/ButtonAccount";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from 'next/link';

// Main Dashboard component
export default function Dashboard() {
  // Create a Supabase client instance
  const supabase = createClient();

  // State variables
  const [user, setUser] = useState<User | null>(null); // Current user
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Admin status
  const [isApproved, setIsApproved] = useState<boolean>(false); // Approval status
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  // Fetch user and profile data on component mount
  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        // Fetch the current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError) throw userError;

        setUser(user); // Set the user state

        if (user) {
          // Fetch user profile to get admin and approval status
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('is_admin, is_approved')
            .eq('id', user.id)
            .single();

          if (profileError) throw profileError;

          // Set admin and approval status
          setIsAdmin(profile.is_admin || false);
          setIsApproved(profile.is_approved || false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserAndProfile();
  }, [supabase]);

  // Component for managing users (admin functionality)
  const UserManagement = () => {
    const [users, setUsers] = useState([]); // State for user list

    // Fetch all users on component mount
    useEffect(() => {
      fetchUsers();
    }, []);

    // Fetch users from the profiles table
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) console.error('Error fetching users:', error);
      else setUsers(data); // Set users state
    };

    // Toggle user active status
    const toggleUserActive = async (userId, currentStatus) => {
      const { error } = await supabase
        .from('profiles')
        .update({ is_active: !currentStatus }) // Toggle is_active status
        .eq('id', userId);

      if (error) console.error('Error updating user:', error);
      else fetchUsers(); // Refresh the user list
    };

    return (
      <div className="user-list">
        {users.map(user => (
          <div key={user.id} className="user-item flex justify-between items-center p-2 border-b">
            <span>{user.email}</span>
            <button
              onClick={() => toggleUserActive(user.id, user.is_active)}
              className={`px-3 py-1 rounded ${user.is_active ? 'bg-green-500' : 'bg-red-500'} text-white`}
            >
              {user.is_active ? 'Active' : 'Inactive'}
            </button>
          </div>
        ))}
      </div>
    );
  };


  // Component for creating new plants
  const PlantCreationForm = () => {
    const [plantName, setPlantName] = useState(''); // State for plant name
    const [plantDescription, setPlantDescription] = useState(''); // State for plant description

    // Handle form submission to create a new plant
    const handleSubmit = async (e) => {
      e.preventDefault();
      const { data, error } = await supabase
        .from('plants')
        .insert([{ name: plantName, description: plantDescription }]);

      if (error) console.error('Error creating plant:', error);
      else {
        console.log('Plant created:', data);
        setPlantName(''); // Reset plant name
        setPlantDescription(''); // Reset plant description
      }
    };


    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
          placeholder="Plant Name"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={plantDescription}
          onChange={(e) => setPlantDescription(e.target.value)}
          placeholder="Plant Description"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
          Create Plant
        </button>
      </form>
    );
  };


  // Component to display a demo plant card
  const PlantCardDemo = () => {
    return (
      <div className="plant-card bg-white shadow-lg rounded-lg p-4 mt-4">
        <h3 className="text-xl font-bold">Sample Plant</h3>
        <p className="text-gray-600">This is how your plant card will look.</p>
      </div>
    );
  };


  // Component for searching plants
  const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    // Handle search form submission
    const handleSearch = (e) => {
      e.preventDefault();
      console.log('Searching for:', searchTerm); // Implement search functionality here
    };

    return (
      <form onSubmit={handleSearch} className="mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search plants..."
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>
    );
  };

  // Show loading message while data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen p-8 pb-24">
        <section className="max-w-xl mx-auto space-y-8">
          <ButtonAccount />

          <h1 className="text-3xl md:text-4xl font-extrabold">Welcome to the Dashboard</h1>

          {user ? (
            <>
              {isAdmin && (
                <div className="admin-panel">
                  <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
                  <UserManagement /> {/* Admin functionality */}
                </div>
              )}

              {isApproved ? (
                <div className="approved-user-section">
                  <h2 className="text-2xl font-bold mb-4">Create New Plant</h2>
                  <PlantCreationForm /> {/* Form to create new plants */}
                  <PlantCardDemo /> {/* Demo plant card */}
                </div>
              ) : (
                <div className="non-activated-user-section">
                  <h2 className="text-xl font-semibold mb-3">Welcome, {user.email}</h2>
                  <p className="mb-4">
                    You can search our plant collection without needing to sign in.
                    Explore our vast database of plants and their characteristics.
                  </p>

                  {/* <SearchComponent /> Search functionality for non-activated users */}
                  <div className="flex flex-col items-center">
                    <Link href="/" passHref>
                      <button className="btn btn-primary btn-wide">
                        Home
                      </button>
                    </Link>
                  </div>

                  <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Need Admin Access?</h3>
                    <p>
                      If you require admin access, please email our support team at{' '}
                      <a href="mailto:admin@example.com" className="text-blue-600 hover:underline">
                        admin@example.com
                      </a>
                      . Include your username and reason for needing admin access in your request.
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> No user logged in. Please log in to access this page.</span>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
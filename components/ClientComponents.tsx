"use client";

import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ClientComponents({ 
  initialUser, 
  initialIsAdmin, 
  initialIsApproved 
}: { 
  initialUser: User | null, 
  initialIsAdmin: boolean, 
  initialIsApproved: boolean 
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [isApproved, setIsApproved] = useState(initialIsApproved);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error fetching session:', error);
        setIsLoading(false);
        return;
      }

      if (session) {
        setUser(session.user);
        // Fetch user profile to get updated admin and approval status
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('is_admin, is_approved')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
        } else if (profile) {
          setIsAdmin(profile.is_admin || false);
          setIsApproved(profile.is_approved || false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        setIsApproved(false);
      }

      setIsLoading(false);
    };

    fetchUserData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        fetchUserData();
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const PlantCreationForm = () => {
    const [plantName, setPlantName] = useState('');
    const [plantDescription, setPlantDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const { data, error } = await supabase
        .from('plants')
        .insert([{ name: plantName, description: plantDescription }]);
      
      if (error) console.error('Error creating plant:', error);
      else {
        console.log('Plant created:', data);
        setPlantName('');
        setPlantDescription('');
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

  const PlantCardDemo = () => {
    return (
      <div className="plant-card bg-white shadow-lg rounded-lg p-4 mt-4">
        <h3 className="text-xl font-bold">Sample Plant</h3>
        <p className="text-gray-600">This is how your plant card will look.</p>
      </div>
    );
  };

  const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Searching for:', searchTerm);
      // Implement your search logic here
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> No user logged in. Please log in to access this page.</span>
      </div>
    );
  }

  return (
    <>
      {isApproved ? (
        <div className="approved-user-section">
          <h2 className="text-2xl font-bold mb-4">Create New Plant</h2>
          {/* <PlantCreationForm /> */}
          {/* <PlantCardDemo /> */}
        </div>
      ) : (
        <div className="non-activated-user-section">
          <h2 className="text-xl font-semibold mb-3">Welcome, {user.email}</h2>
          <p className="mb-4">
            You can search our plant collection without needing to sign in. 
            Explore our vast database of plants and their characteristics.
          </p>
          {/* <SearchComponent /> */}
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
  );
}